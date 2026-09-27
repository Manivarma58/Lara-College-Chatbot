import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, LogOut, User, MessageCircle, Info, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-slate-950/85 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-8 z-50 transition-all duration-300">
      
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center group-hover:scale-105 transition-transform">
          <GraduationCap className="w-5 h-5 text-amber-400" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight">
            Vignan <span className="text-amber-400">Lara</span>
          </span>
          <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">
            AI Enquiry Portal
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-2">
        <NavItem to="/" active={isActive("/")}>Home</NavItem>
        <NavItem to="/about" active={isActive("/about")} icon={<Info className="w-4 h-4" />}>
          About VLITS
        </NavItem>

        {user ? (
          <>
            <NavItem to="/profile" active={isActive("/profile")} icon={<User className="w-4 h-4" />}>
              Profile
            </NavItem>
            <Button
              variant="ghost"
              size="sm"
              onClick={signOut}
              className="text-slate-300 hover:text-red-400 hover:bg-red-500/10 ml-2 transition-colors">
              <LogOut className="w-4 h-4 mr-1.5" />
              Logout
            </Button>
          </>
        ) : (
          <div className="flex items-center gap-2.5 ml-3 pl-3 border-l border-white/15">
            <Link to="/chat">
              <Button size="sm" className="gradient-gold text-slate-950 font-bold px-4 py-2 rounded-xl shadow-md hover:scale-105 transition-transform flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-slate-950" />
                Ask Lara AI
              </Button>
            </Link>
            <Link to="/login">
              <button
                type="button"
                className="bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs sm:text-sm px-4 py-2 rounded-xl border border-white/20 hover:border-amber-400/40 shadow-sm transition-all hover:scale-105 flex items-center gap-1.5 cursor-pointer">
                <User className="w-4 h-4 text-amber-400" />
                Login
              </button>
            </Link>
          </div>
        )}
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center gap-2">
        <Link to="/chat">
          <Button size="sm" className="gradient-gold text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            Chat
          </Button>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-200 hover:bg-white/10"
          aria-label="Toggle Menu">
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 p-4 flex flex-col gap-2 shadow-2xl md:hidden animate-in slide-in-from-top-2">
          <MobileNavItem to="/" active={isActive("/")} onClick={closeMobileMenu}>Home</MobileNavItem>
          <MobileNavItem to="/about" active={isActive("/about")} icon={<Info className="w-4 h-4" />} onClick={closeMobileMenu}>About College</MobileNavItem>
          
          {user ? (
            <>
              <MobileNavItem to="/profile" active={isActive("/profile")} icon={<User className="w-4 h-4" />} onClick={closeMobileMenu}>Profile</MobileNavItem>
              <div className="mt-2 pt-2 border-t border-white/10">
                <Button
                  variant="ghost"
                  onClick={() => { signOut(); closeMobileMenu(); }}
                  className="w-full justify-start text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <div className="mt-2 pt-2 border-t border-white/10 flex flex-col gap-2">
              <Link to="/login" onClick={closeMobileMenu} className="w-full">
                <button
                  type="button"
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2.5 rounded-xl border border-white/20 flex items-center justify-center gap-2 cursor-pointer shadow-md">
                  <User className="w-4 h-4 text-amber-400" />
                  Student Login
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

const NavItem = ({ to, active, children, icon }) => (
  <Link
    to={to}
    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? "text-amber-300 bg-amber-400/15 border border-amber-400/25 shadow-sm"
        : "text-slate-300 hover:text-white hover:bg-white/10"
    }`}>
    {icon && icon}
    {children}
  </Link>
);

const MobileNavItem = ({ to, active, children, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-base font-medium transition-all duration-200 ${
      active
        ? "text-amber-300 bg-amber-400/15 border border-amber-400/25"
        : "text-slate-300 hover:text-white hover:bg-white/5"
    }`}>
    {icon && icon}
    {children}
  </Link>
);

export default Navbar;