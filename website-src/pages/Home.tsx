/*
 * DESIGN: Neon New York — merging NYC skyline glow with constellation/neon GIFs.
 * Layered backgrounds, improved readability, bigger typography, glass panels, neon accents.
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
  Radio,
} from "lucide-react";

/* ── ASSETS ── */
const NYC_SKYLINE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const CONSTELLATION_GIF = "/manus-storage/constellation_61e334c3.gif";
const NEON_NETWORK_GIF = "/manus-storage/neon_network_a15f76e5.gif";
const HERO_VIDEO = "/manus-storage/safeyork_hero_video_68467ed2.mp4";

/* ── DATA ── */
const features = [
  { icon: Zap, title: "One-Tap SOS", desc: "Trigger an emergency alert instantly with a single tap — no unlocking, no dialing." },
  { icon: Clock, title: "Safety Timer", desc: "Set a countdown. If you don't check in, SafeYork auto-escalates to your contacts." },
  { icon: Mic, title: "Voice Command", desc: "Activate alerts hands-free using a safe word or emergency phrase." },
  { icon: Brain, title: "Guardian AI", desc: "AI analyzes biometric signals and context to classify danger level in real time." },
  { icon: MapPin, title: "Live Location", desc: "Share your precise GPS coordinates with trusted contacts the moment an alert fires." },
  { icon: Users, title: "Helper Network", desc: "Nearby verified helpers receive limited emergency details to provide immediate aid." },
];

const dangerLevels = [
  { level: "01", name: "Caution", color: "#FACC15", glow: "rgba(250,204,21,0.15)", desc: "Silent check-in prompt sent to user. No external alerts yet." },
  { level: "02", name: "Warning", color: "#F97316", glow: "rgba(249,115,22,0.15)", desc: "Trusted contacts and nearby helpers notified with location." },
  { level: "03", name: "Emergency", color: "#EF4444", glow: "rgba(239,68,68,0.15)", desc: "Full alert broadcast — emergency services contacted." },
];

const steps = [
  { step: "01", title: "Trigger", desc: "One tap, voice command, timer expiry, or AI detection activates the system." },
  { step: "02", title: "Analyze", desc: "Guardian AI classifies danger level from biometric and contextual signals." },
  { step: "03", title: "Alert", desc: "Trusted contacts and nearby helpers are notified with live location data." },
  { step: "04", title: "Respond", desc: "Tiered support escalates to emergency services when the situation demands it." },
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

/* ── SECTION DIVIDER ── */
function Divider() {
  return (
    <div className="container">
      <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/20%)] to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ══════════════════════════════════════════════════
          HERO — NYC skyline + constellation + neon network
         ══════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layer 1: NYC skyline — warm city glow base */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${NYC_SKYLINE})`, opacity: 0.18 }}
        />
        {/* Layer 2: Constellation star field */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${CONSTELLATION_GIF})`, opacity: 0.5 }}
        />
        {/* Layer 3: Neon network particles */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${NEON_NETWORK_GIF})`, opacity: 0.2 }}
        />
        {/* Cyan radial glow from center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.18_192/6%)_0%,transparent_55%)]" />
        {/* Dark vignette edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,oklch(0.08_0.02_260)_100%)]" />
        {/* Bottom fade to content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[oklch(0.08_0.02_260)] to-transparent" />

        <div className="relative z-10 container text-center pt-24 pb-8">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[5px] uppercase text-[oklch(0.85_0.18_192/70%)] mb-5">
              AI-Powered Emergency Response
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl font-bold text-white leading-[1.02] mb-6">
              Safe<span className="neon-text-cyan">York</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-xl text-[oklch(0.7_0.02_260)] max-w-xl mx-auto leading-relaxed mb-12">
              Bridging the gap between crisis and help. Instant alerts, AI-powered danger classification, and community-driven response.
            </p>
          </FadeIn>

          {/* Video with neon border glow */}
          <FadeIn delay={0.3}>
            <div className="max-w-md mx-auto mb-14">
              <div className="relative overflow-hidden neon-glow-cyan" style={{ borderRadius: "18px", border: "1px solid oklch(0.85 0.18 192 / 20%)" }}>
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
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center"
          >
            <ChevronDown className="w-6 h-6 text-[oklch(0.85_0.18_192/40%)]" />
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURES — glass panel cards with neon icon glow
         ══════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Subtle constellation background */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${CONSTELLATION_GIF})`, opacity: 0.06 }}
        />
        <div className="relative z-10 container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Core Features
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              How SafeYork Protects You
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              Six intelligent layers of protection designed for when every second counts.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.07}>
                <div className="glass-panel p-6 hover:border-[oklch(0.85_0.18_192/30%)] transition-all duration-500 group">
                  <div className="w-10 h-10 flex items-center justify-center mb-4 border border-[oklch(0.85_0.18_192/15%)] bg-[oklch(0.85_0.18_192/5%)] group-hover:bg-[oklch(0.85_0.18_192/10%)] transition-colors duration-500">
                    <f.icon className="w-5 h-5 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          DANGER LEVELS — color-coded threat system
         ══════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* Neon network subtle bg */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${NEON_NETWORK_GIF})`, opacity: 0.04 }}
        />
        <div className="relative z-10 container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Threat Assessment
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              Intelligent Danger Classification
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              Guardian AI classifies every situation into three escalation tiers, each triggering a different response protocol.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dangerLevels.map((d, i) => (
              <FadeIn key={d.level} delay={i * 0.1}>
                <div
                  className="relative p-8 border-t-2 bg-[oklch(0.1_0.02_260/60%)] backdrop-blur-sm"
                  style={{ borderTopColor: d.color, boxShadow: `0 -4px 30px ${d.glow}` }}
                >
                  <span
                    className="font-[family-name:var(--font-display)] text-6xl font-bold block mb-3"
                    style={{ color: d.color, opacity: 0.12 }}
                  >
                    {d.level}
                  </span>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white mb-3">
                    {d.name}
                  </h3>
                  <p className="text-sm text-[oklch(0.6_0.02_260)] leading-relaxed">{d.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Live stats bar */}
          <FadeIn delay={0.3}>
            <div className="mt-14 glass-panel p-6 flex flex-wrap justify-between gap-8">
              {[
                { label: "Signal_Strength", value: "0.98", icon: Radio },
                { label: "Latency", value: "12ms", icon: Zap },
                { label: "AI_Confidence", value: "94.2%", icon: Brain },
                { label: "Coverage", value: "NYC", icon: MapPin },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-3">
                  <s.icon className="w-4 h-4 text-[oklch(0.85_0.18_192/40%)]" />
                  <div>
                    <p className="font-[family-name:var(--font-mono)] text-[9px] tracking-wider uppercase text-[oklch(0.45_0.02_260)]">
                      {s.label}
                    </p>
                    <p className="font-[family-name:var(--font-display)] text-lg font-bold neon-text-cyan">
                      {s.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SIGNAL FLOW — step-by-step with connecting line
         ══════════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Signal Flow
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              From Crisis to Response
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              Four stages that transform a moment of danger into coordinated help.
            </p>
          </FadeIn>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-[oklch(0.85_0.18_192/30%)] via-[oklch(0.85_0.18_192/15%)] to-[oklch(0.85_0.18_192/30%)]" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {steps.map((s, i) => (
                <FadeIn key={s.step} delay={i * 0.1}>
                  <div className="relative">
                    {/* Node dot */}
                    <div className="hidden md:block absolute top-6 left-1/2 -translate-x-1/2 w-3 h-3 bg-[oklch(0.85_0.18_192)] rounded-full shadow-[0_0_12px_oklch(0.85_0.18_192/50%)]" />
                    <div className="pt-14 md:pt-16 text-center md:text-left">
                      <span className="font-[family-name:var(--font-display)] text-5xl font-bold block mb-2" style={{ color: "oklch(0.85 0.18 192 / 10%)" }}>
                        {s.step}
                      </span>
                      <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-white mb-2">
                        {s.title}
                      </h3>
                      <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          CTA — with NYC glow background
         ══════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        {/* NYC skyline glow */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${NYC_SKYLINE})`, opacity: 0.08 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,oklch(0.85_0.18_192/4%)_0%,transparent_60%)]" />

        <div className="relative z-10 container text-center">
          <FadeIn>
            <Heart className="w-6 h-6 text-[oklch(0.65_0.25_10/50%)] mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-5">
              Help Should Reach People Faster
            </h2>
            <p className="text-base text-[oklch(0.6_0.02_260)] max-w-lg mx-auto leading-relaxed mb-10">
              SafeYork is more than an emergency button. It is an AI-powered safety network designed to help people when every second matters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://safeyork.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[3px] uppercase bg-[oklch(0.85_0.18_192)] text-[oklch(0.08_0.02_260)] px-8 py-3.5 font-semibold hover:shadow-[0_0_30px_oklch(0.85_0.18_192/40%)] transition-all duration-500"
              >
                <Shield className="w-3.5 h-3.5" />
                Try Live Demo
              </a>
              <a
                href="https://github.com/PhyoThihaOo32/SafeYork"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-[family-name:var(--font-mono)] text-[11px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192)] border border-[oklch(0.85_0.18_192/25%)] px-8 py-3.5 hover:bg-[oklch(0.85_0.18_192/8%)] transition-all duration-500"
              >
                View on GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
