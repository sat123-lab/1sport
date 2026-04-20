import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useIsClient } from "@/hooks/useIsClient";
import { PRODUCTS, type Product } from "@/lib/shopify";

export type CartItem = {
  productId: string;
  quantity: number;
  size?: string;
  color?: string;
};

type CartContextValue = {
  items: CartItem[];
  detailedItems: (CartItem & { product: Product })[];
  count: number;
  subtotal: number;
  add: (item: CartItem) => void;
  remove: (productId: string, size?: string, color?: string) => void;
  updateQty: (productId: string, quantity: number, size?: string, color?: string) => void;
  clear: () => void;
  isOpen: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sportiffy_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, [isClient]);

  useEffect(() => {
    if (!isClient || typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, isClient]);

  const value = useMemo<CartContextValue>(() => {
    const detailedItems = items
      .map((i) => {
        const product = PRODUCTS.find((p) => p.id === i.productId);
        return product ? { ...i, product } : null;
      })
      .filter((x): x is CartItem & { product: Product } => x !== null);
    const subtotal = detailedItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);

    return {
      items,
      detailedItems,
      count,
      subtotal,
      add: (item) =>
        setItems((prev) => {
          const idx = prev.findIndex(
            (p) => p.productId === item.productId && p.size === item.size && p.color === item.color,
          );
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + item.quantity };
            return copy;
          }
          return [...prev, item];
        }),
      remove: (productId, size, color) =>
        setItems((prev) => prev.filter((p) => !(p.productId === productId && p.size === size && p.color === color))),
      updateQty: (productId, quantity, size, color) =>
        setItems((prev) =>
          prev
            .map((p) =>
              p.productId === productId && p.size === size && p.color === color ? { ...p, quantity } : p,
            )
            .filter((p) => p.quantity > 0),
        ),
      clear: () => setItems([]),
      isOpen,
      setOpen,
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
