
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, HelpCircle, Home, Menu, X } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-background/80 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 text-foreground transition-all"
        >
          <FileText className="h-6 w-6 text-primary" />
          <span className="font-semibold text-lg">DocuFetcher</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" label="Home" icon={<Home className="w-4 h-4" />} isActive={isActive("/")} />
          <NavLink to="/help" label="Help" icon={<HelpCircle className="w-4 h-4" />} isActive={isActive("/help")} />
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border/30 shadow-lg animate-scale-in">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <MobileNavLink to="/" label="Home" icon={<Home className="w-4 h-4" />} isActive={isActive("/")} onClick={() => setIsMobileMenuOpen(false)} />
            <MobileNavLink to="/help" label="Help" icon={<HelpCircle className="w-4 h-4" />} isActive={isActive("/help")} onClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon?: React.ReactNode;
  isActive: boolean;
}

const NavLink = ({ to, label, icon, isActive }: NavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-1 py-2 font-medium transition-all relative ${
      isActive
        ? "text-primary"
        : "text-foreground/80 hover:text-foreground"
    }`}
  >
    {icon}
    <span>{label}</span>
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full" />
    )}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, label, icon, isActive, onClick }: MobileNavLinkProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-3 py-3 rounded-md transition-all ${
      isActive
        ? "bg-accent text-primary font-medium"
        : "text-foreground/80 hover:bg-accent/50 hover:text-foreground"
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

export default Header;
