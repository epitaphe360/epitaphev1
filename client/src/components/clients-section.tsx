const clients = [
  { name: "Qatar Airways", initials: "QA" },
  { name: "HPS", initials: "HPS" },
  { name: "CMMB", initials: "CMMB" },
  { name: "DataProtect", initials: "DP" },
  { name: "XCOM", initials: "XC" },
  { name: "Vinci Energies", initials: "VE" },
  { name: "Schneider Electric", initials: "SE" },
  { name: "Dell", initials: "DELL" },
];

export function ClientsSection() {
  return (
    <section
      className="py-16 md:py-24 bg-secondary/30 overflow-hidden"
      data-testid="section-clients"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2
            className="text-2xl md:text-3xl font-bold text-foreground"
            data-testid="text-clients-title"
          >
            Ils nous font confiance
          </h2>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-secondary/30 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-secondary/30 to-transparent z-10" />

        <div className="flex animate-scroll">
          {[...clients, ...clients, ...clients].map((client, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-6 md:mx-10"
              data-testid={`client-logo-${index}`}
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-md bg-card border border-border flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover-elevate overflow-visible">
                <span className="text-lg md:text-xl font-bold text-muted-foreground hover:text-primary transition-colors">
                  {client.initials}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
