import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group relative"
    >
      <div className="relative overflow-hidden rounded-3xl bg-secondary shadow-card hover-lift border border-border/30">
        <Link to="/product/$id" params={{ id: product.id }} className="block aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-lg text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm shadow-lg
            ${product.badge === "SALE" ? "bg-destructive text-destructive-foreground" : product.badge === "NEW" ? "bg-foreground text-background" : "bg-primary text-primary-foreground"}`}>
            {product.badge}
          </span>
        )}

        <button
          aria-label="Wishlist"
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/95 shadow-card opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300"
        >
          <Heart className="w-4 h-4 text-foreground" />
        </button>

        <button
          onClick={() => add({ productId: product.id, quantity: 1, size: product.sizes[0], color: product.colors[0]?.name })}
          className="absolute inset-x-4 bottom-4 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-primary/25"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Cart
        </button>
      </div>

      <div className="mt-5 px-1">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Star className="w-3 h-3 fill-primary text-primary" />
          <span className="text-foreground font-medium">{product.rating.toFixed(1)}</span>
          <span>· {product.reviews} reviews</span>
        </div>
        <Link to="/product/$id" params={{ id: product.id }} className="block mt-2 font-semibold line-clamp-1 text-foreground hover:text-primary transition-colors">
          {product.title}
        </Link>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-xl font-display font-bold text-foreground">₹{product.price}</span>
          {product.compareAt && <span className="text-sm text-muted-foreground line-through">₹{product.compareAt}</span>}
        </div>
      </div>
    </motion.div>
  );
}
