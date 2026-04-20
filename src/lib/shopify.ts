// Shopify Storefront API-ready abstraction layer.
// Currently returns mock data; swap implementations to call Shopify when ready.
import badminton from "@/assets/cat-badminton.jpg";
import cricket from "@/assets/cat-cricket.jpg";
import football from "@/assets/cat-football.jpg";
import tennis from "@/assets/cat-tennis.jpg";
import fitness from "@/assets/cat-fitness.jpg";
import skates from "@/assets/cat-skates.jpg";

export type Product = {
  id: string;
  handle: string;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  description: string;
  specs: { label: string; value: string }[];
  badge?: "NEW" | "HOT" | "SALE";
};

const img = [badminton, cricket, football, tennis, fitness, skates];

const seed: Omit<Product, "id" | "handle" | "images" | "colors" | "sizes" | "specs" | "description">[] = [
  { title: "Stratos Pro Carbon Racket", brand: "Sportiffy", category: "badminton", subcategory: "Rackets", price: 189, compareAt: 249, rating: 4.8, reviews: 312, image: badminton, badge: "HOT" },
  { title: "AeroFlight Shuttlecocks (12)", brand: "Sportiffy", category: "badminton", subcategory: "Shuttlecocks", price: 24, rating: 4.6, reviews: 188, image: badminton },
  { title: "Heritage English Willow Bat", brand: "Sportiffy", category: "cricket", subcategory: "Bats", price: 329, compareAt: 399, rating: 4.9, reviews: 421, image: cricket, badge: "SALE" },
  { title: "Match Tournament Cricket Ball", brand: "Sportiffy", category: "cricket", subcategory: "Balls", price: 18, rating: 4.4, reviews: 96, image: cricket },
  { title: "Velocity FG Football Boots", brand: "Sportiffy", category: "football", subcategory: "Shoes / Studs", price: 145, compareAt: 180, rating: 4.7, reviews: 540, image: football, badge: "NEW" },
  { title: "Pro Match Football Size 5", brand: "Sportiffy", category: "football", subcategory: "Balls", price: 49, rating: 4.5, reviews: 233, image: football },
  { title: "Spin Pro Tennis Racket", brand: "Sportiffy", category: "tennis", subcategory: "Rackets", price: 219, rating: 4.7, reviews: 178, image: tennis, badge: "HOT" },
  { title: "Championship Tennis Balls (3)", brand: "Sportiffy", category: "tennis", subcategory: "Balls", price: 12, rating: 4.6, reviews: 410, image: tennis },
  { title: "Pulse Runner Pro", brand: "Sportiffy", category: "endurance", subcategory: "Running Shoes", price: 159, compareAt: 199, rating: 4.8, reviews: 612, image: fitness, badge: "SALE" },
  { title: "Hex Rubber Dumbbells (Pair)", brand: "Sportiffy", category: "endurance", subcategory: "Dumbbells", price: 89, rating: 4.7, reviews: 145, image: fitness },
  { title: "Aurora Inline Skates", brand: "Sportiffy", category: "skates", subcategory: "Inline Skates", price: 199, rating: 4.6, reviews: 87, image: skates, badge: "NEW" },
  { title: "Carbon Pro Skateboard", brand: "Sportiffy", category: "skates", subcategory: "Skateboards", price: 129, rating: 4.5, reviews: 64, image: skates },
];

export const PRODUCTS: Product[] = seed.map((p, i) => ({
  ...p,
  id: `prod-${i + 1}`,
  handle: p.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  images: [p.image, img[(i + 1) % img.length], img[(i + 2) % img.length], img[(i + 3) % img.length]],
  colors: [
    { name: "Cyan", hex: "#22d3ee" },
    { name: "Lime", hex: "#a3e635" },
    { name: "Black", hex: "#0a0a0a" },
  ],
  sizes: p.subcategory.includes("Shoes") || p.subcategory.includes("Skates") || p.subcategory.includes("Boots")
    ? ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"]
    : ["S", "M", "L", "XL"],
  description:
    "Engineered for elite performance. Premium materials, advanced construction, and tournament-grade quality designed to push your game to the next level.",
  specs: [
    { label: "Brand", value: p.brand },
    { label: "Category", value: p.category },
    { label: "Material", value: "Premium composite" },
    { label: "Warranty", value: "12 months" },
  ],
}));

const wait = (ms = 200) => new Promise((r) => setTimeout(r, ms));

export async function getProducts(opts?: { category?: string; limit?: number }) {
  await wait();
  let list = PRODUCTS;
  if (opts?.category) list = list.filter((p) => p.category === opts.category);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getProductById(id: string) {
  await wait();
  return PRODUCTS.find((p) => p.id === id || p.handle === id) ?? null;
}

export type CartLine = { productId: string; quantity: number; size?: string; color?: string };
export type Cart = { id: string; lines: CartLine[]; checkoutUrl: string };

export async function createCart(): Promise<Cart> {
  await wait(50);
  return { id: `cart-${Date.now()}`, lines: [], checkoutUrl: "#shopify-checkout" };
}

export async function addToCart(cart: Cart, line: CartLine): Promise<Cart> {
  await wait(50);
  const existing = cart.lines.find(
    (l) => l.productId === line.productId && l.size === line.size && l.color === line.color,
  );
  const lines = existing
    ? cart.lines.map((l) => (l === existing ? { ...l, quantity: l.quantity + line.quantity } : l))
    : [...cart.lines, line];
  return { ...cart, lines };
}
