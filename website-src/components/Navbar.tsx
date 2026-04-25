import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Shield, Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/project", label: "Project" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[oklch(0.08_0.02_260/90%)] backdrop-blur-md border-b border-[oklch(0.85_0.18_192/8%)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-14">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[oklch(0.85_0.18_192)]" />
          <span className="font-[family-name:var(--font-display)] font-semibold text-sm text-white tracking-tight">
            Safe<span className="text-[oklch(0.85_0.18_192)]">York</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`text-xs font-medium tracking-wide uppercase transition-colors duration-300 ${
                  location === link.href
                    ? "text-[oklch(0.85_0.18_192)]"
                    : "text-[oklch(0.5_0.02_260)] hover:text-white"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-[oklch(0.5_0.02_260)] p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[oklch(0.08_0.02_260/95%)] backdrop-blur-md border-t border-[oklch(0.85_0.18_192/6%)]">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 text-xs font-medium tracking-wide uppercase ${
                    location === link.href
                      ? "text-[oklch(0.85_0.18_192)]"
                      : "text-[oklch(0.5_0.02_260)]"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
