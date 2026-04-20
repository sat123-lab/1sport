const BRANDS = ["YONEX", "WILSON", "ADIDAS", "NIKE", "PUMA", "ASICS", "HEAD", "BABOLAT", "KOOKABURRA", "SG"];

export function BrandMarquee() {
  return (
    <section className="border-y border-border py-12 overflow-hidden bg-gradient-to-r from-secondary via-background to-secondary">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...BRANDS, ...BRANDS].map((b, i) => (
          <span key={i} className="font-display text-2xl md:text-5xl tracking-[0.3em] mx-16 text-muted-foreground/60 hover:text-primary transition-all duration-300 hover:scale-110">
            {b}
          </span>
        ))}
      </div>
    </section>
  );
}
