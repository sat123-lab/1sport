import { Link } from "@tanstack/react-router";
import { Globe, Send, MessageCircle, Camera } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-10">
          <div className="md:col-span-2">
            <Logo className="h-10" />
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Gear. Velocity. You. Premium sports equipment for athletes who refuse to settle.
            </p>
            <div className="flex gap-2 mt-5">
              {[Camera, Send, MessageCircle, Globe].map((Icon, i) => (
                <a key={i} href="#" className="p-2.5 rounded-lg bg-white border border-border hover:border-primary hover:text-primary transition" aria-label="social">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-foreground mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {CATEGORIES.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link to="/category/$name" params={{ name: c.slug }} className="hover:text-primary">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm uppercase tracking-widest text-foreground mb-4">Help</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Shipping & Returns</li>
              <li>Size Guide</li>
              <li>Track Order</li>
              <li>Contact Us</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-display text-sm uppercase tracking-widest text-foreground mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Get 10% off your first order.</p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-white border border-border rounded-lg px-3 py-2.5 text-sm outline-none focus:border-primary"
              />
              <button className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Sportiffy. All rights reserved.</span>
          <span>Privacy · Terms · Cookies</span>
        </div>
      </div>
    </footer>
  );
}
