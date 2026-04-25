/*
 * DESIGN: Clean minimal project page — matching presentation slides.
 * Deep obsidian, subtle GIF backgrounds, cyan accents, minimal layout.
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
} from "lucide-react";

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const GIF_NEON_NETWORK = "/manus-storage/neon_network_a15f76e5.gif";
const GIF_AI_CODING = "/manus-storage/ai_coding_f500b457.gif";

const mvpFeatures = [
  { icon: Smartphone, title: "Home Dashboard" },
  { icon: Shield, title: "SOS Button" },
  { icon: Timer, title: "Safety Timer" },
  { icon: Mic, title: "Voice Command" },
  { icon: Brain, title: "Guardian AI" },
  { icon: AlertTriangle, title: "Danger System" },
  { icon: Users, title: "Trusted Contacts" },
  { icon: Heart, title: "Emergency Profile" },
  { icon: MapPin, title: "Location Sharing" },
  { icon: History, title: "Safety History" },
];

const techStack = [
  { icon: Code, name: "React Native" },
  { icon: Layers, name: "Expo" },
  { icon: Cpu, name: "TypeScript" },
  { icon: Database, name: "Firebase" },
  { icon: Brain, name: "Claude AI" },
  { icon: MapPin, name: "Expo Location" },
];

const futureItems = [
  { icon: Bell, title: "Push Notifications", desc: "Real SMS, email, and push alerts" },
  { icon: Watch, title: "Wearable Support", desc: "Apple Watch and smart bracelet integration" },
  { icon: Globe, title: "Multi-Language", desc: "Support for diverse communities" },
  { icon: Rocket, title: "Campus Dashboard", desc: "Safety analytics for institutions" },
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

export default function Project() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        {/* NYC skyline bg */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_BG})`, opacity: 0.08 }}
        />
        {/* Neon network GIF overlay */}
        <img
          src={GIF_NEON_NETWORK}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen"
          style={{ opacity: 0.1 }}
        />
        {/* Subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.85 0.18 192 / 3%) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.18 192 / 3%) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            opacity: 0.2,
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260)] via-transparent to-[oklch(0.08_0.02_260)]" />

        <div className="relative z-10 container pt-24 pb-16">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[4px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-4">
              Project Overview
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-white leading-[1.05] mb-5">
              The <span className="neon-text-cyan">Technology</span><br />
              Behind SafeYork
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-sm md:text-base text-[oklch(0.5_0.02_260)] max-w-lg leading-relaxed">
              An AI-powered personal safety app that helps users send emergency alerts through one tap, voice command, safety timer, or AI detection.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section className="py-28">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div>
              <FadeIn>
                <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
                  The Problem
                </p>
                <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-6">
                  When Seconds Matter Most
                </h2>
                <p className="text-sm text-[oklch(0.5_0.02_260)] leading-relaxed mb-6">
                  In emergency situations, people may panic, freeze, lose consciousness, or become unable to call for help. Traditional phone calls can be slow, missed, muted, or mistaken for normal communication.
                </p>
                <p className="text-sm text-[oklch(0.5_0.02_260)] leading-relaxed">
                  SafeYork solves this by creating a faster bridge between a person in crisis and the people who can help.
                </p>
              </FadeIn>
            </div>

            <div>
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { val: "70%", label: "of victims freeze during emergencies" },
                    { val: "4.5M", label: "NYC residents commute daily" },
                    { val: "30s", label: "average delay in traditional 911 calls" },
                    { val: "1 in 3", label: "women feel unsafe walking alone" },
                  ].map((s, i) => (
                    <div key={i} className="border-t border-[oklch(0.85_0.18_192/10%)] pt-4">
                      <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-[oklch(0.85_0.18_192)] mb-1">
                        {s.val}
                      </p>
                      <p className="text-[10px] text-[oklch(0.45_0.02_260)] leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/12%)] to-transparent" />
      </div>

      {/* ── GUARDIAN AI ── */}
      <section className="relative py-28 overflow-hidden">
        {/* AI coding GIF background */}
        <img
          src={GIF_AI_CODING}
          alt=""
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-screen"
          style={{ opacity: 0.05 }}
        />
        <div className="relative z-10 container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              AI Engine
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-6">
              Guardian AI
            </h2>
            <p className="text-sm text-[oklch(0.5_0.02_260)] max-w-lg leading-relaxed mb-12">
              The intelligent core that powers SafeYork's emergency decision-making — analyzing context, detecting distress, and recommending the right response in real time.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Analyze", items: ["Classify danger level", "Detect emergency keywords", "Identify distress signals"] },
              { title: "Generate", items: ["Emergency messages", "Location context", "Situation summary"] },
              { title: "Recommend", items: ["Next best action", "Escalation path", "Response explanation"] },
            ].map((col, i) => (
              <FadeIn key={col.title} delay={i * 0.1}>
                <div className="border-t-2 border-[oklch(0.85_0.18_192/20%)] pt-6">
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-4">
                    {col.title}
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    {col.items.map((item) => (
                      <p key={item} className="text-xs text-[oklch(0.5_0.02_260)] flex items-center gap-2">
                        <span className="w-1 h-1 bg-[oklch(0.85_0.18_192/40%)] flex-shrink-0" />
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

      {/* ── DIVIDER ── */}
      <div className="container">
        <div className="h-px bg-gradient-to-r from-transparent via-[oklch(0.85_0.18_192/12%)] to-transparent" />
      </div>

      {/* ── DEMO FLOW ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Signal Flow
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              How It Works
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              "Open SafeYork",
              "Start safety mode",
              "Timer expires — no response",
              "AI analyzes situation",
              "Contacts notified",
            ].map((step, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div>
                  <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-[oklch(0.85_0.18_192/8%)] block mb-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-xs text-[oklch(0.55_0.02_260)] leading-relaxed">{step}</p>
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

      {/* ── MVP FEATURES ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              MVP Scope
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              Core Capabilities
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
            {mvpFeatures.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.04}>
                <div className="flex items-center gap-3">
                  <f.icon className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192/50%)] flex-shrink-0" />
                  <span className="text-xs text-[oklch(0.6_0.02_260)]">{f.title}</span>
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

      {/* ── TECH STACK ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Architecture
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              Tech Stack
            </h2>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {techStack.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.05}>
                <div className="text-center">
                  <t.icon className="w-5 h-5 text-[oklch(0.85_0.18_192/40%)] mx-auto mb-2" />
                  <p className="font-[family-name:var(--font-mono)] text-[10px] text-[oklch(0.5_0.02_260)] tracking-wide">
                    {t.name}
                  </p>
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

      {/* ── FUTURE ── */}
      <section className="py-28">
        <div className="container">
          <FadeIn>
            <p className="font-[family-name:var(--font-mono)] text-[10px] tracking-[3px] uppercase text-[oklch(0.85_0.18_192/50%)] mb-3">
              Roadmap
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl md:text-3xl font-bold text-white mb-16">
              The Road Ahead
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {futureItems.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.08}>
                <div className="border-t border-[oklch(0.85_0.18_192/10%)] pt-6">
                  <f.icon className="w-4 h-4 text-[oklch(0.85_0.18_192/40%)] mb-3" />
                  <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white mb-1.5">
                    {f.title}
                  </h3>
                  <p className="text-xs text-[oklch(0.5_0.02_260)] leading-relaxed">{f.desc}</p>
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
