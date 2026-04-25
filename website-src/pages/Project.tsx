/*
 * DESIGN: Neon New York — merging NYC skyline glow with constellation/neon GIFs.
 * Layered backgrounds, improved readability, glass panels, neon accents.
 */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Brain,
  Smartphone,
  Shield,
  Timer,
  Mic,
  MapPin,
  Users,
  Heart,
  History,
  AlertTriangle,
  Cpu,
  Database,
  Code,
  Layers,
  Rocket,
  Watch,
  Globe,
  Bell,
  Radio,
  Zap,
} from "lucide-react";

/* ── ASSETS ── */
const NYC_SKYLINE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const CONSTELLATION_GIF = "/manus-storage/constellation_61e334c3.gif";
const NEON_NETWORK_GIF = "/manus-storage/neon_network_a15f76e5.gif";
const AI_CODING_GIF = "/manus-storage/ai_coding_f500b457.gif";

/* ── DATA ── */
const mvpFeatures = [
  { icon: Smartphone, title: "Home Dashboard", desc: "Central command center for all safety features." },
  { icon: Shield, title: "SOS Button", desc: "One-tap emergency alert with instant broadcast." },
  { icon: Timer, title: "Safety Timer", desc: "Auto-escalation when countdown expires." },
  { icon: Mic, title: "Voice Command", desc: "Hands-free activation via safe word." },
  { icon: Brain, title: "Guardian AI", desc: "Real-time danger classification engine." },
  { icon: AlertTriangle, title: "Danger System", desc: "Three-tier threat assessment protocol." },
  { icon: Users, title: "Trusted Contacts", desc: "Pre-configured emergency contact network." },
  { icon: Heart, title: "Emergency Profile", desc: "Medical info shared with first responders." },
  { icon: MapPin, title: "Location Sharing", desc: "Precise GPS coordinates in every alert." },
  { icon: History, title: "Safety History", desc: "Full audit log of all safety events." },
];

const techStack = [
  { icon: Code, name: "React Native", desc: "Cross-platform mobile framework" },
  { icon: Layers, name: "Expo", desc: "Build and deploy pipeline" },
  { icon: Cpu, name: "TypeScript", desc: "Type-safe codebase" },
  { icon: Database, name: "Firebase", desc: "Real-time database and auth" },
  { icon: Brain, name: "Claude AI", desc: "Natural language processing" },
  { icon: MapPin, name: "Expo Location", desc: "GPS and geofencing" },
];

const futureItems = [
  { icon: Bell, title: "Push Notifications", desc: "Real SMS, email, and push alerts to contacts and emergency services." },
  { icon: Watch, title: "Wearable Support", desc: "Apple Watch and smart bracelet integration for passive monitoring." },
  { icon: Globe, title: "Multi-Language", desc: "Support for diverse communities across NYC's neighborhoods." },
  { icon: Rocket, title: "Campus Dashboard", desc: "Safety analytics and monitoring tools for institutions." },
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

export default function Project() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ══════════════════════════════════════════════════
          HERO — NYC skyline + constellation + neon network
         ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Layer 1: NYC skyline */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${NYC_SKYLINE})`, opacity: 0.15 }}
        />
        {/* Layer 2: Constellation */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${CONSTELLATION_GIF})`, opacity: 0.35 }}
        />
        {/* Layer 3: Neon network */}
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${NEON_NETWORK_GIF})`, opacity: 0.15 }}
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
              Project Overview
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-7xl font-bold text-white leading-[1.05] mb-6">
              The <span className="neon-text-cyan">Technology</span><br />
              Behind SafeYork
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-[oklch(0.65_0.02_260)] max-w-xl leading-relaxed">
              An AI-powered personal safety app that helps users send emergency alerts through one tap, voice command, safety timer, or AI detection.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          PROBLEM — split layout with stats
         ══════════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
            <div>
              <FadeIn>
                <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
                  The Problem
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-6">
                  When Seconds<br />Matter Most
                </h2>
                <p className="text-sm md:text-base text-[oklch(0.6_0.02_260)] leading-relaxed mb-5">
                  In emergency situations, people may panic, freeze, lose consciousness, or become unable to call for help. Traditional phone calls can be slow, missed, muted, or mistaken for normal communication.
                </p>
                <p className="text-sm md:text-base text-[oklch(0.6_0.02_260)] leading-relaxed">
                  SafeYork solves this by creating a faster bridge between a person in crisis and the people who can help.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { val: "70%", label: "of victims freeze during emergencies" },
                    { val: "4.5M", label: "NYC residents commute daily" },
                    { val: "30s", label: "average delay in traditional 911 calls" },
                    { val: "1 in 3", label: "women feel unsafe walking alone" },
                  ].map((s, i) => (
                    <div key={i} className="border-l-2 border-[oklch(0.85_0.18_192/20%)] pl-5">
                      <p className="font-[family-name:var(--font-display)] text-3xl font-bold neon-text-cyan mb-1">
                        {s.val}
                      </p>
                      <p className="text-xs md:text-sm text-[oklch(0.55_0.02_260)] leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          GUARDIAN AI — with AI coding GIF background
         ══════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${AI_CODING_GIF})`, opacity: 0.06 }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(0.85_0.18_192/4%)_0%,transparent_50%)]" />

        <div className="relative z-10 container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              AI Engine
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              Guardian AI
            </h2>
            <p className="text-base text-[oklch(0.6_0.02_260)] max-w-xl leading-relaxed mb-16">
              The intelligent core that powers SafeYork's emergency decision-making — analyzing context, detecting distress, and recommending the right response in real time.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Analyze", items: ["Classify danger level", "Detect emergency keywords", "Identify distress signals", "Process biometric data"] },
              { title: "Generate", items: ["Emergency messages", "Location context", "Situation summary", "Response timeline"] },
              { title: "Recommend", items: ["Next best action", "Escalation path", "Response explanation", "Resource allocation"] },
            ].map((col, i) => (
              <FadeIn key={col.title} delay={i * 0.1}>
                <div className="glass-panel p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white mb-5 flex items-center gap-3">
                    <span className="w-8 h-8 flex items-center justify-center border border-[oklch(0.85_0.18_192/20%)] bg-[oklch(0.85_0.18_192/5%)] text-[oklch(0.85_0.18_192)] font-[family-name:var(--font-mono)] text-xs">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {col.title}
                  </h3>
                  <div className="flex flex-col gap-3">
                    {col.items.map((item) => (
                      <p key={item} className="text-sm text-[oklch(0.6_0.02_260)] flex items-center gap-3">
                        <span className="w-1.5 h-1.5 bg-[oklch(0.85_0.18_192/40%)] flex-shrink-0" />
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          SIGNAL ACTIVE — animated broadcast
         ══════════════════════════════════════════════════ */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="relative glass-panel p-10 overflow-hidden flex items-center justify-center">
              {/* Animated pulse rings */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute border border-[oklch(0.85_0.18_192/15%)]"
                  style={{
                    width: `${120 + i * 80}px`,
                    height: `${120 + i * 80}px`,
                    borderRadius: "50%",
                  }}
                  animate={{
                    scale: [1, 1.6, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeInOut",
                  }}
                />
              ))}
              {/* Rotating sweep */}
              <motion.div
                className="absolute w-40 h-40"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: "conic-gradient(from 0deg, transparent 0%, oklch(0.85 0.18 192 / 10%) 15%, transparent 30%)",
                    borderRadius: "50%",
                  }}
                />
              </motion.div>
              {/* Center dot */}
              <motion.div
                className="relative z-10 w-4 h-4 bg-[oklch(0.85_0.18_192)] shadow-[0_0_20px_oklch(0.85_0.18_192/60%)]"
                style={{ borderRadius: "50%" }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Label */}
              <div className="absolute bottom-6 flex items-center gap-2">
                <Radio className="w-4 h-4 text-[oklch(0.85_0.18_192)]" />
                <motion.span
                  className="font-[family-name:var(--font-mono)] text-xs tracking-[4px] uppercase neon-text-cyan"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  Signal Active
                </motion.span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          MVP FEATURES — grid with glass panels
         ══════════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              MVP Scope
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              Core Capabilities
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              Ten essential features that form the foundation of SafeYork's emergency response system.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {mvpFeatures.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.04}>
                <div className="glass-panel p-5 hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-500 group">
                  <f.icon className="w-5 h-5 text-[oklch(0.85_0.18_192/60%)] group-hover:text-[oklch(0.85_0.18_192)] transition-colors duration-500 mb-3" />
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-1">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[oklch(0.5_0.02_260)] leading-relaxed">{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ══════════════════════════════════════════════════
          TECH STACK — with subtle constellation bg
         ══════════════════════════════════════════════════ */}
      <section className="relative py-32 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center mix-blend-screen"
          style={{ backgroundImage: `url(${CONSTELLATION_GIF})`, opacity: 0.05 }}
        />
        <div className="relative z-10 container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Architecture
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-16">
              Tech Stack
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
            {techStack.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.06}>
                <div className="glass-panel p-5 text-center hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-500 group">
                  <t.icon className="w-6 h-6 text-[oklch(0.85_0.18_192/50%)] group-hover:text-[oklch(0.85_0.18_192)] transition-colors duration-500 mx-auto mb-3" />
                  <p className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-1">
                    {t.name}
                  </p>
                  <p className="font-[family-name:var(--font-mono)] text-[9px] text-[oklch(0.5_0.02_260)] tracking-wide">
                    {t.desc}
                  </p>
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
          ROADMAP — future features
         ══════════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[11px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/60%)] mb-3">
              Roadmap
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-white mb-4">
              The Road Ahead
            </h2>
            <p className="text-sm text-[oklch(0.55_0.02_260)] max-w-lg mb-16">
              From MVP to a comprehensive urban safety platform.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {futureItems.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="glass-panel p-6 hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-500 group">
                  <f.icon className="w-5 h-5 text-[oklch(0.85_0.18_192/50%)] group-hover:text-[oklch(0.85_0.18_192)] transition-colors duration-500 mb-4" />
                  <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">{f.desc}</p>
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
