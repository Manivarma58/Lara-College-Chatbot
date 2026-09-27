import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Edit, User, Mail, Building2, Hash, ArrowLeft, Sparkles, GraduationCap } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (user) {
      supabase
        .from("profiles")
        .select("username, email, department, register_number")
        .eq("user_id", user.id)
        .single()
        .then(({ data }) => {
          if (data) setProfile(data);
        });
    }
  }, [user]);

  const initial = profile?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || "U";

  return (
    <div className="min-h-screen pt-20 pb-16 bg-slate-950 text-slate-100 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="text-slate-400 hover:text-white hover:bg-white/10 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Home
          </Button>

          <Button
            onClick={() => navigate("/chat")}
            className="gradient-gold text-slate-950 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 mr-1.5" />
            Launch AI Chat
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8 pb-8 border-b border-white/10">
            {/* Avatar Initial */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl gradient-gold text-slate-950 flex items-center justify-center text-4xl sm:text-5xl font-black shadow-xl shadow-amber-500/20 shrink-0">
              {initial}
            </div>

            <div className="text-center sm:text-left flex-1 space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mb-1">
                Verified Student Profile
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {profile?.username || user?.email?.split("@")[0] || "VLITS Student"}
              </h1>
              <p className="text-slate-400 text-sm flex items-center justify-center sm:justify-start gap-2">
                <GraduationCap className="w-4 h-4 text-amber-400" />
                Vignan's Lara Institute of Technology & Sciences
              </p>
            </div>

            <Button
              onClick={() => navigate("/edit-profile")}
              className="gradient-gold text-slate-950 font-bold px-5 py-2.5 rounded-xl hover:scale-105 transition-all text-xs sm:text-sm shrink-0">
              <Edit className="w-4 h-4 mr-1.5" />
              Edit Profile
            </Button>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
            {[
              { label: "Full Name", value: profile?.username || "Not set", icon: User },
              { label: "Registered Email", value: profile?.email || user?.email || "Not set", icon: Mail },
              { label: "Engineering Department", value: profile?.department || "General Engineering", icon: Building2 },
              { label: "Student Register Number", value: profile?.register_number || "Not specified", icon: Hash }
            ].map((item) => (
              <div
                key={item.label}
                className="bg-slate-950/70 border border-white/10 rounded-2xl p-4 flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shrink-0">
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <p className="text-xs text-slate-400 font-medium">{item.label}</p>
                  <p className="font-semibold text-white text-sm truncate mt-0.5">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Profile;