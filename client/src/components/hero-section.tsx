import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const typingTexts = ["globalement créative", "innovante", "passionnée"];

export function HeroSection() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = typingTexts[currentTextIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < currentFullText.length) {
            setDisplayText(currentFullText.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentTextIndex]);

  const scrollToServices = () => {
    const element = document.querySelector("#services");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-primary/20 rounded-full animate-pulse" />
        <div className="absolute top-2/3 left-1/4 w-3 h-3 bg-accent/20 rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-primary/30 rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-6">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground"
            data-testid="text-hero-title"
          >
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2">
              Epitaphe 360
            </span>
          </h1>
        </div>

        <div className="mb-8">
          <p
            className="text-xl sm:text-2xl md:text-3xl font-semibold"
            data-testid="text-hero-tagline"
          >
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2">
              Inspirez. Connectez.
            </span>
            <br className="sm:hidden" />
            <span className="inline-block bg-primary text-primary-foreground px-4 py-2 mt-2 sm:mt-0 sm:ml-0">
              Marquez Durablement.
            </span>
          </p>
        </div>

        <div className="mb-12">
          <p className="text-lg md:text-xl text-muted-foreground">
            Nous sommes une agence de communication 360°
          </p>
          <p className="text-2xl md:text-3xl font-bold text-foreground mt-2 h-10">
            {displayText}
            <span className="inline-block w-0.5 h-8 bg-primary ml-1 animate-pulse" />
          </p>
        </div>

        <p
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          data-testid="text-hero-description"
        >
          <span className="font-semibold text-foreground">Vous voulez impacter?</span>{" "}
          Nous savons comment!
        </p>
      </div>

      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        data-testid="button-scroll-down"
      >
        <span className="text-sm font-medium">Découvrir</span>
        <ChevronDown className="h-6 w-6 animate-bounce" />
      </button>
    </section>
  );
}
