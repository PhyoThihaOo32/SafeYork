/*
 * DESIGN: Clean minimal — cyberpunk command center inspired by presentation slides.
 * Deep obsidian canvas, subtle grid, cyan accents, Space Grotesk headlines.
 * Minimal buttons, maximum whitespace, refined typography.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Shield,
  Zap,
  MapPin,
  Brain,
  Users,
  Clock,
  Mic,
  Heart,
  ChevronDown,
} from "lucide-react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const HERO_VIDEO = "/manus-storage/safeyork_hero_video_68467ed2.mp4";

const features = [
  { icon: Zap, title: "One-Tap SOS", desc: "Trigger an emergency alert instantly with a single tap." },
  { icon: Clock, title: "Safety Timer", desc: "Auto-escalation when you don't check in on time." },
  { icon: Mic, title: "Voice Command", desc: "Activate alerts using a safe word or emergency phrase." },
  { icon: Brain, title: "Guardian AI", desc: "AI analyzes danger level and recommends the right response." },
  { icon: MapPin, title: "Location Sharing", desc: "Share your live location with trusted contacts instantly." },
  { icon: Users, title: "Helper Network", desc: "Nearby verified helpers receive limited emergency details." },
];

const dangerLevels = [
  { level: "01", name: "Caution", color: "oklch(0.85 0.18 95)", desc: "Silent check-in prompt" },
  { level: "02", name: "Warning", color: "oklch(0.75 0.18 55)", desc: "Contacts & helpers notified" },
  { level: "03", name: "Emergency", color: "oklch(0.65 0.25 10)", desc: "Full alert + emergency services" },
];

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* BG image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${HERO_BG})` }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.85 0.18 192 / 3%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.18 192 / 3%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.18_192/5%)_0%,transparent_60%)]" />

        <div className="relative z-10 container text-center pt-20">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-6">
              AI-Powered Emergency Response
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-5">
              Safe<span className="neon-text-cyan">York</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-[oklch(0.55_0.02_260)] max-w-lg mx-auto leading-relaxed mb-10">
              Bridging the gap between crisis and help. Instant alerts, AI-powered danger classification, and community-driven response.
            </p>
          </FadeIn>

          {/* Video */}
          <FadeIn delay={0.3}>
            <div className="max-w-sm mx-auto mb-12">
              <div className="relative border border-[oklch(0.85_0.18_192/15%)] overflow-hidden" style={{ borderRadius: "16px" }}>
                <video
                  src={HERO_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </FadeIn>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <ChevronDown className="w-5 h-5 text-[oklch(0.85_0.18_192/30%)]" />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Core Features
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              How SafeYork Protects You
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-14">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.06}>
                <div className="flex gap-4">
                  <div className="w-9 h-9 flex items-center justify-center flex-shrink-0 border border-[oklch(0.85_0.18_192/12%)] bg-[oklch(0.85_0.18_192/4%)]">
                    <f.icon className="w-4 h-4 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-1.5">
                      {f.title}
                    </h3>
                    <p className="text-xs text-[oklch(0.5_0.02_260)] leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/15%)] to-transparent" />
      </div>

      {/* ── DANGER LEVELS ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Threat Assessment
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              Intelligent Danger Classification
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {dangerLevels.map((d, i) => (
              <FadeIn key={d.level} delay={i * 0.1}>
                <div
                  className="py-10 px-8 border-t-2"
                  style={{ borderTopColor: d.color }}
                >
                  <span
                    className="font-[family-name:var(--font-display)] text-5xl font-bold block mb-2"
                    style={{ color: `${d.color}`, opacity: 0.15 }}
                  >
                    {d.level}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-2">
                    {d.name}
                  </h3>
                  <p className="text-xs text-[oklch(0.5_0.02_260)]">{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Stats row */}
          <FadeIn delay={0.3}>
            <div className="mt-12 flex flex-wrap gap-12 border-t border-[oklch(0.85_0.18_192/6%)] pt-8">
              {[
                { label: "Signal_Strength", value: "0.98" },
                { label: "Latency", value: "12ms" },
                { label: "AI_Confidence", value: "94.2%" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-wider uppercase text-[oklch(0.4_0.02_260)] mb-1">
                    {s.label}
                  </p>
                  <p className="font-[family-name:var(--font-display)] text-xl font-bold text-[oklch(0.85_0.18_192)]">
                    {s.value}
                  </p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/15%)] to-transparent" />
      </div>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Signal Flow
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              From Crisis to Response
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Trigger", desc: "One tap, voice command, or AI detection activates the system." },
              { step: "02", title: "Analyze", desc: "Guardian AI classifies danger level from biometric and contextual signals." },
              { step: "03", title: "Alert", desc: "Trusted contacts and nearby helpers are notified with location data." },
              { step: "04", title: "Respond", desc: "Tiered support escalates to emergency services when needed." },
            ].map((s, i) => (
              <FadeIn key={s.step} delay={i * 0.08}>
                <div>
                  <span className="font-[family-name:var(--font-display)] text-4xl font-bold text-[oklch(0.85_0.18_192/8%)] block mb-2">
                    {s.step}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[oklch(0.5_0.02_260)] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/15%)] to-transparent" />
      </div>

      {/* ── CTA ── */}
      <section className="py-28">
        <div className="container text-center">
          <FadeIn>
            <Heart className="w-5 h-5 text-[oklch(0.65_0.25_10/40%)] mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-4">
              Help Should Reach People Faster
            </h2>
            <p className="text-sm text-[oklch(0.5_0.02_260)] max-w-md mx-auto leading-relaxed mb-8">
              SafeYork is more than an emergency button. It is an AI-powered safety network designed to help people when every second matters.
            </p>
            <a
              href="https://github.com/PhyoThihaOo32/SafeYork-"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192)] border border-[oklch(0.85_0.18_192/20%)] px-8 py-3 hover:bg-[oklch(0.85_0.18_192/5%)] transition-colors duration-300"
            >
              View on GitHub
            </a>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
