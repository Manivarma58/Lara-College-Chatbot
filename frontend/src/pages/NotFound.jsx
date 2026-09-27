import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowLeft, MessageCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-100 px-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 -left-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center bg-slate-900/80 backdrop-blur-xl border border-white/15 p-8 sm:p-12 rounded-3xl shadow-2xl max-w-md w-full relative z-10">
        <div className="w-16 h-16 rounded-3xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 mx-auto mb-6 shadow-lg shadow-amber-500/10">
          <GraduationCap className="w-8 h-8" />
        </div>
        
        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 mb-2">
          404
        </h1>
        <h2 className="text-xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-sm text-slate-400 mb-8 leading-relaxed">
          The campus resource you're looking for might have moved or is temporarily unavailable.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="border-white/20 text-white hover:bg-white/10 rounded-xl font-semibold text-sm py-5 flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Button>
          <Button
            onClick={() => navigate("/chat")}
            className="gradient-gold text-slate-950 font-bold rounded-xl text-sm py-5 shadow-md flex items-center justify-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Ask Lara AI
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;