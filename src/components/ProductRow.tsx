import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/shopify";

export function ProductRow({ title, eyebrow, products }: { title: string; eyebrow: string; products: Product[] }) {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="mb-12">
        <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">{eyebrow}</span>
        <h2 className="font-display text-3xl md:text-6xl mt-3 text-foreground">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
