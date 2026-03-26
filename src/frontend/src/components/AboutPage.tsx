import { Award, Heart, Leaf, Users } from "lucide-react";
import type { Page } from "../types";

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

const values = [
  {
    icon: Leaf,
    title: "Organic",
    desc: "Every product is grown without synthetic pesticides or fertilisers, preserving soil health and your wellbeing.",
  },
  {
    icon: Heart,
    title: "Farm-to-Table",
    desc: "We bridge the gap between Pahadi farmers and your kitchen, cutting out middlemen and ensuring freshness.",
  },
  {
    icon: Users,
    title: "Community",
    desc: "Purchasing from us directly supports small-scale farmers and their families in the Kumaon hills.",
  },
  {
    icon: Award,
    title: "Authenticity",
    desc: "Traditional heirloom varieties are preserved and celebrated — seeds passed down across generations.",
  },
];

const team = [
  {
    name: "Ananya Rawat",
    role: "Founder & Farmer Liaison",
    bio: "Born in Nainital, Ananya grew up watching her grandparents cultivate Bhatt dal on terraced hillside fields. She founded ShopZone to share these flavours with the world.",
  },
  {
    name: "Deepak Joshi",
    role: "Head of Operations",
    bio: "A logistics expert from Almora, Deepak ensures every order travels from the farm to your door with care and speed.",
  },
  {
    name: "Meera Pant",
    role: "Quality & Sourcing",
    bio: "Meera personally visits farms across Pithoragarh and Bageshwar to curate products that meet our exacting quality standards.",
  },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <main>
      {/* Hero */}
      <section className="bg-primary/5 border-b border-border py-20 px-4 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
          Who We Are
        </p>
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
          Our Story
        </h1>
        <p className="max-w-2xl mx-auto text-base md:text-lg text-muted-foreground leading-relaxed">
          Nestled in the misty Kumaon hills of Uttarakhand, generations of
          Pahadi farmers have cultivated rare lentils, grains, and pulses using
          age-old techniques. ShopZone Pahadi Store was born from a simple
          desire — to carry those honest, nourishing flavours straight from the
          terraced hillside farms to tables across India. Every packet you
          receive carries the soil, sunshine, and sweat of mountain communities
          who have stewarded this land for centuries.
        </p>
      </section>

      {/* Values */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
            What Drives Us
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight">
            Our Values
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border shadow-xs"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <v.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-base mb-2">{v.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-card border-t border-border px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">
              The People
            </p>
            <h2 className="text-3xl font-black uppercase tracking-tight">
              Meet Our Team
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-20 h-20 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-4 text-2xl font-black text-primary">
                  {member.name[0]}
                </div>
                <h3 className="font-bold text-base">{member.name}</h3>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  {member.role}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-black uppercase tracking-tight mb-4">
          Ready to taste the hills?
        </h2>
        <p className="text-muted-foreground mb-6">
          Explore our curated range of authentic Pahadi produce.
        </p>
        <button
          type="button"
          data-ocid="about.primary_button"
          onClick={() => onNavigate("shop")}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full hover:opacity-90 transition text-sm uppercase tracking-wider"
        >
          Shop Now
        </button>
      </section>
    </main>
  );
}
