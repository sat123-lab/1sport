import { useEffect, useState } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const SLIDES = [
  { image: hero1, eyebrow: "Badminton · Drop 24", title: "Smash Harder.\nMove Faster.", subtitle: "Tournament-grade rackets engineered for explosive control.", cta: "Shop Badminton", href: "badminton" },
  { image: hero2, eyebrow: "Cricket Pro Series", title: "Born for the\nBig Stage.", subtitle: "English willow bats hand-crafted for centuries-old performance.", cta: "Shop Cricket", href: "cricket" },
  { image: hero3, eyebrow: "Football Velocity", title: "Run the Pitch.\nOwn the Game.", subtitle: "Lightweight studs with precision traction for elite playmakers.", cta: "Shop Football", href: "football" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [isClient]);

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-black">
      {isClient && (
        <AnimatePresence mode="sync">
          {SLIDES.map((s, idx) =>
            idx === i ? (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <img src={s.image} alt="" className="w-full h-full object-cover" fetchPriority={idx === 0 ? "high" : "auto"} />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      )}

      <div className="relative container mx-auto px-6 h-full flex items-center">
        <div className="max-w-2xl">
          {isClient && (
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-white font-bold mb-6 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg">
                {SLIDES[i].eyebrow}
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] whitespace-pre-line text-white drop-shadow-2xl">
                {SLIDES[i].title}
              </h1>
              <p className="mt-6 text-lg text-white/90 max-w-md drop-shadow-lg">{SLIDES[i].subtitle}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/category/$name"
                  params={{ name: SLIDES[i].href }}
                  className="group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all duration-300 shadow-2xl hover:shadow-white/25 hover:scale-105"
                >
                  {SLIDES[i].cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/category/$name" params={{ name: "endurance" }} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-black transition-all duration-300">
                  Explore All
                </Link>
              </div>
            </motion.div>
            </AnimatePresence>
        )}
        </div>
      </div>

      {isClient && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === i ? "w-16 bg-white" : "w-8 bg-white/30"}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
