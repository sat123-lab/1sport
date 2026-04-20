import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ProductRow } from "@/components/ProductRow";
import { BrandMarquee } from "@/components/BrandMarquee";
import { OffersBanner } from "@/components/OffersBanner";
import { PRODUCTS } from "@/lib/shopify";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Sportiffy — Gear. Velocity. You." },
      { name: "description", content: "Shop premium sports equipment across badminton, cricket, football, tennis, fitness and more." },
    ],
  }),
});

function Index() {
  const trending = PRODUCTS.slice(0, 8);
  const bestsellers = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4);

  return (
    <>
      <HeroSlider />
      <CategoryGrid />
      <ProductRow eyebrow="Trending Now" title="Hot Off the Court" products={trending} />
      <BrandMarquee />
      <OffersBanner />
      <ProductRow eyebrow="Best Sellers" title="Athlete Favorites" products={bestsellers} />
    </>
  );
}
