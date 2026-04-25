import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowLine from "@/components/GlowLine";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Zap,
  Brain,
  Users,
  MapPin,
  Timer,
  Mic,
  Activity,
  Heart,
  History,
  UserCheck,
  AlertTriangle,
  Smartphone,
  Database,
  Code2,
  Cpu,
  Globe,
  Watch,
  Building2,
  MessageSquare,
  ChevronRight,
  Play,
  Layers,
  Radio,
  Eye,
} from "lucide-react";

/* ── Design: Neon Grid Noir — Project Page (v2)
   GIF: neon_network → Hero section background (colorful particles, subtle)
   Video: futuristic_city → Visual showcase section
   ─────────────────────────────────────────────── */

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const ABSTRACT_GRID =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_abstract_grid-mqfn7AKDEHLeEedMSmCAZ9.webp";
const SIGNAL_WAVE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_signal_wave-SbkECf4jinFF7RXWMQCHb7.webp";

const GIF_NEON_NETWORK = "/manus-storage/neon_network_a15f76e5.gif";
const GIF_AI_NEURAL = "/manus-storage/ai_neural_5efe04da.gif";
const GIF_DARK_MESH = "/manus-storage/dark_mesh_5445773f.gif";
const GIF_AI_CODING = "/manus-storage/ai_coding_f500b457.gif";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "" }: { target: string; suffix?: string }) {
  return (
    <span className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-[oklch(0.85_0.18_192)]">
      {target}{suffix}
    </span>
  );
}

const mvpFeatures = [
  { icon: Zap, label: "SOS Emergency Button", desc: "One-tap instant emergency alert" },
  { icon: Timer, label: "Get Home Safe Timer", desc: "Auto-escalation if no response" },
  { icon: Mic, label: "Voice Command Trigger", desc: "Safe word activation system" },
  { icon: Brain, label: "Guardian AI Analysis", desc: "Real-time danger classification" },
  { icon: MessageSquare, label: "AI Emergency Message", desc: "Auto-generated alert messages" },
  { icon: AlertTriangle, label: "Danger Level System", desc: "Three-tier threat assessment" },
  { icon: Users, label: "Trusted Contacts", desc: "Family, friends & campus safety" },
  { icon: Heart, label: "Emergency Profile", desc: "Medical notes & allergy info" },
  { icon: MapPin, label: "Location Sharing", desc: "Live GPS during emergencies" },
  { icon: UserCheck, label: "Nearby Helper Network", desc: "Opt-in community responders" },
  { icon: History, label: "Safety History Log", desc: "Complete event timeline" },
  { icon: Activity, label: "Demo Mode", desc: "Safe testing environment" },
];

const techStack = [
  { icon: Smartphone, name: "React Native", desc: "Cross-platform mobile framework", color: "oklch(0.85_0.18_192)" },
  { icon: Code2, name: "TypeScript", desc: "Type-safe development", color: "oklch(0.7_0.2_250)" },
  { icon: Globe, name: "Expo", desc: "Development & deployment", color: "oklch(0.85_0.18_192)" },
  { icon: Database, name: "Firebase", desc: "Realtime database & backend", color: "oklch(0.75_0.15_60)" },
  { icon: Cpu, name: "Claude AI / OpenAI", desc: "AI-powered danger analysis", color: "oklch(0.7_0.25_330)" },
  { icon: MapPin, name: "Expo Location", desc: "GPS & location services", color: "oklch(0.7_0.2_150)" },
];

const futureItems = [
  { icon: Smartphone, text: "Real push notifications & SMS alerts", phase: "Phase 2" },
  { icon: Watch, text: "Apple Watch & wearable integration", phase: "Phase 2" },
  { icon: Heart, text: "Real biometric detection", phase: "Phase 3" },
  { icon: Building2, text: "Campus safety dashboard", phase: "Phase 3" },
  { icon: Globe, text: "Multi-language support", phase: "Phase 4" },
  { icon: Shield, text: "Public emergency system partnerships", phase: "Phase 4" },
];

const demoSteps = [
  { step: "01", title: "Open SafeYork", desc: "User launches the app and sees the safety dashboard" },
  { step: "02", title: "Start Walking Home", desc: "Activates Get Home Safe timer mode" },
  { step: "03", title: "Timer Countdown", desc: "Timer runs while user walks home" },
  { step: "04", title: "No Response", desc: "User doesn't respond when timer ends" },
  { step: "05", title: "AI Analysis", desc: "Guardian AI analyzes the situation" },
  { step: "06", title: "Alert Sent", desc: "Trusted contacts notified with location" },
];

export default function Project() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ═══ HERO — with AI coding GIF background ═══ */}
      <section className="relative pt-32 pb-28 overflow-hidden min-h-[85vh] flex items-center">
        {/* Full-screen AI coding GIF background */}
        <div className="absolute inset-0 pointer-events-none">
          <img src={GIF_AI_CODING} alt="" className="w-full h-full object-cover opacity-[0.3]" />
        </div>
        {/* Neon network GIF overlay for extra texture */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-screen">
          <img src={GIF_NEON_NETWORK} alt="" className="w-full h-full object-cover" />
        </div>
        {/* Dark gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.06_0.02_260/85%)] via-[oklch(0.06_0.02_260/55%)] to-[oklch(0.08_0.02_260)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.06_0.02_260/65%)] via-transparent to-[oklch(0.06_0.02_260/45%)]" />

        <div className="container relative z-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.85_0.18_192/25%)] bg-[oklch(0.85_0.18_192/8%)] backdrop-blur-sm mb-6">
                <Layers className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192)]" />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                  Project Overview
                </span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-[1.05]">
                Building the{" "}
                <span className="neon-text-cyan">SafeYork</span>{" "}
                <span className="text-white">Platform</span>
              </h1>
              <p className="text-lg sm:text-xl text-[oklch(0.7_0.02_260)] max-w-2xl leading-relaxed mb-10">
                An AI-powered personal safety app that helps users send emergency alerts through one tap, voice command, safety timer, or AI detection — bridging the gap between crisis and help.
              </p>
              <div className="flex flex-wrap gap-4">
                {[
                  { label: "12 Core Features", icon: Zap },
                  { label: "3-Level Danger System", icon: AlertTriangle },
                  { label: "Guardian AI", icon: Brain },
                ].map((tag, i) => (
                  <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-md bg-[oklch(0.1_0.02_260/70%)] border border-[oklch(0.85_0.18_192/15%)] backdrop-blur-sm">
                    <tag.icon className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192)]" />
                    <span className="text-xs text-[oklch(0.8_0.01_260)] font-medium">{tag.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ PROBLEM — Stats with visual impact ═══ */}
      <section className="py-24">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <FadeIn className="lg:col-span-5">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.65_0.25_10)] tracking-widest uppercase">
                The Problem
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6 leading-tight">
                When Panic <br />Takes Over
              </h2>
              <p className="text-[oklch(0.6_0.02_260)] leading-relaxed mb-5">
                In emergency situations, people may panic, freeze, lose consciousness, or become unable to call for help. Traditional phone calls can be slow, missed, muted, or mistaken for normal communication.
              </p>
              <p className="text-[oklch(0.6_0.02_260)] leading-relaxed mb-8">
                SafeYork solves this by creating a <span className="text-[oklch(0.85_0.18_192)] font-semibold">faster bridge</span> between a person in crisis and the people who can help.
              </p>
              {/* Signal wave visual */}
              <div className="relative rounded-xl overflow-hidden border border-[oklch(0.85_0.18_192/10%)] h-32">
                <img src={SIGNAL_WAVE} alt="Signal wave" className="w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.06_0.02_260)] via-transparent to-[oklch(0.06_0.02_260)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <Radio className="w-5 h-5 text-[oklch(0.85_0.18_192)] animate-pulse" />
                    <span className="text-sm font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)]">SIGNAL ACTIVE</span>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn className="lg:col-span-7" delay={0.15}>
              <div className="grid grid-cols-2 gap-5">
                {[
                  { stat: "70%", label: "of people freeze during emergencies", icon: Eye },
                  { stat: "4.5M", label: "NYC daily commuters at risk", icon: Users },
                  { stat: "30s", label: "average delay in calling 911", icon: Timer },
                  { stat: "1 in 3", label: "women feel unsafe walking alone", icon: Shield },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="relative p-6 rounded-xl bg-[oklch(0.1_0.02_260/60%)] border border-[oklch(0.85_0.18_192/8%)] overflow-hidden group hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-500"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-[oklch(0.85_0.18_192/3%)] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[oklch(0.85_0.18_192/8%)] transition-all duration-500" />
                    <s.icon className="w-5 h-5 text-[oklch(0.85_0.18_192/50%)] mb-3" />
                    <CountUp target={s.stat} />
                    <p className="text-xs text-[oklch(0.5_0.02_260)] mt-2 leading-relaxed">{s.label}</p>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ GUARDIAN AI — with ai_neural GIF ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-screen">
          <img src={GIF_AI_NEURAL} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260/85%)] via-[oklch(0.08_0.02_260/60%)] to-[oklch(0.08_0.02_260/85%)]" />

        <div className="container relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.7_0.25_330/20%)] bg-[oklch(0.7_0.25_330/5%)] mb-4">
                <Brain className="w-3.5 h-3.5 text-[oklch(0.7_0.25_330)]" />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.7_0.25_330)] tracking-widest uppercase">
                  AI Integration
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Guardian AI Engine
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-2xl mx-auto leading-relaxed">
                SafeYork uses Guardian AI to support emergency decision-making in real-time, analyzing multiple signals to classify danger and recommend actions.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Danger Analysis", desc: "Analyze danger level from multiple signals including timer, voice, and sensor data", icon: AlertTriangle },
              { title: "Keyword Detection", desc: "Detect emergency keywords in voice and text input for rapid response", icon: Mic },
              { title: "Distress Recognition", desc: "Identify distress or no-response situations automatically", icon: Eye },
              { title: "Auto Messaging", desc: "Generate emergency messages with context and location details", icon: MessageSquare },
              { title: "Action Guidance", desc: "Recommend the next best action based on threat assessment", icon: ChevronRight },
              { title: "Explainable AI", desc: "Explain why a specific danger level was selected for transparency", icon: Brain },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="group p-5 rounded-xl bg-[oklch(0.1_0.02_260/40%)] border border-[oklch(0.85_0.18_192/6%)] hover:border-[oklch(0.85_0.18_192/20%)] transition-all duration-400 backdrop-blur-sm h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[oklch(0.85_0.18_192/8%)] border border-[oklch(0.85_0.18_192/15%)] flex items-center justify-center group-hover:bg-[oklch(0.85_0.18_192/15%)] transition-all duration-400">
                      <item.icon className="w-4 h-4 text-[oklch(0.85_0.18_192)]" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  </div>
                  <p className="text-xs text-[oklch(0.55_0.02_260)] leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ DEMO FLOW — Visual walkthrough ═══ */}
      <section className="py-24">
        <div className="container">
          <FadeIn>
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.85_0.18_192/20%)] bg-[oklch(0.85_0.18_192/5%)] mb-4">
                <Play className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192)]" />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                  Demo Flow
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                How SafeYork Works
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-xl leading-relaxed">
                A step-by-step walkthrough of the emergency response flow.
              </p>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Vertical line connector */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[oklch(0.85_0.18_192/30%)] via-[oklch(0.85_0.18_192/15%)] to-transparent hidden lg:block" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {demoSteps.map((item, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="flex items-start gap-5 p-5 rounded-xl bg-[oklch(0.1_0.02_260/40%)] border border-[oklch(0.85_0.18_192/6%)] hover:border-[oklch(0.85_0.18_192/18%)] transition-all duration-400 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[oklch(0.85_0.18_192/8%)] border border-[oklch(0.85_0.18_192/20%)] flex items-center justify-center group-hover:bg-[oklch(0.85_0.18_192/15%)] transition-all duration-400">
                      <span className="text-sm font-[family-name:var(--font-mono)] font-bold text-[oklch(0.85_0.18_192)]">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ MVP FEATURES — Clean grid ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
          <img src={ABSTRACT_GRID} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container relative z-10">
          <FadeIn>
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.85_0.18_192/20%)] bg-[oklch(0.85_0.18_192/5%)] mb-4">
                <Zap className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192)]" />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                  MVP Scope
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Core Features
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-xl leading-relaxed">
                12 essential features built for the minimum viable product.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mvpFeatures.map((f, i) => (
              <FadeIn key={f.label} delay={i * 0.04}>
                <div className="group flex items-start gap-4 p-5 rounded-xl bg-[oklch(0.1_0.02_260/40%)] border border-[oklch(0.85_0.18_192/6%)] hover:border-[oklch(0.85_0.18_192/20%)] transition-all duration-400 h-full">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[oklch(0.85_0.18_192/8%)] border border-[oklch(0.85_0.18_192/15%)] flex items-center justify-center group-hover:bg-[oklch(0.85_0.18_192/15%)] transition-all duration-400">
                    <f.icon className="w-4.5 h-4.5 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-0.5">{f.label}</h3>
                    <p className="text-xs text-[oklch(0.5_0.02_260)] leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ TECH STACK — with dark_mesh GIF ═══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <img src={GIF_DARK_MESH} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[oklch(0.08_0.02_260/70%)]" />

        <div className="container relative z-10">
          <FadeIn>
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.65_0.25_10/20%)] bg-[oklch(0.65_0.25_10/5%)] mb-4">
                <Code2 className="w-3.5 h-3.5 text-[oklch(0.65_0.25_10)]" />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.65_0.25_10)] tracking-widest uppercase">
                  Technology
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Tech Stack
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-xl leading-relaxed">
                Built with modern, production-ready technologies for reliability and performance.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {techStack.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div className="group relative p-6 rounded-xl bg-[oklch(0.1_0.02_260/60%)] border border-[oklch(0.85_0.18_192/6%)] hover:border-[oklch(0.85_0.18_192/20%)] transition-all duration-400 backdrop-blur-sm overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ "--accent": t.color } as React.CSSProperties} />
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl border border-[oklch(0.85_0.18_192/15%)] flex items-center justify-center" style={{ backgroundColor: `color-mix(in oklch, ${t.color} 8%, transparent)` }}>
                      <t.icon className="w-5 h-5" style={{ color: t.color }} />
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-base">
                        {t.name}
                      </h3>
                      <p className="text-xs text-[oklch(0.5_0.02_260)] mt-0.5">{t.desc}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ DANGER LEVEL SYSTEM — Visual breakdown ═══ */}
      <section className="py-24">
        <div className="container">
          <FadeIn>
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.65_0.25_10/20%)] bg-[oklch(0.65_0.25_10/5%)] mb-4">
                <AlertTriangle className="w-3.5 h-3.5 text-[oklch(0.65_0.25_10)]" />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.65_0.25_10)] tracking-widest uppercase">
                  Threat Assessment
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Danger Level System
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {[
              {
                level: "1",
                name: "Caution",
                color: "oklch(0.8_0.18_90)",
                borderColor: "oklch(0.8_0.18_90/20%)",
                bgColor: "oklch(0.8_0.18_90/5%)",
                desc: "Checks if the user is okay with a subtle prompt",
                actions: ["Gentle check-in notification", "Timer pause option", "Quick status update"],
              },
              {
                level: "2",
                name: "Warning",
                color: "oklch(0.75_0.15_60)",
                borderColor: "oklch(0.75_0.15_60/20%)",
                bgColor: "oklch(0.75_0.15_60/5%)",
                desc: "Alerts trusted contacts and nearby opted-in helpers",
                actions: ["Trusted contacts alerted", "Nearby helpers notified", "Location shared"],
              },
              {
                level: "3",
                name: "Emergency",
                color: "oklch(0.65_0.25_10)",
                borderColor: "oklch(0.65_0.25_10/20%)",
                bgColor: "oklch(0.65_0.25_10/5%)",
                desc: "Full emergency response with all available support",
                actions: ["All contacts alerted", "Emergency services simulation", "Full location + profile shared"],
              },
            ].map((d, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <div
                  className="relative p-6 rounded-xl overflow-hidden h-full transition-all duration-400 hover:translate-y-[-2px]"
                  style={{ backgroundColor: d.bgColor, border: `1px solid ${d.borderColor}` }}
                >
                  <div className="absolute top-0 left-0 w-full h-1" style={{ backgroundColor: d.color }} />
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center font-[family-name:var(--font-mono)] font-bold text-lg"
                      style={{ backgroundColor: `color-mix(in oklch, ${d.color} 15%, transparent)`, color: d.color }}
                    >
                      {d.level}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg">{d.name}</h3>
                      <p className="text-xs" style={{ color: d.color }}>Level {d.level}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[oklch(0.6_0.02_260)] mb-4 leading-relaxed">{d.desc}</p>
                  <ul className="space-y-2">
                    {d.actions.map((action, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-[oklch(0.55_0.02_260)]">
                        <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: d.color }} />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ FUTURE ROADMAP ═══ */}
      <section className="py-24">
        <div className="container">
          <FadeIn>
            <div className="mb-16">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.85_0.18_192/20%)] bg-[oklch(0.85_0.18_192/5%)] mb-4">
                <Globe className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192)]" />
                <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                  Roadmap
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 mb-4">
                Future Improvements
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {futureItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-4 p-5 rounded-xl border border-dashed border-[oklch(0.85_0.18_192/12%)] bg-[oklch(0.1_0.02_260/30%)] hover:border-[oklch(0.85_0.18_192/25%)] transition-all duration-400 group">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[oklch(0.85_0.18_192/5%)] border border-[oklch(0.85_0.18_192/10%)] flex items-center justify-center group-hover:bg-[oklch(0.85_0.18_192/12%)] transition-all duration-400">
                    <item.icon className="w-4 h-4 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192/60%)] tracking-wider uppercase">{item.phase}</span>
                    <p className="text-sm text-[oklch(0.65_0.01_260)] mt-0.5 leading-relaxed">{item.text}</p>
                  </div>
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
