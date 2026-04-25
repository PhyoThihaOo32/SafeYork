/*
 * DESIGN: Clean minimal about page — matching presentation slides.
 * Deep obsidian, subtle backgrounds, cyan accents, minimal layout.
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
} from "lucide-react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const GIF_CONSTELLATION = "/manus-storage/constellation_61e334c3.gif";

const principles = [
  { icon: Shield, title: "Safety", desc: "Protection is the first priority in every design decision." },
  { icon: Eye, title: "Accessibility", desc: "Usable by people of all abilities and tech levels." },
  { icon: Lock, title: "Privacy", desc: "Users control what is shared and with whom." },
  { icon: Heart, title: "Consent", desc: "Every action requires explicit user permission." },
  { icon: Scale, title: "Equity", desc: "Designed to serve underserved and vulnerable communities." },
  { icon: Users, title: "Community", desc: "Built on trust between users and their support networks." },
];

const teamMembers = [
  { name: "Phyo T. Oo", role: "Location / Biometrics" },
  { name: "Zin Min Wai", role: "Signal Sender / AI NLP" },
  { name: "Kyawt Kyawt Htun", role: "UI / Front-End" },
  { name: "Thet Oo Maung", role: "Contacts / Backend" },
];

const targetUsers = [
  { icon: GraduationCap, label: "College Students" },
  { icon: Train, label: "NYC Commuters" },
  { icon: Users, label: "Women Walking Alone" },
  { icon: Baby, label: "Children & Elderly" },
  { icon: Activity, label: "Health Conditions" },
  { icon: Briefcase, label: "Ride-Share Passengers" },
];

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.06 }}
        />
        <img
          src={GIF_CONSTELLATION}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen"
          style={{ opacity: 0.08 }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.85 0.18 192 / 3%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.18 192 / 3%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.15,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260)] via-transparent to-[oklch(0.08_0.02_260)]" />

        <div className="relative z-10 container pt-24 pb-16">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-4">
              About SafeYork
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-5">
              Built for <span className="neon-text-cyan">Public Good</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm md:text-base text-[oklch(0.5_0.02_260)] max-w-lg leading-relaxed">
              SafeYork is more than an emergency button. It is an AI-powered safety network designed to help people get support when every second matters.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section className="py-28">
        <div className="container max-w-2xl">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Mission
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-6">
              Help Should Reach People Faster
            </h2>
            <p className="text-sm text-[oklch(0.5_0.02_260)] leading-relaxed mb-4">
              CUNY AI Innovation Challenge 2026 — Track: AI for Health and Public Good.
            </p>
            <p className="text-sm text-[oklch(0.5_0.02_260)] leading-relaxed">
              SafeYork is designed to bridge the critical gap between a person in crisis and the people who can help. Using AI-powered detection, instant alerts, and community-driven response, we aim to make emergency support faster, smarter, and more accessible for everyone.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/12%)] to-transparent" />
      </div>

      {/* ── PUBLIC INTEREST PRINCIPLES ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Principles
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              Public Interest Technology
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-10">
            {principles.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.06}>
                <div className="flex gap-4">
                  <p.icon className="w-4 h-4 text-[oklch(0.85_0.18_192/50%)] flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-[oklch(0.5_0.02_260)] leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/12%)] to-transparent" />
      </div>

      {/* ── TARGET USERS ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Who It's For
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              Target Users
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {targetUsers.map((u, i) => (
              <FadeIn key={u.label} delay={i * 0.05}>
                <div className="text-center">
                  <u.icon className="w-5 h-5 text-[oklch(0.85_0.18_192/40%)] mx-auto mb-2" />
                  <p className="text-[10px] text-[oklch(0.5_0.02_260)] leading-snug">{u.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/12%)] to-transparent" />
      </div>

      {/* ── TEAM ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Team
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              YangonDevs
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.08}>
                <div className="border-t border-[oklch(0.85_0.18_192/10%)] pt-5">
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-1">
                    {m.name}
                  </h3>
                  <p className="font-[family-name:var(--font-mono)] text-[10px] text-[oklch(0.5_0.02_260)] tracking-wide">
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
