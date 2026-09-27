import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Sparkles, GraduationCap, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("Welcome back to Lara!");
      } else {
        await signUp(email, password, username);
        toast.success("Account created successfully!");
      }
      navigate("/chat");
    } catch (err) {
      toast.error(err.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-slate-950 text-slate-100 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full flex flex-col items-center max-w-md relative z-10">

        {/* Back Link */}
        <button
          onClick={() => navigate("/")}
          className="self-start mb-6 text-xs font-semibold text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Campus Overview
        </button>

        {/* Brand Icon Header */}
        <div className="w-12 h-12 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4 shadow-lg shadow-amber-500/10">
          <GraduationCap className="w-6 h-6" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 text-center tracking-tight">
          {isLogin ? "Student & Faculty Login" : "Create Student Account"}
        </h2>
        <p className="text-slate-400 mb-8 text-center text-sm max-w-sm">
          Access the Lara AI Enquiry Portal and sync your chat history securely.
        </p>

        {/* Modern Glass Card */}
        <Card className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-3xl p-4 sm:p-6 shadow-2xl">
          <CardHeader className="pb-4 pt-2">
            <CardTitle className="text-xl text-center font-bold text-white">
              {isLogin ? "Sign In to Your Account" : "Register New Account"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 sm:p-2">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-1.5 text-left">
                  <Label htmlFor="username" className="text-xs font-semibold text-slate-300">
                    Full Name / Student Username
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                    <Input
                      id="username"
                      placeholder="Enter your full name"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10 py-5 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-amber-400/40 text-sm"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5 text-left">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-300">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="student@vlits.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 py-5 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-amber-400/40 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 py-5 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 rounded-xl focus-visible:ring-amber-400/40 text-sm"
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-5 gradient-gold text-slate-950 font-bold text-sm tracking-wide rounded-xl shadow-lg shadow-amber-500/20 hover:scale-[1.02] transition-all mt-2"
                disabled={loading}>
                {loading ? "Processing..." : isLogin ? "Secure Login" : "Complete Registration"}
              </Button>

              <div className="relative my-5">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-3 text-slate-400 font-semibold rounded-full border border-white/10 py-0.5">
                    Or
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => navigate("/chat")}
                className="w-full py-3.5 px-4 font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-white/20 hover:border-amber-400/40 rounded-xl transition-all text-sm flex items-center justify-center gap-2 shadow-md hover:scale-[1.01] cursor-pointer">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Continue as Guest Explorer
              </button>

              <p className="text-center text-xs text-slate-400 mt-5 pt-3 border-t border-white/10">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-amber-400 hover:text-amber-300 font-bold hover:underline">
                  {isLogin ? "Sign Up Free" : "Log In"}
                </button>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
