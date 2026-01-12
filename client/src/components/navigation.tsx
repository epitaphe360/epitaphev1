import { useState, useEffect, useRef } from "react";
import { Menu, X, Moon, Sun, ShoppingCart, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const metiersSubmenu = [
  { label: "Digital", href: "#services", description: "Stratégies digitales innovantes" },
  { label: "Industrie publicitaire", href: "#services", description: "Campagnes publicitaires percutantes" },
  { label: "Contents", href: "#services", description: "Création de contenus engageants" },
  { label: "Communication globale", href: "#services", description: "Stratégies intégrées" },
  { label: "Événementiel", href: "#services", description: "Organisation d'événements" },
];

const solutionsSubmenu = [
  { label: "Branding", href: "#portfolio", description: "Identité visuelle et positionnement" },
  { label: "Design graphique", href: "#portfolio", description: "Créations visuelles impactantes" },
  { label: "Production vidéo", href: "#portfolio", description: "Contenus audiovisuels" },
  { label: "Stratégie digitale", href: "#portfolio", description: "Présence en ligne optimisée" },
  { label: "Social media", href: "#portfolio", description: "Gestion des réseaux sociaux" },
];

const navLinks = [
  { label: "A propos", href: "#about", hasSubmenu: false },
  { label: "Nos métiers", href: "#services", hasSubmenu: true, submenu: metiersSubmenu },
  { label: "Nos solutions", href: "#portfolio", hasSubmenu: true, submenu: solutionsSubmenu },
  { label: "Nos références", href: "#portfolio", hasSubmenu: false },
  { label: "Ressources", href: "#blog", hasSubmenu: false },
  { label: "Contact", href: "#contact", hasSubmenu: false },
];

function DropdownMenu({ 
  label, 
  submenu, 
  scrollToSection 
}: { 
  label: string; 
  submenu: typeof metiersSubmenu; 
  scrollToSection: (href: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div 
      ref={menuRef}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        data-testid={`link-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-72 bg-popover border border-popover-border rounded-md shadow-lg p-2 z-50">
          {submenu.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                scrollToSection(item.href);
                setIsOpen(false);
              }}
              className="block w-full text-left p-3 rounded-md hover:bg-accent/50 transition-colors"
              data-testid={`link-submenu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="text-sm font-medium text-foreground">{item.label}</div>
              <p className="text-xs text-muted-foreground mt-0.5">{item.description}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
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
              className="flex items-center"
              data-testid="link-logo"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src="https://epitaphe.ma/wp-content/uploads/2020/05/LOGO-epitaphe360-1.png"
                alt="Epitaphe 360"
                className="h-10 md:h-12 w-auto"
                data-testid="img-logo"
              />
            </a>

            <nav className="hidden lg:flex items-center">
              {navLinks.map((link) => (
                link.hasSubmenu ? (
                  <DropdownMenu
                    key={link.label}
                    label={link.label}
                    submenu={link.submenu!}
                    scrollToSection={scrollToSection}
                  />
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                    data-testid={`link-nav-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </button>
                )
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
          className="fixed inset-0 z-50 bg-background/98 backdrop-blur-md lg:hidden overflow-y-auto"
          data-testid="mobile-menu-overlay"
        >
          <div className="flex flex-col min-h-full">
            <div className="flex items-center justify-between px-4 h-16 border-b border-border">
              <img
                src="https://epitaphe.ma/wp-content/uploads/2020/05/LOGO-epitaphe360-1.png"
                alt="Epitaphe 360"
                className="h-8 w-auto"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-close-mobile-menu"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex flex-col py-6 px-4 flex-1">
              {navLinks.map((link) => (
                <div key={link.label} className="border-b border-border/50">
                  {link.hasSubmenu ? (
                    <Collapsible
                      open={openMobileSubmenu === link.label}
                      onOpenChange={(open) =>
                        setOpenMobileSubmenu(open ? link.label : null)
                      }
                    >
                      <CollapsibleTrigger
                        className="flex items-center justify-between w-full py-4 text-lg font-semibold text-foreground"
                        data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {link.label}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            openMobileSubmenu === link.label ? "rotate-180" : ""
                          }`}
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="pl-4 pb-4 space-y-2">
                          {link.submenu?.map((item) => (
                            <button
                              key={item.label}
                              onClick={() => scrollToSection(item.href)}
                              className="block w-full text-left py-2 text-base text-muted-foreground hover:text-primary transition-colors"
                              data-testid={`link-mobile-submenu-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="block w-full text-left py-4 text-lg font-semibold text-foreground hover:text-primary transition-colors"
                      data-testid={`link-mobile-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                    </button>
                  )}
                </div>
              ))}
              <Button
                className="mt-6"
                size="lg"
                data-testid="button-mobile-boutique"
              >
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
