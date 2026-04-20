import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { PRODUCTS } from "@/lib/shopify";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!q.trim()) return PRODUCTS.slice(0, 6);
    const term = q.toLowerCase();
    return PRODUCTS.filter(
      (p) => p.title.toLowerCase().includes(term) || p.category.includes(term) || p.subcategory.toLowerCase().includes(term),
    ).slice(0, 8);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ type: "spring", damping: 22 }}
            className="container mx-auto px-6 pt-32 max-w-4xl flex flex-col h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search for premium sports gear..."
                  className="flex-1 bg-transparent border-0 outline-none py-4 text-lg font-medium text-foreground placeholder:text-gray-400"
                />
                <button 
                  onClick={onClose} 
                  className="p-3 rounded-2xl hover:bg-gray-100 transition-all duration-200 group"
                >
                  <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors" />
                </button>
              </div>
              
              <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
              
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                    {q.trim() ? "Search Results" : "Popular Products"}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {results.length} {results.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-y-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
              {results.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$id"
                  params={{ id: p.id }}
                  onClick={onClose}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:border-primary/20 transition-all duration-300 group overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-primary transition-colors">{p.title}</div>
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-bold text-primary">₹{p.price}</div>
                      <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{p.category}</div>
                    </div>
                  </div>
                </Link>
              ))}
              {results.length === 0 && (
                <div className="col-span-full text-center py-16">
                  <div className="inline-flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <div className="text-gray-500 font-medium mb-2">No products found</div>
                    <div className="text-sm text-gray-400">Try searching with different keywords</div>
                  </div>
                </div>
              )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
