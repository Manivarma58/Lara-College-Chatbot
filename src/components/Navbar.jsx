import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, LogOut, User, MessageCircle, Info, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-16 glass bg-background/90 backdrop-blur-2xl border-b border-border/40 flex items-center justify-between px-4 sm:px-6 z-50 transition-all duration-300">
      <Link to="/" className="flex items-center gap-2 text-primary font-extrabold text-lg sm:text-xl tracking-wide hover:scale-105 transition-transform duration-300">
        <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent whitespace-nowrap">Vignan Lara</span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {user ? (
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
          </>
        ) : (
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
        )}
      </nav>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-primary hover:bg-primary/10"
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border/40 p-4 flex flex-col gap-2 shadow-lg md:hidden animate-in slide-in-from-top-2">
          {user ? (
            <>
              <MobileNavItem to="/chat" active={isActive("/chat")} icon={<MessageCircle className="w-5 h-5" />} onClick={closeMobileMenu}>Chat</MobileNavItem>
              <MobileNavItem to="/about" active={isActive("/about")} icon={<Info className="w-5 h-5" />} onClick={closeMobileMenu}>About</MobileNavItem>
              <MobileNavItem to="/profile" active={isActive("/profile")} icon={<User className="w-5 h-5" />} onClick={closeMobileMenu}>Profile</MobileNavItem>
              <div className="mt-2 pt-2 border-t border-border/40">
                <Button
                  variant="ghost"
                  onClick={() => { signOut(); closeMobileMenu(); }}
                  className="w-full justify-start text-foreground/80 hover:text-accent hover:bg-accent/10 transition-colors">
                  <LogOut className="w-5 h-5 mr-3" />
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <MobileNavItem to="/" active={isActive("/")} icon={null} onClick={closeMobileMenu}>Home</MobileNavItem>
              <MobileNavItem to="/about" active={isActive("/about")} icon={<Info className="w-5 h-5" />} onClick={closeMobileMenu}>About</MobileNavItem>
              <div className="mt-2 pt-2 border-t border-border/40">
                <Link to="/login" onClick={closeMobileMenu} className="w-full">
                  <Button className="w-full gradient-navy text-primary-foreground font-semibold shadow-md">
                    <User className="w-5 h-5 mr-2" />
                    Log In
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
};

const NavItem = ({ to, active, children, icon }) => (
  <Link
    to={to}
    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-300 ${active ?
      "text-primary bg-primary/10 shadow-sm" :
      "text-foreground/80 hover:text-primary hover:bg-primary/5"}`
    }>
    {icon && icon}
    {children}
  </Link>
);

const MobileNavItem = ({ to, active, children, icon, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-md text-base font-medium transition-all duration-200 ${active ?
      "text-primary bg-primary/10 shadow-sm" :
      "text-foreground/80 hover:text-primary hover:bg-primary/5"}`
    }>
    {icon && icon}
    {children}
  </Link>
);

export default Navbar;