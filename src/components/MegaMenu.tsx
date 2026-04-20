import { useState } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function MegaMenu() {
  const [active, setActive] = useState<string | null>(null);
  const isClient = useIsClient();

  return (
    <nav
      className="hidden lg:flex items-center gap-1 h-full"
      onMouseLeave={() => setActive(null)}
    >
      {CATEGORIES.map((cat) => {
        const isActive = active === cat.slug;
        return (
          <div key={cat.slug} className="h-full flex items-center relative" onMouseEnter={() => setActive(cat.slug)} onMouseLeave={() => setActive(null)}>
            <Link
              to="/category/$name"
              params={{ name: cat.slug }}
              className={`px-3 py-2 text-[13px] font-semibold tracking-wide uppercase transition-colors flex items-center gap-1 ${
                isActive ? "text-primary" : "text-white/80 hover:text-primary"
              }`}
            >
              {cat.name}
              <ChevronDown className={`w-3 h-3 opacity-60 transition-transform ${isActive ? "rotate-180" : ""}`} />
            </Link>
            
            {isClient && (
              <AnimatePresence>
                {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ 
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1]
                  }}
                  className="absolute top-full left-0 w-max z-50 mt-1"
                  onMouseEnter={() => setActive(cat.slug)}
                >
                  <div className="bg-white/95 backdrop-blur-md shadow-xl border border-border/50 rounded-2xl">
                    <div className="px-6 py-4 min-w-[200px]">
                      <div className="text-[11px] uppercase tracking-[0.25em] text-foreground mb-4 font-semibold">
                        {cat.name} categories
                      </div>
                      <div className="grid grid-cols-1 gap-x-6 gap-y-3">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub}
                            to="/category/$name"
                            params={{ name: cat.slug }}
                            className="group flex items-center justify-between text-sm text-foreground hover:text-primary transition-all duration-200 py-2 px-1 rounded-lg hover:bg-secondary/50"
                          >
                            <span>{sub}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        );
      })}
    </nav>
  );
}
