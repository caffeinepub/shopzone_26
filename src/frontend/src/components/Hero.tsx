import type { Page } from "../types";

interface HeroProps {
  onNavigate: (page: Page) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative w-full h-[500px] sm:h-[580px] overflow-hidden">
      {/* Background image */}
      <img
        src="/assets/generated/hero-banner.dim_1400x600.jpg"
        alt="Pahadi Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Left overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(31,31,31,0.80) 0%, rgba(31,31,31,0.55) 50%, rgba(31,31,31,0.1) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full">
          <div className="max-w-xl">
            <p className="text-white/70 text-sm font-medium tracking-widest uppercase mb-3">
              Straight from the Himalayas
            </p>
            <h1 className="text-5xl sm:text-6xl font-black uppercase text-white leading-none tracking-tight mb-4">
              TASTE
              <br />
              THE HILLS
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-8 leading-relaxed">
              Authentic Pahadi dals straight from the Himalayan farms of
              Uttarakhand
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                data-ocid="hero.primary_button"
                onClick={() => onNavigate("home")}
                className="px-6 py-3 bg-primary text-white font-bold text-sm uppercase tracking-wider rounded-md hover:opacity-90 transition"
              >
                SHOP NOW
              </button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={() => onNavigate("home")}
                className="px-6 py-3 border-2 border-white text-white font-bold text-sm uppercase tracking-wider rounded-md hover:bg-white hover:text-foreground transition"
              >
                EXPLORE PRODUCTS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
