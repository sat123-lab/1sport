import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/lib/shopify";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/category/$name")({
  loader: ({ params }) => {
    const cat = CATEGORIES.find((c) => c.slug === params.name);
    if (!cat) throw notFound();
    return { cat };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cat.name} Gear — Sportiffy` },
          { name: "description", content: `Shop premium ${loaderData.cat.name.toLowerCase()} equipment at Sportiffy.` },
          { property: "og:title", content: `${loaderData.cat.name} Gear — Sportiffy` },
          { property: "og:image", content: loaderData.cat.image },
        ]
      : [],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="container mx-auto px-6 py-32 text-center">
      <h1 className="font-display text-4xl text-foreground">Category not found</h1>
      <Link to="/" className="mt-6 inline-block text-primary">Back home</Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat } = Route.useLoaderData();
  const products = PRODUCTS.filter((p) => p.category === cat.slug);

  return (
    <>
      <section className="relative h-[36vh] min-h-[280px] overflow-hidden bg-secondary">
        <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-white/10" />
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-end pb-10">
          <span className="text-xs uppercase tracking-[0.3em] text-primary font-bold">Sportiffy Collection</span>
          <h1 className="font-display text-5xl md:text-7xl mt-2 text-foreground">{cat.name}</h1>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {cat.subcategories.map((s: string) => (
            <button key={s} className="px-4 py-2 rounded-full bg-white border border-border text-sm text-foreground hover:border-primary hover:text-primary transition">
              {s}
            </button>
          ))}
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">New {cat.name} drop coming soon.</p>
            <Link to="/" className="mt-4 inline-block text-primary">Continue shopping</Link>
          </div>
        )}
      </section>
    </>
  );
}
