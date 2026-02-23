import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, LogOut, User, MessageCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass border-b border-border/40 flex items-center justify-between px-6 z-50 transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 text-primary font-extrabold text-xl tracking-wide hover:scale-105 transition-transform duration-300">
        <GraduationCap className="w-7 h-7" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Vignan Lara</span>
      </Link>
      <nav className="flex items-center gap-1">
        {user ?
          <>
            <NavItem to="/chat" active={isActive("/chat")} icon={<MessageCircle className="w-4 h-4" />}>Chat</NavItem>
            <NavItem to="/about" active={isActive("/about")} icon={<Info className="w-4 h-4" />}>About</NavItem>
            <NavItem to="/profile" active={isActive("/profile")} icon={<User className="w-4 h-4" />}>Profile</NavItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-foreground/80 hover:text-accent hover:bg-accent/10 ml-2 transition-colors">

              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </> :

          <>
            <NavItem to="/" active={isActive("/")} icon={null}>Home</NavItem>
            <NavItem to="/about" active={isActive("/about")} icon={<Info className="w-4 h-4" />}>About</NavItem>
            <div className="pl-4 ml-2 border-l border-border">
              <Link to="/login">
                <Button size="sm" className="gradient-navy text-primary-foreground font-semibold px-4 shadow-md transition-transform hover:scale-105">
                  <User className="w-4 h-4 mr-2" />
                  Log In
                </Button>
              </Link>
            </div>
          </>
        }
      </nav>
    </header>);

};

const NavItem = ({ to, active, children, icon }) =>
  <Link
    to={to}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${active ?
      "text-primary bg-primary/10 shadow-sm" :
      "text-foreground/80 hover:text-primary hover:bg-primary/5"}`
    }>

    {icon}
    {children}
  </Link>;


export default Navbar;