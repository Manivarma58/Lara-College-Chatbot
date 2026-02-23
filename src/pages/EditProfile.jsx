import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", department: "", register_number: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      supabase.
        from("profiles").
        select("username, email, department, register_number").
        eq("user_id", user.id).
        single().
        then(({ data }) => {
          if (data) setForm({
            username: data.username || "",
            email: data.email || "",
            department: data.department || "",
            register_number: data.register_number || ""
          });
        });
    }
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.
      from("profiles").
      update(form).
      eq("user_id", user.id);
    setLoading(false);
    if (error) {
      toast.error("Failed to save");
    } else {
      toast.success("Profile updated!");
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen pt-14 animated-gradient-bg">
      <div className="glass text-primary-foreground py-6 text-center shadow-md border-b border-border/40">
        <h1 className="text-2xl font-bold">Edit Profile</h1>
      </div>
      <div className="flex items-center justify-center p-8">
        <Card className="w-full max-w-md shadow-2xl glass-card">
          <CardHeader>
            <CardTitle>Update Your Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSave} className="space-y-4">
              {[
                { id: "username", label: "Name", type: "text" },
                { id: "email", label: "Email", type: "email" },
                { id: "department", label: "Department", type: "text" },
                { id: "register_number", label: "Register Number", type: "text" }].
                map((field) =>
                  <div key={field.id} className="space-y-1">
                    <Label htmlFor={field.id}>{field.label}</Label>
                    <Input
                      id={field.id}
                      type={field.type}
                      value={form[field.id]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [field.id]: e.target.value }))} />

                  </div>
                )}
              <Button type="submit" className="w-full gradient-navy text-primary-foreground font-bold" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default EditProfile;