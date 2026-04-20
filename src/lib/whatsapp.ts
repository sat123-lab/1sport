import type { Product } from "./shopify";

// Update this to your store's WhatsApp business number (international format, no +).
export const WHATSAPP_NUMBER = "919999999999";

function siteOrigin() {
  if (typeof window !== "undefined") return window.location.origin;
  return "https://sportiffy.shop";
}

export function productUrl(product: Pick<Product, "id">) {
  return `${siteOrigin()}/product/${product.id}`;
}

export function buildProductMessage(product: Product, opts?: { size?: string; color?: string; quantity?: number }) {
  const lines = [
    "Hello, I want to order this product:",
    "",
    `Product Name: ${product.title}`,
    `Price: ₹${product.price}`,
    opts?.size ? `Size: ${opts.size}` : null,
    opts?.color ? `Color: ${opts.color}` : null,
    opts?.quantity ? `Quantity: ${opts.quantity}` : null,
    `Description: ${product.description.slice(0, 140)}`,
    "",
    "Product Link:",
    productUrl(product),
  ].filter(Boolean);
  return lines.join("\n");
}

export function buildCartMessage(
  items: { product: Product; quantity: number; size?: string; color?: string }[],
  total: number,
) {
  const header = ["Hello, I want to place this order:", ""];
  const body = items.map((i, idx) =>
    [
      `${idx + 1}. ${i.product.title}`,
      `   Price: ₹${i.product.price} × ${i.quantity}`,
      i.size || i.color ? `   ${[i.color, i.size].filter(Boolean).join(" / ")}` : null,
      `   Link: ${productUrl(i.product)}`,
    ]
      .filter(Boolean)
      .join("\n"),
  );
  const footer = ["", `Order Total: ₹${total.toFixed(2)}`];
  return [...header, ...body, ...footer].join("\n");
}

export function whatsappLink(message: string, phone: string = WHATSAPP_NUMBER) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
