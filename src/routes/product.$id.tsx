import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, Shield, RotateCcw, MessageCircle } from "lucide-react";
import { PRODUCTS } from "@/lib/shopify";
import { useCart } from "@/context/CartContext";
import { buildProductMessage, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = PRODUCTS.find((p) => p.id === params.id || p.handle === params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Sportiffy` },
          { name: "description", content: loaderData.product.description.slice(0, 160) },
          { property: "og:title", content: loaderData.product.title },
          { property: "og:description", content: loaderData.product.description.slice(0, 160) },
          { property: "og:image", content: loaderData.product.image },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-4xl text-foreground">Product not found</h1>
      <Link to="/" className="mt-6 inline-block text-primary">Back home</Link>
    </div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState(product.sizes[0]);
  const [qty, setQty] = useState(1);

  const handleAdd = () => add({ productId: product.id, quantity: qty, size, color });

  const handleBuyNow = () => {
    const msg = buildProductMessage(product, { size, color, quantity: qty });
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <div className="container mx-auto px-4 lg:px-6 py-10">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/category/$name" params={{ name: product.category }} className="hover:text-foreground capitalize">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.title}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="aspect-square overflow-hidden rounded-3xl bg-secondary shadow-soft"
          >
            <img src={product.images[activeImg]} alt={product.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </motion.div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img: string, i: number) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-square rounded-xl overflow-hidden border-2 transition ${i === activeImg ? "border-primary" : "border-border opacity-70 hover:opacity-100"}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:pl-6">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">{product.brand}</span>
          <h1 className="font-display text-3xl md:text-5xl mt-2 text-foreground">{product.title}</h1>
          <div className="flex items-center gap-2 mt-3 text-sm">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-primary text-primary" : "text-muted"}`} />
              ))}
            </div>
            <span className="text-muted-foreground">{product.rating} · {product.reviews} reviews</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl text-foreground font-bold">₹{product.price}</span>
            {product.compareAt && (
              <>
                <span className="text-lg text-muted-foreground line-through">₹{product.compareAt}</span>
                <span className="px-2 py-1 rounded-md bg-destructive/10 text-destructive text-xs font-bold">
                  -{Math.round((1 - product.price / product.compareAt) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Color */}
          <div className="mt-7">
            <div className="text-sm font-semibold mb-3 text-foreground">Color: <span className="text-muted-foreground font-normal">{color}</span></div>
            <div className="flex gap-3">
              {product.colors.map((c: { name: string; hex: string }) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  className={`w-10 h-10 rounded-full border-2 transition ${color === c.name ? "border-primary scale-110 shadow-soft" : "border-border"}`}
                  style={{ backgroundColor: c.hex }}
                  aria-label={c.name}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-6">
            <div className="text-sm font-semibold mb-3 text-foreground">Size: <span className="text-muted-foreground font-normal">{size}</span></div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[56px] px-4 py-2.5 rounded-xl text-sm font-medium border transition ${size === s ? "bg-primary text-primary-foreground border-primary" : "bg-white border-border hover:border-primary text-foreground"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Qty + CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center bg-white border border-border rounded-xl">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3.5 hover:text-primary"><Minus className="w-4 h-4" /></button>
              <span className="w-10 text-center font-semibold text-foreground">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3.5 hover:text-primary"><Plus className="w-4 h-4" /></button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition shadow-card"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
            <button className="p-3.5 rounded-xl bg-white border border-border hover:border-primary transition" aria-label="Wishlist">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={handleBuyNow}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition shadow-card"
            style={{ backgroundColor: "var(--whatsapp)" }}
          >
            <MessageCircle className="w-5 h-5" /> Buy Now via WhatsApp
          </button>

          <div className="mt-8 grid grid-cols-3 gap-3 text-xs">
            {[
              { Icon: Truck, label: "Free shipping ₹999+" },
              { Icon: RotateCcw, label: "30-day returns" },
              { Icon: Shield, label: "12-month warranty" },
            ].map(({ Icon, label }) => (
              <div key={label} className="bg-white border border-border rounded-xl p-3 text-center">
                <Icon className="w-4 h-4 mx-auto mb-1.5 text-primary" />
                <div className="text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-20 grid lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-display text-2xl mb-4 text-foreground">Description</h2>
          <p className="text-muted-foreground leading-relaxed">{product.description} Built for the rigor of competitive play with materials and construction trusted by professional athletes worldwide.</p>
        </div>
        <div>
          <h2 className="font-display text-2xl mb-4 text-foreground">Specifications</h2>
          <dl className="divide-y divide-border">
            {product.specs.map((s: { label: string; value: string }) => (
              <div key={s.label} className="flex justify-between py-3 text-sm">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="font-medium capitalize text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
