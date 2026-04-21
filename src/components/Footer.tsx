import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-black">
      <div className="container mx-auto px-6 py-16">
        <div className="flex flex-col items-center text-center">
          <div className="inline-block">
            <Logo className="h-10" />
          </div>
          <p className="mt-4 text-sm text-white/70 max-w-xs">
            Gear. Velocity. You. Premium sports equipment for athletes who refuse to settle.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-white/70">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/cart" className="hover:text-white">Cart</Link>
          <Link to="/category/badminton" className="hover:text-white">Badminton</Link>
          <Link to="/category/cricket" className="hover:text-white">Cricket</Link>
          <Link to="/category/football" className="hover:text-white">Football</Link>
          <Link to="/category/tennis" className="hover:text-white">Tennis</Link>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-xs text-white/70">
          © {new Date().getFullYear()} Sportiffy. All rights reserved.
        </div>
        <div className="mt-4 text-xs font-medium text-white/40 text-right tracking-wide">
          Designed By Blaze The Entity
        </div>
      </div>
    </footer>
  );
}
