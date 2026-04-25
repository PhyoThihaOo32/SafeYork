import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[oklch(0.85_0.18_192/6%)]">
      <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192/50%)]" />
          <span className="font-[family-name:var(--font-display)] text-xs font-medium text-[oklch(0.4_0.02_260)]">
            Safe<span className="text-[oklch(0.85_0.18_192/50%)]">York</span>
          </span>
        </div>
        <p className="text-[10px] text-[oklch(0.35_0.02_260)] font-[family-name:var(--font-mono)] tracking-wide">
          &copy; 2025 YangonDevs &mdash; CUNY AI Innovation Challenge
        </p>
        <a
          href="https://github.com/PhyoThihaOo32/SafeYork-"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-[oklch(0.35_0.02_260)] hover:text-[oklch(0.85_0.18_192/60%)] transition-colors font-[family-name:var(--font-mono)] tracking-wide uppercase"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
