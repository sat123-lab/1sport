import logo from "@/assets/sportiffy-logo.png";
import { Link } from "@tanstack/react-router";

export function Logo({ className = "h-16" }: { className?: string }) {
  return (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <img src={logo} alt="Sportiffy" className={`${className} w-auto object-contain`} />
    </Link>
  );
}
