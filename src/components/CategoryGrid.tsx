import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { CATEGORIES } from "@/data/categories";

export function CategoryGrid() {
  return (
    <section className="container mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-12">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">Shop by Sport</span>
          <h2 className="font-display text-4xl md:text-6xl mt-3 text-foreground">Find Your <span className="text-gradient">Edge</span></h2>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {CATEGORIES.slice(0, 6).map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: "easeOut" }}
          >
            <Link
              to="/category/$name"
              params={{ name: cat.slug }}
              className="group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-secondary shadow-card hover-lift border border-border/50"
            >
              <img src={cat.image} alt={cat.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-white">
                <h3 className="font-display text-2xl md:text-3xl font-bold drop-shadow-lg">{cat.name}</h3>
                <span className="text-[11px] uppercase tracking-widest opacity-90 drop-shadow-md">
                  {cat.subcategories.length} categories →
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
