import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Shield, Menu, X } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Home" },
    { href: "/project", label: "Project" },
    { href: "/about", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-panel shadow-lg shadow-[oklch(0.85_0.18_192/8%)]"
          : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-[oklch(0.85_0.18_192/15%)] border border-[oklch(0.85_0.18_192/30%)] flex items-center justify-center group-hover:neon-glow-cyan transition-shadow duration-300">
            <Shield className="w-5 h-5 text-[oklch(0.85_0.18_192)]" />
          </div>
          <span className="font-[family-name:var(--font-display)] font-bold text-lg text-white tracking-tight">
            Safe<span className="neon-text-cyan">York</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 rounded-md ${
                  location === link.href
                    ? "text-[oklch(0.85_0.18_192)] bg-[oklch(0.85_0.18_192/10%)]"
                    : "text-[oklch(0.7_0.01_260)] hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <a
            href="https://github.com/PhyoThihaOo32/SafeYork-"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 px-4 py-2 text-sm font-medium neon-border rounded-md text-[oklch(0.85_0.18_192)] hover:bg-[oklch(0.85_0.18_192/10%)] transition-all duration-200"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel border-t border-[oklch(0.85_0.18_192/15%)]"
        >
          <div className="container py-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-medium ${
                    location === link.href
                      ? "text-[oklch(0.85_0.18_192)] bg-[oklch(0.85_0.18_192/10%)]"
                      : "text-[oklch(0.7_0.01_260)] hover:text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
