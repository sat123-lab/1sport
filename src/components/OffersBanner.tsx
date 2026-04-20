import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero3 from "@/assets/hero-3.jpg";
import hero1 from "@/assets/hero-1.jpg";

export function OffersBanner() {
  return (
    <section className="container mx-auto px-6 py-20 grid md:grid-cols-2 gap-8">
      {[
        { img: hero1, title: "Up to 40% Off", sub: "Badminton Pro Collection", href: "badminton" },
        { img: hero3, title: "New Drop", sub: "Velocity Football Studs", href: "football" },
      ].map((o) => (
        <Link
          key={o.title}
          to="/category/$name"
          params={{ name: o.href }}
          className="group relative aspect-[16/10] overflow-hidden rounded-3xl shadow-card hover-lift border border-border/30"
        >
          <img src={o.img} alt={o.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
          <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
            <span className="text-xs uppercase tracking-[0.3em] font-bold mb-3 text-white bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full w-fit">{o.sub}</span>
            <h3 className="font-display text-3xl md:text-5xl text-white font-bold mb-4 drop-shadow-lg">{o.title}</h3>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit hover:bg-white/30 transition-all duration-300">
              Shop now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
