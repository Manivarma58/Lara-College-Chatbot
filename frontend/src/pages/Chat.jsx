import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { getLocalBotReply } from "@/utils/chatbot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu, Send, User, Bot } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const SUGGESTED_QUESTIONS = [
  "What courses & seat intake are offered?",
  "What are the AP EAPCET cutoff ranks?",
  "How are the placements & highest package?",
  "What is the fee structure & scholarships?",
  "Tell me about hostel & dining facilities",
  "What are the college bus routes & transport?"
];

const Chat = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      text: "Hello! 👋 I am **Lara**, the official AI assistant for **Vignan's Lara Institute of Technology & Sciences (VLITS)**, Guntur.\n\nAsk me anything about **courses & seat intake**, **EAPCET cutoff ranks**, **placements (up to 44 LPA)**, **fees & JVD scholarships**, **hostels**, or **bus transport**! 🤗",
      sender: "bot"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const chatEndRef = useRef(null);
  const initialQueryHandled = useRef(false);

  useEffect(() => {
    // Load chat history
    if (user) {
      supabase.
        from("chat_messages").
        select("message").
        eq("user_id", user.id).
        order("created_at", { ascending: false }).
        limit(20).
        then(({ data, error }) => {
          if (error) {
            console.warn("Failed to load history from Supabase, loading from local storage:", error);
            const localHist = JSON.parse(localStorage.getItem(`chat_history_${user.id}`) || "[]");
            setHistory(localHist);
          } else if (data) {
            setHistory(data.map((d) => d.message));
          }
        })
        .catch((err) => {
          console.warn("Failed to load history from Supabase:", err);
          const localHist = JSON.parse(localStorage.getItem(`chat_history_${user.id}`) || "[]");
          setHistory(localHist);
        });
    } else {
      const guestHist = JSON.parse(localStorage.getItem("chat_history_guest") || "[]");
      setHistory(guestHist);
    }
  }, [user]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q && !initialQueryHandled.current) {
      initialQueryHandled.current = true;
      sendMessage(q.trim());
    }
  }, [searchParams]);

  const sendMessage = async (eventOrMessage = null) => {
    const isString = typeof eventOrMessage === "string";
    const userMsg = isString ? eventOrMessage : input.trim();
    if (!userMsg || loading) return;

    setInput("");
    setMessages((prev) => [...prev, { id: Date.now().toString(), text: userMsg, sender: "user" }]);
    setLoading(true);

    try {
      let reply = null;

      // 1. Try dedicated Backend API
      try {
        const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
        const res = await fetch(`${backendUrl}/api/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg, userId: user?.id || "guest" })
        });
        if (res.ok) {
          const apiData = await res.json();
          if (apiData?.reply) {
            reply = apiData.reply;
          }
        }
      } catch (backendErr) {
        console.warn("Backend API unavailable, checking Supabase function:", backendErr.message);
      }

      // 2. Try Supabase Edge Function if backend did not reply
      if (!reply) {
        try {
          const { data, error } = await supabase.functions.invoke("chat", {
            body: { message: userMsg }
          });
          if (!error && data?.reply) {
            reply = data.reply;
          }
        } catch (supabaseErr) {
          console.warn("Supabase invoke failed:", supabaseErr.message);
        }
      }

      // 3. Fallback to local knowledge base if still no reply
      if (!reply) {
        reply = getLocalBotReply(userMsg);
      }

      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: reply, sender: "bot" }]);

      // Save to history
      if (user) {
        try {
          const { error: insertError } = await supabase.from("chat_messages").insert({ user_id: user.id, message: userMsg, reply });
          if (insertError) throw insertError;
        } catch (dbErr) {
          console.warn("Failed to save message to Supabase, saving to local storage:", dbErr);
          const localHist = JSON.parse(localStorage.getItem(`chat_history_${user.id}`) || "[]");
          const updatedHist = [userMsg, ...localHist].slice(0, 20);
          localStorage.setItem(`chat_history_${user.id}`, JSON.stringify(updatedHist));
        }
        setHistory((prev) => [userMsg, ...prev]);
      } else {
        const guestHist = JSON.parse(localStorage.getItem("chat_history_guest") || "[]");
        const updatedHist = [userMsg, ...guestHist].slice(0, 20);
        localStorage.setItem("chat_history_guest", JSON.stringify(updatedHist));
        setHistory(updatedHist);
      }
    } catch (err) {
      console.warn("Supabase invoke failed, falling back to local responder:", err);
      const reply = getLocalBotReply(userMsg);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: reply, sender: "bot" }]);
      
      if (user) {
        const localHist = JSON.parse(localStorage.getItem(`chat_history_${user.id}`) || "[]");
        const updatedHist = [userMsg, ...localHist].slice(0, 20);
        localStorage.setItem(`chat_history_${user.id}`, JSON.stringify(updatedHist));
        setHistory((prev) => [userMsg, ...prev]);
      } else {
        const guestHist = JSON.parse(localStorage.getItem("chat_history_guest") || "[]");
        const updatedHist = [userMsg, ...guestHist].slice(0, 20);
        localStorage.setItem("chat_history_guest", JSON.stringify(updatedHist));
        setHistory(updatedHist);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen pt-16 bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl flex flex-col transition-transform z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:static md:w-64`}>

        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <h2 className="font-bold text-xs uppercase tracking-wider text-amber-400">Past Enquiries</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-slate-400">Cloud Sync</span>
        </div>
        
        <ScrollArea className="flex-1 p-3">
          {user ? (
            <>
              {history.map((h, i) => (
                <button
                  key={i}
                  onClick={() => { setInput(h); setSidebarOpen(false); }}
                  className="w-full text-left text-xs p-2.5 rounded-xl mb-1.5 bg-white/5 hover:bg-amber-400/15 text-slate-300 hover:text-amber-300 font-medium truncate border border-white/5 hover:border-amber-400/30 transition-all">
                  {h}
                </button>
              ))}
              {history.length === 0 && (
                <p className="text-xs text-slate-500 font-medium p-3 text-center">No past queries yet</p>
              )}
            </>
          ) : (
            <div className="p-4 text-center mt-4">
              <p className="text-xs text-slate-400 mb-3 leading-relaxed">
                Log in to automatically sync your enquiry history across devices.
              </p>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-white border border-white/20 hover:border-amber-400/40 font-bold text-xs rounded-xl shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5">
                <User className="w-3.5 h-3.5 text-amber-400" />
                Student Login
              </button>
            </div>
          )}
        </ScrollArea>

        <button
          onClick={() => navigate(user ? "/profile" : "/login")}
          className="p-4 border-t border-white/10 flex items-center gap-2.5 hover:bg-white/5 text-slate-300 hover:text-white transition-colors">
          <User className="w-4 h-4 text-amber-400" />
          <span className="text-sm font-semibold">{user ? "My Profile" : "Sign In"}</span>
        </button>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-30 md:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-950">
        
        {/* Chat Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-slate-300 hover:bg-white/10"
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
            <div className="w-9 h-9 rounded-xl gradient-gold flex items-center justify-center shrink-0 shadow-md">
              <Bot className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg text-white tracking-tight flex items-center gap-2">
                Lara AI College Assistant
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-normal">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Active
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Trained on Vignan's Lara Institute of Technology & Sciences Handbook
              </p>
            </div>
          </div>
          
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-xs text-slate-400 hover:text-white hover:bg-white/10">
            Back to Home
          </Button>
        </div>

        {/* Message Stream */}
        <ScrollArea className="flex-1 p-4 sm:p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] md:max-w-[78%] px-5 py-3.5 rounded-3xl text-sm leading-relaxed shadow-lg overflow-hidden ${
                    msg.sender === "user"
                      ? "gradient-gold text-slate-950 font-medium rounded-br-sm shadow-amber-500/10"
                      : "bg-slate-900/90 text-slate-100 border border-white/10 rounded-tl-sm shadow-xl"
                  }`}>

                  {msg.sender === "user" ? (
                    msg.text
                  ) : (
                    <div className="prose prose-sm prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950 prose-pre:border prose-pre:border-white/10 prose-headings:text-amber-300">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-900/90 border border-white/10 text-amber-300 px-5 py-3 rounded-2xl rounded-tl-sm text-sm animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" />
                  Lara AI is typing...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </ScrollArea>

        {/* Input Bar & Suggested Questions */}
        <div className="border-t border-white/10 bg-slate-900/90 backdrop-blur-xl p-3 sm:p-4 z-10">
          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {messages.length === 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(q)}
                    disabled={loading}
                    className="whitespace-nowrap px-3.5 py-1.5 text-xs font-medium rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/30 transition-all shrink-0">
                    {q} →
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2.5">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask about admissions, courses, fees, hostels, placements..."
                className="flex-1 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 text-sm py-5 rounded-2xl focus-visible:ring-amber-400/50 shadow-inner"
                disabled={loading}
              />

              <Button
                size="lg"
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="gradient-gold text-slate-950 font-bold px-5 rounded-2xl shadow-lg hover:scale-105 transition-all">
                <Send className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default Chat;