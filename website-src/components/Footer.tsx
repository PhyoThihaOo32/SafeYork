import { Shield } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="border-t border-[oklch(0.85_0.18_192/10%)] bg-[oklch(0.06_0.02_260)]">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[oklch(0.85_0.18_192/15%)] border border-[oklch(0.85_0.18_192/30%)] flex items-center justify-center">
                <Shield className="w-4 h-4 text-[oklch(0.85_0.18_192)]" />
              </div>
              <span className="font-[family-name:var(--font-display)] font-bold text-white">
                Safe<span className="text-[oklch(0.85_0.18_192)]">York</span>
              </span>
            </div>
            <p className="text-sm text-[oklch(0.5_0.02_260)] max-w-sm leading-relaxed">
              AI-powered emergency alerts for faster help when every second matters. Built with public interest technology principles.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-semibold text-[oklch(0.85_0.18_192)] uppercase tracking-widest mb-4">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-[oklch(0.5_0.02_260)] hover:text-white transition-colors">Home</Link>
              <Link href="/project" className="text-sm text-[oklch(0.5_0.02_260)] hover:text-white transition-colors">Project</Link>
              <Link href="/about" className="text-sm text-[oklch(0.5_0.02_260)] hover:text-white transition-colors">About</Link>
            </div>
          </div>

          {/* Tech */}
          <div>
            <h4 className="font-[family-name:var(--font-display)] text-xs font-semibold text-[oklch(0.85_0.18_192)] uppercase tracking-widest mb-4">
              Tech Stack
            </h4>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-[oklch(0.5_0.02_260)] font-[family-name:var(--font-mono)]">React Native</span>
              <span className="text-sm text-[oklch(0.5_0.02_260)] font-[family-name:var(--font-mono)]">TypeScript</span>
              <span className="text-sm text-[oklch(0.5_0.02_260)] font-[family-name:var(--font-mono)]">Firebase</span>
              <span className="text-sm text-[oklch(0.5_0.02_260)] font-[family-name:var(--font-mono)]">Claude AI</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[oklch(0.85_0.18_192/8%)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[oklch(0.4_0.02_260)] font-[family-name:var(--font-mono)]">
            &copy; 2025 YangonDevs. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/PhyoThihaOo32/SafeYork-"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[oklch(0.4_0.02_260)] hover:text-[oklch(0.85_0.18_192)] transition-colors font-[family-name:var(--font-mono)]"
            >
              GitHub Repository
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
