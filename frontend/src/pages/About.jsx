import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  BookOpen,
  Building2,
  Trophy,
  GraduationCap,
  Sparkles,
  MapPin,
  CheckCircle2,
  Phone,
  Mail,
  ShieldCheck
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import collegeHero from "@/assets/college-hero.png";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-20 pb-16 bg-slate-950 text-slate-100 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white hover:bg-white/10 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          <Button
            onClick={() => navigate("/chat")}
            className="gradient-gold text-slate-950 font-bold px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-all text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 mr-1.5" />
            Ask AI Assistant
          </Button>
        </div>

        {/* Hero Card with Campus Picture */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl h-64 sm:h-80">
          <img
            src={collegeHero}
            alt="Vignan Lara Administrative Block"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 border border-amber-400/40 text-amber-300 mb-2">
              Autonomous Institution · NAAC 'A+' Grade
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Vignan's Lara Institute of Technology & Sciences
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-1">
              Vadlamudi, Guntur, Andhra Pradesh (Affiliated to JNTUK)
            </p>
          </div>
        </div>

        {/* Content Bento Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Vision & Profile */}
          <Card className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <CardContent className="p-0 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">About the Institution</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Founded under the visionary leadership of Dr. Lavu Rathaiah, Vignan's Lara has grown into a benchmark of technical excellence. The campus is accredited with NAAC 'A+' Grade and approved by AICTE, New Delhi.
              </p>
            </CardContent>
          </Card>

          {/* Card 2: Academic Programs */}
          <Card className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <CardContent className="p-0 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Degrees & Departments</h2>
              <ul className="text-slate-300 text-sm space-y-1.5">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Computer Science & Engineering (CSE)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  CSE (AI & Machine Learning / Data Science)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Information Technology (IT)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  Electronics & Communication / Electrical / ME / CE
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  MCA & M.Tech Postgraduate Specializations
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Card 3: Placements & Industry Connect */}
          <Card className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <CardContent className="p-0 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-4">
                <Trophy className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Career Placements</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                With comprehensive campus recruitment training from the 2nd year onwards, students achieve placements in top product and service giants with compensation packages up to 44 LPA.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-xs text-slate-400">
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Amazon</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">TCS Digital</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Infosys</span>
                <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Cisco</span>
              </div>
            </CardContent>
          </Card>

          {/* Card 4: Campus Facilities & Hostels */}
          <Card className="bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl">
            <CardContent className="p-0 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-400/10 border border-purple-400/30 flex items-center justify-center text-purple-400 mb-4">
                <Building2 className="w-5 h-5" />
              </div>
              <h2 className="text-xl font-bold text-white">Campus & Hostels</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Sprawling 10-acre green campus equipped with 100% high-speed Wi-Fi, air-conditioned seminar halls, indoor & outdoor sports complexes, hygienic dining halls, and separate secure hostels for boys and girls.
              </p>
            </CardContent>
          </Card>

        </div>

        {/* Contact Strip */}
        <div className="bg-slate-900 border border-white/15 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="font-bold text-white text-base">Have specific admission questions?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Our AI chatbot is loaded with the latest 2026 handbook regulations and fee charts.
            </p>
          </div>
          <Button
            onClick={() => navigate("/chat")}
            className="gradient-gold text-slate-950 font-bold px-6 py-5 rounded-2xl hover:scale-105 transition-all shrink-0">
            Launch Chatbot →
          </Button>
        </div>

      </div>
    </div>
  );
};

export default About;