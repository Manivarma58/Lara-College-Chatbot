import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  BookOpen,
  FlaskConical,
  Users,
  Trophy,
  MessageCircle,
  Sparkles,
  ArrowRight,
  Award,
  ShieldCheck,
  CheckCircle2,
  Building2,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Laptop
} from "lucide-react";
import { motion } from "framer-motion";
import collegeHero from "@/assets/college-hero.png";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const features = [
  {
    icon: Sparkles,
    badge: "24/7 AI Engine",
    title: "AI Knowledge Assistant",
    desc: "Instant verified answers on courses, admissions, syllabus, regulations & schedules.",
    details: "Our proprietary AI assistant is trained securely on all up-to-date college handbook data, syllabus regulations, placement records, and campus schedules. Ask anything from 'What are the cutoff ranks?' to 'Hostel timings?' and receive instant, structured answers 24/7 without queuing at offices."
  },
  {
    icon: BookOpen,
    badge: "NBA Accredited",
    title: "Premier Engineering Programs",
    desc: "CSE, AI&ML, Data Science, IT, ECE, EEE, Mechanical, Civil & MCA programs.",
    details: "VLITS offers distinguished undergraduate and postgraduate programs. From cutting-edge computing branches like Artificial Intelligence & Machine Learning (AI&ML) to core engineering disciplines, every curriculum is meticulously designed according to modern industry and AI era standards."
  },
  {
    icon: Trophy,
    badge: "Top Tier MNCs",
    title: "Exceptional Placements",
    desc: "Over 85%+ placements with packages up to 44 LPA across Fortune 500 recruiters.",
    details: "The Training & Placement cell operates year-round with specialized coding bootcamps, soft-skill workshops, and mock interview drives. Our students land positions at Amazon, TCS Digital, Infosys, Wipro, Cisco, and prominent tech innovators across India."
  },
  {
    icon: FlaskConical,
    badge: "World-Class",
    title: "Next-Gen Research Labs",
    desc: "Advanced GPU computing, IoT centers, robotics labs & innovation workshops.",
    details: "Students gain practical experience with world-class facilities ranging from multi-core rendering servers for AI/ML deep learning models to heavy machinery workshops, chemistry facilities, and embedded systems IoT centers."
  },
  {
    icon: Users,
    badge: "100% Wi-Fi Campus",
    title: "Vibrant Campus Life",
    desc: "20+ active student clubs, cultural fests, sports complex & modern secure hostels.",
    details: "Balance is the core of our educational philosophy. Engage in 20+ active student clubs, including coding societies, robotics teams, drama troops, and sports tournaments. Fully Wi-Fi enabled hostels, modern cafeterias, and health centers support your college journey."
  },
  {
    icon: Award,
    badge: "Financial Aid",
    title: "Merit Scholarships",
    desc: "Attractive tuition fee waivers for EAMCET, JEE & V-SAT high achievers.",
    details: "Lara rewards academic brilliance. Deserving candidates with top ranks in AP EAMCET, JEE Mains, or V-SAT receive substantial fee waivers and merit awards, empowering students from all financial backgrounds to achieve excellence."
  }
];

const quickQuestions = [
  "What courses & seat intake are offered?",
  "What are the AP EAPCET cutoff ranks?",
  "How are the placements & highest package?",
  "What is the fee structure & scholarships?",
  "Tell me about hostel & dining facilities",
  "What are the college bus routes & transport?"
];

const stats = [
  { value: "A+", label: "NAAC Grade", sub: "Autonomous Status" },
  { value: "85%+", label: "Placement Rate", sub: "Across Top Tech MNCs" },
  { value: "44 LPA", label: "Highest Package", sub: "Fortune 500 Companies" },
  { value: "40+", label: "Active Recruiters", sub: "Amazon, TCS, Cisco, Wipro" }
];

const Auth = () => {
  const navigate = useNavigate();

  const handleAskQuick = (question) => {
    navigate(`/chat?q=${encodeURIComponent(question)}`);
  };

  return (
    <div className="min-h-screen pt-16 bg-slate-950 text-slate-100 overflow-x-hidden">
      {/* Hero Section with 100% Clear Building Visibility */}
      <section className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-end sm:justify-center items-start overflow-hidden">
        
        {/* Full-Bleed Sharp Campus Background Image with Responsive Mobile Focal Point */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-[position:52%_15%] sm:bg-[position:65%_center] md:bg-[position:68%_center] lg:bg-[position:60%_center] transition-all duration-700 pointer-events-none"
          style={{
            backgroundImage: `url(${collegeHero})`,
          }}
        />

        {/* Responsive Scrim: subtle vertical vignette on mobile to keep building visible, horizontal scrim on desktop */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-950/40 via-slate-950/20 to-slate-950/90 md:bg-gradient-to-r md:from-slate-950/90 md:via-slate-950/50 md:to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 sm:h-40 z-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent pointer-events-none" />

        {/* Left-Aligned Floating Control Console */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-3.5 sm:px-6 md:px-12 lg:px-16 py-8 sm:py-12 flex justify-start">
          <motion.div
            className="w-full max-w-xl text-left bg-slate-950/75 sm:bg-slate-950/65 backdrop-blur-xl border border-white/15 p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}>
            
            {/* Top Glowing Ambient Accents */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Live Status Pill & College Tag */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AI Assistant Online 24/7
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-400/10 border border-amber-400/30 text-amber-300">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                VLITS Guntur
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.15] mb-4 tracking-tight drop-shadow-md">
              Your College,{" "}
              <span className="text-gradient-gold">One Chat Away</span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-6 leading-relaxed font-normal">
              Get immediate, accurate answers regarding admissions, engineering courses, hostel facilities, fee details, and campus placements.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <Button
                size="lg"
                className="gradient-gold text-slate-950 font-bold text-base px-6 py-6 rounded-2xl shadow-xl hover:shadow-amber-500/25 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 group"
                onClick={() => navigate("/chat")}>
                <Sparkles className="w-5 h-5 text-slate-950 group-hover:rotate-12 transition-transform" />
                Start AI Chat
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="border border-white/25 bg-slate-800/90 hover:bg-slate-700/90 text-white font-semibold text-base px-6 py-4 rounded-2xl shadow-lg hover:border-amber-400/40 hover:scale-[1.03] transition-all flex items-center justify-center gap-2 cursor-pointer">
                <Building2 className="w-4 h-4 text-amber-400" />
                Login / Student Portal
              </button>
            </div>

            {/* Interactive Prompt Pills */}
            <div className="pt-4 border-t border-white/10">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
                Quick Enquiries (Click to Ask):
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.slice(0, 4).map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAskQuick(q)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-white/10 hover:border-amber-400/30 transition-all cursor-pointer text-left">
                    {q} →
                  </button>
                ))}
              </div>
            </div>

          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={() => {
            document.getElementById("stats-section")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-slate-400 hover:text-amber-300 transition-colors p-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label="Scroll down">
          <ChevronDown className="w-7 h-7" />
        </motion.button>
      </section>

      {/* Floating Key Stats Strip */}
      <section id="stats-section" className="relative z-20 -mt-10 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl">
          {stats.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-3 border-r last:border-r-0 border-white/10">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">
                {item.value}
              </div>
              <div className="text-sm font-bold text-white mt-1">{item.label}</div>
              <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Interactive AI Chatbot Preview & Bento Showcase */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: AI Highlights */}
          <div className="lg:col-span-5 text-left">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-primary/20 border border-primary/40 text-amber-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Next-Gen Campus Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
              Ask anything, get verified answers in seconds.
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-6">
              Trained directly on VLITS academic regulations, placement brochures, hostel rules, and department faculties. Powered by modern LLMs and real-time MongoDB storage.
            </p>
            
            <ul className="space-y-3 mb-8">
              {[
                "Instant answers to fee structures, seat intake & quota details",
                "Placement statistics, branch-wise averages & top recruiter lists",
                "Hostel amenities, food menus, bus routes & timing guides",
                "Full chat history stored safely in your cloud profile"
              ].map((point, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => navigate("/chat")}
              className="gradient-gold text-slate-950 font-bold px-8 py-6 rounded-xl hover:scale-105 transition-all shadow-lg shadow-amber-500/20">
              Try the Chatbot Now →
            </Button>
          </div>

          {/* Right Column: Simulated Live Chat Mockup */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 shadow-2xl">
              {/* Chat Header Mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center text-slate-950 font-black shadow-md">
                    L
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">Lara AI College Assistant</h3>
                    <p className="text-xs text-emerald-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      Online · Ready to answer
                    </p>
                  </div>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-white/10 text-slate-300 font-mono">
                  VLITS Guntur
                </span>
              </div>

              {/* Chat Messages Mockup */}
              <div className="space-y-4 text-sm">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-amber-400 text-slate-950 px-4 py-2.5 rounded-2xl rounded-tr-sm max-w-md font-medium shadow-sm">
                    What are the B.Tech programs offered and how are the placements?
                  </div>
                </div>

                {/* Bot Message */}
                <div className="flex justify-start">
                  <div className="bg-slate-800/90 text-slate-100 border border-white/10 px-5 py-4 rounded-2xl rounded-tl-sm max-w-xl text-left leading-relaxed shadow-sm">
                    <p className="font-bold text-amber-300 mb-2">🎓 Programs & Placements Overview:</p>
                    <p className="mb-2">VLITS offers NBA-accredited B.Tech programs in <strong>CSE, AI&ML, Data Science, IT, ECE, EEE, Mechanical & Civil</strong>.</p>
                    <ul className="list-disc pl-5 space-y-1 text-slate-300 mb-3 text-xs sm:text-sm">
                      <li><strong>Placement Rate:</strong> 85%+ consistently achieved</li>
                      <li><strong>Highest Package:</strong> 44 LPA with Fortune 500 giants</li>
                      <li><strong>Top Recruiters:</strong> Amazon, TCS, Infosys, Cisco, Wipro</li>
                    </ul>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAskQuick("What is the fee structure?")}
                        className="text-xs px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-amber-300 transition-colors">
                        Check Fee Structure →
                      </button>
                      <button
                        onClick={() => handleAskQuick("Tell me about hostel facilities")}
                        className="text-xs px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-slate-300 transition-colors">
                        Hostel Info →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section (Why Choose VLITS) */}
      <section id="features-section" className="py-20 px-4 bg-slate-900/50 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/10 border border-amber-400/30 text-amber-300 mb-3">
              Institutional Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Why Choose Lara?
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-base">
              A premier autonomous engineering institution committed to academic rigor, hands-on technical mastery, and holistic student growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}>
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="h-full bg-slate-900/60 backdrop-blur-lg border border-white/10 hover:border-amber-400/40 rounded-3xl p-6 cursor-pointer hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 group">
                      <CardContent className="p-0 flex flex-col justify-between h-full">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400/20 transition-all">
                              <f.icon className="w-6 h-6 text-amber-400" />
                            </div>
                            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300">
                              {f.badge}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                            {f.title}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {f.desc}
                          </p>
                        </div>
                        <div className="mt-5 pt-4 border-t border-white/10 flex items-center text-xs font-semibold text-amber-400 group-hover:translate-x-1 transition-transform">
                          Learn more & details →
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg bg-slate-900 text-slate-100 border border-white/20 shadow-2xl rounded-3xl p-6">
                    <DialogHeader>
                      <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center mb-4 shadow-lg">
                        <f.icon className="w-7 h-7 text-amber-400" />
                      </div>
                      <DialogTitle className="text-2xl font-bold text-center text-white">{f.title}</DialogTitle>
                      <DialogDescription className="text-center text-slate-300 mt-3 text-sm sm:text-base leading-relaxed">
                        {f.details}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="mt-6 flex justify-center gap-3">
                      <Button
                        onClick={() => navigate("/chat")}
                        className="gradient-gold text-slate-950 font-bold px-6 rounded-xl hover:scale-105 transition-transform">
                        Ask Lara AI About This
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Video Tour Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-950 border-t border-white/10 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold bg-sky-500/15 border border-sky-500/30 text-sky-300 mb-3 tracking-wide">
            Campus Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Take a Virtual Campus Tour
          </h2>
          <p className="text-slate-400 max-w-3xl mx-auto text-base sm:text-lg mb-12 leading-relaxed">
            Witness the cutting-edge laboratories, smart classrooms, athletic complexes, and vibrant student community at Vadlamudi.
          </p>

          {/* Cinematic Large Plain Video Player */}
          <div className="w-full relative h-[480px] sm:h-[620px] lg:h-[740px] xl:h-[800px] rounded-3xl overflow-hidden bg-slate-950 border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.85)] group">
            {/* Cropped & Scaled Embed (removes YouTube logo, title, and caption artifacts) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
              <iframe
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[118%] h-[118%] object-cover pointer-events-none"
                src="https://www.youtube-nocookie.com/embed/kvp8mlfnWKA?autoplay=1&mute=1&loop=1&playlist=kvp8mlfnWKA&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&cc_load_policy=0&disablekb=1&playsinline=1&fs=0"
                title="Lara Institute of Technology & Sciences Campus Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                tabIndex="-1">
              </iframe>
            </div>

            {/* Subtle Top Glass Status Badge */}
            <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/20 text-xs font-semibold text-white shadow-lg pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>VLITS Vadlamudi Campus • 4K Drone Tour</span>
            </div>

            {/* Clean Watch on YouTube external pill button (bottom right) */}
            <a
              href="https://www.youtube.com/watch?v=kvp8mlfnWKA"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-950/80 hover:bg-slate-900 backdrop-blur-md border border-white/20 text-xs font-semibold text-slate-300 hover:text-white transition-all shadow-lg hover:scale-105">
              <span>Watch with Sound</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>

          <div className="mt-12">
            <Button
              size="lg"
              className="gradient-gold text-slate-950 font-bold text-base px-10 py-6 rounded-2xl shadow-xl hover:scale-105 transition-all"
              onClick={() => navigate("/chat")}>
              Have Questions? Ask Our College AI →
            </Button>
          </div>
        </div>
      </section>

      {/* Modern Multi-Column Footer */}
      <footer className="bg-slate-900 border-t border-white/10 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand & About */}
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-xl mb-4">
              <GraduationCap className="w-6 h-6 text-amber-400" />
              <span>Lara</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Lara Institute of Technology & Sciences is an autonomous engineering institution approved by AICTE and accredited by NAAC with 'A+' Grade.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              MongoDB Atlas & AI Connected
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => navigate("/")} className="hover:text-amber-400 transition-colors">Home Page</button></li>
              <li><button onClick={() => navigate("/chat")} className="hover:text-amber-400 transition-colors">AI Enquiry Chatbot</button></li>
              <li><button onClick={() => navigate("/about")} className="hover:text-amber-400 transition-colors">About College</button></li>
              <li><button onClick={() => navigate("/login")} className="hover:text-amber-400 transition-colors">Student Login</button></li>
            </ul>
          </div>

          {/* Col 3: Departments */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Academic Programs</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Computer Science & Engineering (CSE)</li>
              <li>CSE (Artificial Intelligence & ML)</li>
              <li>CSE (Data Science)</li>
              <li>Information Technology (IT)</li>
              <li>Electronics & Communication (ECE)</li>
              <li>Master of Computer Applications (MCA)</li>
            </ul>
          </div>

          {/* Col 4: Campus Contact */}
          <div>
            <h4 className="text-white font-bold text-base mb-4">Campus Location</h4>
            <div className="space-y-3 text-sm text-slate-400">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>Vadlamudi, Chebrolu Mandal, Guntur District, Andhra Pradesh - 522213</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>0863-2381200 / admissions@vlits.ac.in</span>
              </p>
              <p className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>College Code: <strong>LARA</strong></span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 Lara Institute of Technology & Sciences. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed with Modern AI Architecture for VLITS Students & Aspirants
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Auth;
