import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

const navLinks = [
  { label: "A propos", href: "#about" },
  { label: "Nos métiers", href: "#services" },
  { label: "Nos références", href: "#portfolio" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-transparent"
        }`}
        data-testid="header-navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            <a
              href="#"
              className="flex items-center gap-2"
              data-testid="link-logo"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <span className="text-primary font-bold text-xl md:text-2xl tracking-tight">
                epitaphe
              </span>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded">
                360
              </span>
            </a>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                data-testid="button-theme-toggle"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>

              <Button
                className="hidden md:inline-flex"
                data-testid="button-boutique"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Boutique
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
                data-testid="button-mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md lg:hidden"
          data-testid="mobile-menu-overlay"
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between px-4 h-16">
              <span className="text-primary font-bold text-xl">
                epitaphe
                <span className="bg-primary text-primary-foreground text-xs font-bold px-1.5 py-0.5 rounded ml-1">
                  360
                </span>
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-close-mobile-menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col items-center justify-center flex-1 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-semibold text-foreground hover:text-primary transition-colors"
                  data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.label}
                </button>
              ))}
              <Button className="mt-4" size="lg" data-testid="button-mobile-boutique">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Boutique
              </Button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
