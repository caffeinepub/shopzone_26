import { ArrowRight, Leaf, Mountain, ShieldCheck, Truck } from "lucide-react";
import type { Page } from "../types";
import Hero from "./Hero";

interface HomePageProps {
  onNavigate: (page: Page, productId?: string) => void;
}

const features = [
  {
    icon: Leaf,
    title: "100% Organic",
    desc: "Certified organic produce, free from harmful pesticides and chemicals.",
  },
  {
    icon: Mountain,
    title: "Direct from Farms",
    desc: "Sourced directly from Pahadi farmers in the Kumaon hills of Uttarakhand.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    desc: "Fresh products delivered to your doorstep within 3–5 business days.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic Pahadi",
    desc: "Genuine traditional varieties preserving centuries-old mountain food heritage.",
  },
];

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <>
      <Hero onNavigate={onNavigate} />

      {/* Shop CTA Banner */}
      <section className="py-14 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="relative bg-primary rounded-2xl overflow-hidden p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* bg decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-white" />
            <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full bg-white" />
          </div>
          <div className="relative z-10">
            <p className="text-primary-foreground/80 text-xs font-bold uppercase tracking-widest mb-2">
              Fresh Arrivals
            </p>
            <h2 className="text-2xl md:text-3xl font-black text-primary-foreground uppercase tracking-tight leading-tight">
              Shop Our Pahadi Products
            </h2>
            <p className="text-primary-foreground/80 mt-2 text-sm max-w-sm">
              Discover heirloom lentils, ancient grains, and mountain spices —
              sourced directly from the hills.
            </p>
          </div>
          <button
            type="button"
            data-ocid="home.primary_button"
            onClick={() => onNavigate("shop")}
            className="relative z-10 shrink-0 flex items-center gap-2 bg-white text-primary font-bold px-7 py-3 rounded-full hover:bg-white/90 transition text-sm uppercase tracking-wider shadow-card"
          >
            Browse Products <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-14 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              Our Promise
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Why Choose Us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col items-center text-center p-6 bg-background rounded-xl shadow-xs"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-base mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
