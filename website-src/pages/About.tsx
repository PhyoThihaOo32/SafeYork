/*
 * DESIGN: Neon New York — merging NYC skyline glow with constellation/neon GIFs.
 * Layered backgrounds, improved readability, glass panels, neon accents.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Shield,
  Eye,
  Lock,
  Heart,
  Users,
  Scale,
  GraduationCap,
  Train,
  Baby,
  Activity,
  Briefcase,
  Target,
} from "lucide-react";

/* ── ASSETS ── */
const NYC_SKYLINE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const CONSTELLATION_GIF = "/manus-storage/constellation_61e334c3.gif";
const NEON_NETWORK_GIF = "/manus-storage/neon_network_a15f76e5.gif";

/* ── DATA ── */
const principles = [
  { icon: Shield, title: "Safety", desc: "Protection is the first priority in every design decision we make." },
  { icon: Eye, title: "Accessibility", desc: "Usable by people of all abilities, ages, and tech comfort levels." },
  { icon: Lock, title: "Privacy", desc: "Users control what is shared and with whom — always." },
  { icon: Heart, title: "Consent", desc: "Every action requires explicit user permission before execution." },
  { icon: Scale, title: "Equity", desc: "Designed to serve underserved and vulnerable communities first." },
  { icon: Users, title: "Community", desc: "Built on trust between users and their support networks." },
];

const teamMembers = [
  { name: "Phyo T. Oo", role: "Location / Biometrics", initials: "PO" },
  { name: "Zin Min Wai", role: "Signal Sender / AI NLP", initials: "ZW" },
  { name: "Kyawt Kyawt Htun", role: "UI / Front-End", initials: "KH" },
  { name: "Thet Oo Maung", role: "Contacts / Backend", initials: "TM" },
];

const targetUsers = [
  { icon: GraduationCap, label: "College Students", desc: "Late-night campus walks and commutes" },
  { icon: Train, label: "NYC Commuters", desc: "Subway and late-night transit riders" },
  { icon: Users, label: "Women Walking Alone", desc: "Solo walks through unfamiliar areas" },
  { icon: Baby, label: "Children & Elderly", desc: "Vulnerable populations needing passive monitoring" },
  { icon: Activity, label: "Health Conditions", desc: "People with medical emergencies" },
  { icon: Briefcase, label: "Ride-Share Passengers", desc: "Solo riders in unfamiliar vehicles" },
];

/* ── ANIMATION HELPER ── */
function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Divider() {
  return (
    <div className="container">
      <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/20%)] to-transparent" />
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ══════════════════════════════════════════════════
          HERO — NYC skyline + constellation + neon network
         ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        {/* Layer 1: NYC skyline */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${NYC_SKYLINE})`, opacity: 0.12 }}
        />
        {/* Layer 2: Constellation */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${CONSTELLATION_GIF})`, opacity: 0.4 }}
        />
        {/* Layer 3: Neon network */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${NEON_NETWORK_GIF})`, opacity: 0.12 }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.18_192/5%)_0%,transparent_55%)]" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,oklch(0.08_0.02_260)_100%)]" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[oklch(0.08_0.02_260)] to-transparent" />

        <div className="relative z-10 container pt-24 pb-16">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[5px] uppercase text-[oklch(0.85_0.18_192/70%)] mb-5">
              About SafeYork
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              Built for<br /><span className="neon-text-cyan">Public Good</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-[oklch(0.65_0.02_260)] max-w-xl leading-relaxed">
              SafeYork is more than an emergency button. It is an AI-powered safety network designed to help people get support when every second matters.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          MISSION
         ══════════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <FadeIn>
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
                  Mission
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-6">
                  Help Should Reach<br />People Faster
                </h2>
                <p className="text-sm md:text-base text-[oklch(0.6_0.02_260)] leading-relaxed mb-5">
                  SafeYork is designed to bridge the critical gap between a person in crisis and the people who can help. Using AI-powered detection, instant alerts, and community-driven response, we aim to make emergency support faster, smarter, and more accessible for everyone.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.15}>
                <div className="glass-panel p-8">
                  <Target className="w-5 h-5 text-[oklch(0.85_0.18_192)] mb-4" />
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-3">
                    CUNY AI Innovation Challenge 2026
                  </h3>
                  <p className="text-sm text-[oklch(0.6_0.02_260)] leading-relaxed mb-4">
                    Track: AI for Health and Public Good
                  </p>
                  <div className="h-px bg-[oklch(0.85_0.18_192/10%)] mb-4" />
                  <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-wider uppercase text-[oklch(0.85_0.18_192/50%)]">
                    Team YangonDevs
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          PUBLIC INTEREST PRINCIPLES — glass panel grid
         ══════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${CONSTELLATION_GIF})`, opacity: 0.04 }}
        />
        <div className="relative z-10 container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Principles
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              Public Interest Technology
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              Every design decision is guided by six core principles that put people first.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <div className="glass-panel p-6 hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-500 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-[oklch(0.85_0.18_192/15%)] bg-[oklch(0.85_0.18_192/5%)] group-hover:bg-[oklch(0.85_0.18_192/10%)] transition-colors duration-500 flex-shrink-0">
                      <p.icon className="w-5 h-5 text-[oklch(0.85_0.18_192)]" />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-white mb-1.5">
                        {p.title}
                      </h3>
                      <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          TARGET USERS — with descriptions
         ══════════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Who It's For
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              Target Users
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              SafeYork is designed for anyone who needs to feel safer — especially those most vulnerable.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {targetUsers.map((u, i) => (
              <FadeIn key={u.label} delay={i * 0.06}>
                <div className="glass-panel p-5 hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-500 group">
                  <u.icon className="w-5 h-5 text-[oklch(0.85_0.18_192/50%)] group-hover:text-[oklch(0.85_0.18_192)] transition-colors duration-500 mb-3" />
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-1">
                    {u.label}
                  </h3>
                  <p className="text-xs text-[oklch(0.5_0.02_260)] leading-relaxed">{u.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          TEAM — YangonDevs with avatar initials
         ══════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${NEON_NETWORK_GIF})`, opacity: 0.04 }}
        />
        <div className="relative z-10 container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Team
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              YangonDevs
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              A team of developers from Myanmar, building technology for public safety.
            </p>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.08}>
                <div className="glass-panel p-6 text-center hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-500 group">
                  {/* Avatar with initials */}
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center border border-[oklch(0.85_0.18_192/20%)] bg-[oklch(0.85_0.18_192/5%)] group-hover:bg-[oklch(0.85_0.18_192/10%)] group-hover:border-[oklch(0.85_0.18_192/40%)] transition-all duration-500" style={{ borderRadius: "50%" }}>
                    <span className="font-[family-name:var(--font-display)] text-lg font-bold text-[oklch(0.85_0.18_192)]">
                      {m.initials}
                    </span>
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-white mb-1">
                    {m.name}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[10px] text-[oklch(0.5_0.02_260)] tracking-wider">
                    {m.role}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
