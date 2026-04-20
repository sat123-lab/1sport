import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/20 z-[99] lg:hidden"
            onClick={onClose}
          />
          {/* Menu drawer */}
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200, mass: 1.2 }}
            className="fixed top-0 left-0 w-80 h-screen z-[100] bg-white shadow-2xl border-r border-gray-200 lg:hidden overflow-hidden"
          >
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <span className="font-display text-lg font-bold text-gray-800">Menu</span>
            <button onClick={onClose} className="p-2.5 rounded-xl hover:bg-gray-100 transition-colors">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="overflow-y-auto h-screen p-4 pt-1">
            {CATEGORIES.map((cat) => (
              <div key={cat.slug} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => setExpanded(expanded === cat.slug ? null : cat.slug)}
                  className="w-full flex items-center justify-between py-3.5 text-left hover:bg-gray-50 px-3 rounded-lg transition-colors group"
                >
                  <span className="font-display uppercase tracking-wide text-gray-800 font-semibold group-hover:text-primary">{cat.name}</span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expanded === cat.slug ? "rotate-180 text-primary" : ""}`} />
                </button>
                <AnimatePresence>
                  {expanded === cat.slug && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 pl-4 space-y-1.5">
                        <Link to="/category/$name" params={{ name: cat.slug }} onClick={onClose} className="block py-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                          View All {cat.name}
                        </Link>
                        {cat.subcategories.map((s) => (
                          <Link key={s} to="/category/$name" params={{ name: cat.slug }} onClick={onClose} className="block py-2 text-sm text-gray-600 hover:text-gray-800 hover:font-medium transition-all">
                            {s}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
