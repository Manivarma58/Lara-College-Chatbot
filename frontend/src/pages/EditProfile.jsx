import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, User, Mail, Building2, Hash, Check } from "lucide-react";

const EditProfile = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: user?.user_metadata?.username || user?.username || "",
    email: user?.email || "",
    department: user?.user_metadata?.department || user?.department || "Computer Science & Engineering",
    register_number: user?.user_metadata?.register_number || user?.register_number || "22L31A0501"
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user?.user_metadata?.username || user?.username || "",
        email: user?.email || "",
        department: user?.user_metadata?.department || user?.department || "Computer Science & Engineering",
        register_number: user?.user_metadata?.register_number || user?.register_number || "22L31A0501"
      });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      if (updateProfile) {
        await updateProfile(form);
      }
      toast.success("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-slate-950 text-slate-100 px-4 sm:px-6 flex items-center justify-center">
      <div className="w-full max-w-lg space-y-6">
        
        {/* Back Link */}
        <button
          onClick={() => navigate("/profile")}
          className="text-xs font-semibold text-slate-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Profile
        </button>

        <Card className="bg-slate-900/80 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <CardHeader className="pb-4 pt-0">
            <CardTitle className="text-xl font-bold text-white text-left">
              Update Student Profile
            </CardTitle>
            <p className="text-xs text-slate-400 text-left">
              Keep your contact and department details up to date.
            </p>
          </CardHeader>
          <CardContent className="p-0">
            <form onSubmit={handleSave} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-xs font-semibold text-slate-300">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    id="username"
                    value={form.username}
                    onChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
                    className="pl-10 py-5 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="pl-10 py-5 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-xs font-semibold text-slate-300">Department</Label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    id="department"
                    placeholder="e.g. CSE / AI&ML / ECE"
                    value={form.department}
                    onChange={(e) => setForm((prev) => ({ ...prev, department: e.target.value }))}
                    className="pl-10 py-5 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="register_number" className="text-xs font-semibold text-slate-300">Register / Roll Number</Label>
                <div className="relative">
                  <Hash className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
                  <Input
                    id="register_number"
                    placeholder="e.g. 21FE1A0501"
                    value={form.register_number}
                    onChange={(e) => setForm((prev) => ({ ...prev, register_number: e.target.value }))}
                    className="pl-10 py-5 bg-slate-950/80 border-white/15 text-white placeholder:text-slate-500 rounded-xl text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/profile")}
                  className="flex-1 py-5 border-white/20 text-white hover:bg-white/10 rounded-xl text-sm font-semibold">
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 py-5 gradient-gold text-slate-950 font-bold rounded-xl text-sm shadow-md"
                  disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default EditProfile;