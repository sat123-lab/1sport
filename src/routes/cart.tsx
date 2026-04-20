import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { buildCartMessage, whatsappLink } from "@/lib/whatsapp";

export const Route = createFileRoute("/cart")({
  component: CartPage,
  head: () => ({ meta: [{ title: "Your Cart — Sportiffy" }] }),
});

function CartPage() {
  const { detailedItems, subtotal, updateQty, remove, clear } = useCart();
  const shipping = subtotal > 999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const handleWhatsappCheckout = () => {
    const msg = buildCartMessage(detailedItems, total);
    window.open(whatsappLink(msg), "_blank", "noopener,noreferrer");
  };

  if (detailedItems.length === 0) {
    return (
      <div className="container mx-auto px-6 py-24 text-center">
        <ShoppingBag className="w-14 h-14 mx-auto text-primary mb-4" />
        <h1 className="font-display text-4xl text-foreground">Your cart is empty</h1>
        <p className="mt-3 text-muted-foreground">Time to gear up. Explore the latest drops.</p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold shadow-card">
          Continue Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-6 py-10">
      <h1 className="font-display text-4xl md:text-5xl mb-8 text-foreground">Your Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <AnimatePresence>
            {detailedItems.map((item) => (
              <motion.div
                key={`${item.productId}-${item.size}-${item.color}`}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="bg-white border border-border rounded-2xl p-4 flex gap-4 shadow-soft"
              >
                <Link to="/product/$id" params={{ id: item.product.id }} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-secondary shrink-0">
                  <img src={item.product.image} alt={item.product.title} className="w-full h-full object-cover" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to="/product/$id" params={{ id: item.product.id }} className="font-medium line-clamp-1 text-foreground hover:text-primary">
                    {item.product.title}
                  </Link>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.color} · {item.size}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center bg-secondary rounded-lg">
                      <button onClick={() => updateQty(item.productId, item.quantity - 1, item.size, item.color)} className="p-2 hover:text-primary"><Minus className="w-3.5 h-3.5" /></button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQty(item.productId, item.quantity + 1, item.size, item.color)} className="p-2 hover:text-primary"><Plus className="w-3.5 h-3.5" /></button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-semibold text-foreground">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => remove(item.productId, item.size, item.color)} className="p-2 text-muted-foreground hover:text-destructive transition" aria-label="Remove">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive">Clear cart</button>
        </div>

        <aside className="lg:sticky lg:top-28 self-start bg-white border border-border rounded-2xl p-6 shadow-card">
          <h2 className="font-display text-2xl mb-5 text-foreground">Order Summary</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="text-foreground">₹{subtotal.toFixed(2)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-foreground">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</dd></div>
            <div className="flex justify-between pt-3 border-t border-border text-base font-semibold"><dt className="text-foreground">Total</dt><dd className="text-foreground text-xl font-display">₹{total.toFixed(2)}</dd></div>
          </dl>
          <button
            onClick={handleWhatsappCheckout}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition shadow-card"
            style={{ backgroundColor: "var(--whatsapp)" }}
          >
            <MessageCircle className="w-5 h-5" /> Checkout via WhatsApp
          </button>
          <p className="mt-3 text-xs text-center text-muted-foreground">You'll be redirected to WhatsApp to confirm your order.</p>
        </aside>
      </div>
    </div>
  );
}
