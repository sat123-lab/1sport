import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import { useCart } from "@/context/CartContext";
import { motion } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-primary text-primary-foreground text-center text-[11px] sm:text-xs py-2 font-medium tracking-wider">
        Free shipping on orders over ₹999 · Easy 30-day returns
      </div>

      <header
        className={`sticky top-0 z-50 bg-black transition-shadow duration-300 ${
          scrolled ? "shadow-soft" : "border-b border-border"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6 relative">
          <div className="flex items-center justify-between h-20 gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-secondary text-white"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <Logo />
            </div>

            <MegaMenu />

            <div className="flex items-center gap-1">
              <button onClick={() => setSearchOpen(true)} className="p-2.5 rounded-xl hover:bg-secondary text-white transition" aria-label="Search">
                <Search className="w-5 h-5" />
              </button>
              <button className="hidden sm:inline-flex p-2.5 rounded-xl hover:bg-secondary text-white transition" aria-label="Account">
                <User className="w-5 h-5" />
              </button>
              <Link to="/cart" className="relative p-2.5 rounded-xl hover:bg-secondary text-white transition" aria-label="Cart">
                <ShoppingBag className="w-5 h-5" />
                {count > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[20px] h-5 px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center"
                  >
                    {count}
                  </motion.span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
