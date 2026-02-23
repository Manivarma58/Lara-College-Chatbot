import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, ChevronDown, BookOpen, FlaskConical, Users, Trophy, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import collegeHero from "@/assets/college-hero.webp";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const features = [
  {
    icon: MessageCircle,
    title: "AI Chatbot",
    desc: "Get instant answers to all your college queries",
    details: "Our proprietary AI assistant is trained securely on all up-to-date college handbook data, syllabus regulations, placement records, and campus schedules. You can ask anything from 'What are the timing for freshers?' to 'How many credits to graduate?' and receive an instantaneous, accurate response without queuing outside admin offices."
  },
  {
    icon: BookOpen,
    title: "Courses",
    desc: "CSE, ECE, ME, CE and more programs",
    details: "VLITS offers a wide variety of distinguished undergraduate and postgraduate programs. From cutting edge Computing and Information Sciences like Artificial Intelligence & Machine Learning (AI&ML) to foundational strengths in Mechanical and Civil Engineering, every curriculum is meticulously designed according to global standards."
  },
  {
    icon: FlaskConical,
    title: "Modern Labs",
    desc: "State-of-the-art laboratories & research centers",
    details: "With heavy investments in infrastructure, our students enjoy completely furnished, world-class laboratory equipment ranging from multi-core rendering servers for data science models to heavy machinery workshops, chemistry facilities, and advanced IoT / Robotics circuitry centers."
  },
  {
    icon: Users,
    title: "Campus Life",
    desc: "Clubs, events, sports & hostel facilities",
    details: "Balance is the core of our educational philosophy. Engage in over 20+ active student clubs, including coding societies, drama troops, and environmental agencies. Our fully Wi-Fi enabled hostels, premium cafeteria spaces, and expansive sports complex support your holistic growth."
  },
  {
    icon: Trophy,
    title: "Placements",
    desc: "Excellent placement support in top companies",
    details: "The Training & Placement cell operates relentlessly year-round to bridge students to top-tier multinational corporations. With specialized coding bootcamps, soft-skill training, and dedicated mock interviews, our alumni find themselves placed in Fortune 500 tech giants within just months of graduation."
  }
];


const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const authRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        toast.success("Welcome back!");
      } else {
        await signUp(email, password, username);
        toast.success("Account created! You are now logged in.");
      }
      navigate("/chat");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const scrollToAuth = () => {
    authRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen pt-14">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-4 text-center overflow-hidden">

        {/* Enhanced Background Image */}
        <div
          className="absolute inset-0 z-0 bg-[attachment:fixed] bg-[position:65%_center] md:bg-center bg-cover scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url(${collegeHero})`,
            filter: "brightness(1.1) contrast(1.15) saturate(1.3)",
            imageRendering: "high-quality",
            WebkitFontSmoothing: "antialiased"
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[hsla(213,62%,18%,0.6)] via-[hsla(213,62%,28%,0.5)] to-[hsla(213,62%,18%,0.9)] mix-blend-multiply" />

        <motion.div
          className="relative z-10 max-w-3xl glass p-8 md:p-12 rounded-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>

          <motion.div
            className="inline-block mb-6 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary dark:text-accent dark:border-accent/40 dark:bg-accent/10 text-sm font-medium tracking-wide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}>

            🎓 Vignan's Lara Institute of Technology & Sciences
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-4 drop-shadow-xl">
            Your College,{" "}
            <span className="text-gradient-gold">One Chat Away</span>
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-xl mx-auto leading-relaxed">
            Ask anything about admissions, courses, campus life, placements — our AI-powered chatbot has you covered, 24/7.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gradient-gold text-accent-foreground font-bold text-base px-8 shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => navigate("/chat")}>

              Chat as Guest (Try it out!)
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-foreground/30 text-foreground hover:bg-foreground/10 font-semibold glass hover:scale-105 transition-transform"
              onClick={() => navigate("/login")}>

              Login / Create Account
            </Button>
          </div>
        </motion.div>

        <motion.button
          onClick={() => {
            document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' });
          }}
          className="absolute bottom-8 z-10 text-primary-foreground/60 hover:text-accent transition-colors"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}>

          <ChevronDown className="w-8 h-8" />
        </motion.button>
      </section>

      {/* Features Section */}
      <section id="features-section" className="bg-background py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">Why Choose Vignan Lara?</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Explore what makes our institution stand out — from cutting-edge facilities to career support.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) =>
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}>

                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="h-full glass-card bg-transparent cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-border/40 hover:border-primary/50">
                      <CardContent className="p-6 flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                          <f.icon className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                          <h3 className="font-bold mb-1 text-foreground group-hover:text-primary transition-colors">{f.title}</h3>
                          <p className="text-sm text-muted-foreground">{f.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md glass border border-white/20 shadow-2xl">
                    <DialogHeader>
                      <div className="mx-auto w-12 h-12 rounded-full gradient-navy flex items-center justify-center mb-4 shadow-lg">
                        <f.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <DialogTitle className="text-2xl font-bold text-center text-foreground">{f.title}</DialogTitle>
                      <DialogDescription className="text-center text-foreground/80 mt-2 text-base leading-relaxed">
                        {f.details}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 flex justify-center">
                      <Button onClick={() => navigate("/chat")} className="gradient-gold text-accent-foreground font-bold shadow-md hover:scale-105 transition-transform">
                        Ask Chatbot for More Info
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Campus Video Section */}
      <section className="relative py-20 px-4 flex flex-col items-center animated-gradient-bg border-t border-border/20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-6xl flex flex-col items-center">

          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-4 text-center glow-text">
            Experience Our Campus
          </h2>
          <p className="text-primary-foreground/80 mb-10 text-center max-w-2xl text-lg">
            Take a glimpse into the vibrant life, state-of-the-art facilities, and the community that makes Vignan's Lara a premier destination for your education.
          </p>

          <div className="w-full aspect-video rounded-3xl overflow-hidden glass-card shadow-2xl relative border-4 border-white/10 group">
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay z-10 pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />
            <iframe
              className="w-full h-full object-cover scale-105"
              src="https://www.youtube.com/embed/kvp8mlfnWKA?autoplay=1&mute=1&loop=1&playlist=kvp8mlfnWKA&controls=0&showinfo=0&rel=0&modestbranding=1&vq=hd1080"
              title="Vignan's Lara Institute of Technology & Sciences Campus Tour"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen>
            </iframe>
          </div>

          <div className="mt-12">
            <Button
              size="lg"
              className="gradient-gold text-accent-foreground font-bold text-base px-10 py-6 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={() => navigate("/chat")}>
              Start Chatting with our AI
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="gradient-navy text-primary-foreground/70 text-center py-6 text-sm">
        © 2026 Vignan's Lara Institute of Technology & Sciences, Guntur. All rights reserved.
      </footer>
    </div>);

};

export default Auth;