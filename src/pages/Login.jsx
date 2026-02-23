import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock } from "lucide-react";
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

    return (
        <div className="min-h-screen pt-14 animated-gradient-bg flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full flex flex-col items-center max-w-md">

                <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-3 text-center glow-text">
                    {isLogin ? "Welcome Back" : "Create Account"}
                </h2>
                <p className="text-primary-foreground/80 mb-8 text-center text-lg">
                    Sign in to start chatting with our AI assistant
                </p>

                <Card className="w-full glass-card border border-white/20 flex-col py-4 shadow-2xl">
                    <CardHeader className="pb-6">
                        <CardTitle className="text-2xl text-center font-bold text-foreground">
                            {isLogin ? "Log In" : "Register"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-foreground font-medium">Username</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                        <Input id="username" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="pl-11 py-6 bg-background/50 border-white/20 text-foreground text-base focus-visible:ring-primary" required />
                                    </div>
                                </div>
                            )}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-11 py-6 bg-background/50 border-white/20 text-foreground text-base focus-visible:ring-primary" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-foreground font-medium">Password</Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                                    <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-11 py-6 bg-background/50 border-white/20 text-foreground text-base focus-visible:ring-primary" required minLength={6} />
                                </div>
                            </div>
                            <Button type="submit" className="w-full h-12 mt-2 gradient-gold text-accent-foreground font-bold text-lg tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all" disabled={loading}>
                                {loading ? "Please wait..." : isLogin ? "Secure Login" : "Create Account"}
                            </Button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/40" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-transparent px-3 text-muted-foreground font-semibold rounded-full border border-border/40 py-1 backdrop-blur-sm">Or</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                className="w-full h-12 font-bold border-foreground/30 hover:bg-white/20 text-foreground shadow-sm hover:-translate-y-0.5 transition-all text-base"
                                onClick={() => navigate("/chat")}>
                                Continue as Guest
                            </Button>
                            <p className="text-center text-sm text-foreground/80 mt-6 bg-background/40 py-3 rounded-xl border border-white/10">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary hover:text-primary/80 font-extrabold hover:underline">
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
