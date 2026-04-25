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
} from "lucide-react";

/* ── Design: Neon Grid Noir — Project Page ── */

const ABSTRACT_GRID =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_abstract_grid-mqfn7AKDEHLeEedMSmCAZ9.webp";

const GIF_AI_NEURAL = "/manus-storage/ai_neural_5efe04da.gif";
const GIF_DARK_MESH = "/manus-storage/dark_mesh_5445773f.gif";

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

const mvpFeatures = [
  { icon: Zap, label: "SOS Emergency Button" },
  { icon: Timer, label: "Get Home Safe Timer" },
  { icon: Mic, label: "Voice Command Trigger" },
  { icon: Brain, label: "Guardian AI Analysis" },
  { icon: MessageSquare, label: "AI Emergency Message" },
  { icon: AlertTriangle, label: "Three-Level Danger System" },
  { icon: Users, label: "Trusted Contacts" },
  { icon: Heart, label: "Emergency Profile" },
  { icon: MapPin, label: "Location Sharing Simulation" },
  { icon: UserCheck, label: "Nearby Helper Simulation" },
  { icon: History, label: "Safety History Log" },
  { icon: Activity, label: "Demo Mode" },
];

const techStack = [
  { icon: Smartphone, name: "React Native", desc: "Cross-platform mobile framework" },
  { icon: Code2, name: "TypeScript", desc: "Type-safe development" },
  { icon: Globe, name: "Expo", desc: "Development & deployment platform" },
  { icon: Database, name: "Firebase", desc: "Realtime database & backend" },
  { icon: Cpu, name: "Claude AI / OpenAI", desc: "AI-powered danger analysis" },
  { icon: MapPin, name: "Expo Location", desc: "GPS & location services" },
];

const futureItems = [
  { icon: Smartphone, text: "Real push notifications & SMS alerts" },
  { icon: Watch, text: "Apple Watch & wearable integration" },
  { icon: Heart, text: "Real biometric detection" },
  { icon: Building2, text: "Campus safety dashboard" },
  { icon: Globe, text: "Multi-language support" },
  { icon: Shield, text: "Public emergency system partnerships" },
];

export default function Project() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url(${ABSTRACT_GRID})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
              Project Overview
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6 leading-tight">
              Building the <span className="neon-text-cyan">SafeYork</span> Platform
            </h1>
            <p className="text-lg text-[oklch(0.55_0.02_260)] max-w-2xl leading-relaxed">
              SafeYork is a personal safety application designed to help users get emergency support quickly when they feel unsafe, are walking alone, riding alone, or experiencing a medical emergency.
            </p>
          </motion.div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ PROBLEM ═══ */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <FadeIn className="lg:col-span-5">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.65_0.25_10)] tracking-widest uppercase">
                The Problem
              </span>
              <h2 className="text-3xl font-bold text-white mt-3 mb-5">
                When Panic Takes Over
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] leading-relaxed mb-4">
                In emergency situations, people may panic, freeze, lose consciousness, or become unable to call for help. Traditional phone calls can be slow, missed, muted, or mistaken for normal communication.
              </p>
              <p className="text-[oklch(0.55_0.02_260)] leading-relaxed">
                SafeYork solves this by creating a faster bridge between a person in crisis and the people who can help.
              </p>
            </FadeIn>
            <FadeIn className="lg:col-span-7" delay={0.2}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { stat: "70%", label: "of people freeze during emergencies" },
                  { stat: "4.5M", label: "NYC daily commuters at risk" },
                  { stat: "30s", label: "average delay in calling 911" },
                  { stat: "1 in 3", label: "women feel unsafe walking alone" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="p-5 neon-border rounded-lg bg-[oklch(0.1_0.02_260/60%)]"
                  >
                    <span className="font-[family-name:var(--font-display)] text-2xl font-bold text-[oklch(0.85_0.18_192)]">
                      {s.stat}
                    </span>
                    <p className="text-xs text-[oklch(0.5_0.02_260)] mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ GUARDIAN AI — with ai_neural GIF ═══ */}
      <section className="py-20 relative overflow-hidden">
        {/* AI Neural GIF — colorful neural network visualization */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-screen">
          <img src={GIF_AI_NEURAL} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260/80%)] via-[oklch(0.08_0.02_260/60%)] to-[oklch(0.08_0.02_260/80%)]" />
        <div className="container relative z-10">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                AI Integration
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Guardian AI Engine
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-2xl mx-auto">
                SafeYork uses Guardian AI to support emergency decision-making in real-time.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              "Analyze danger level from multiple signals",
              "Detect emergency keywords in voice and text",
              "Identify distress or no-response situations",
              "Generate emergency messages automatically",
              "Recommend the next best action",
              "Explain why a danger level was selected",
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-start gap-3 p-5 neon-border rounded-lg bg-[oklch(0.1_0.02_260/40%)]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-[oklch(0.85_0.18_192/10%)] flex items-center justify-center mt-0.5">
                    <Brain className="w-4 h-4 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <p className="text-sm text-[oklch(0.7_0.01_260)] leading-relaxed">{item}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ MVP FEATURES ═══ */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="mb-14">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                MVP Scope
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Core Features
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {mvpFeatures.map((f, i) => (
              <FadeIn key={f.label} delay={i * 0.05}>
                <div className="group p-4 neon-border rounded-lg bg-[oklch(0.1_0.02_260/40%)] hover:bg-[oklch(0.12_0.02_260/60%)] transition-all duration-300 h-full flex flex-col items-center text-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.85_0.18_192/10%)] flex items-center justify-center">
                    <f.icon className="w-5 h-5 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <span className="text-sm text-[oklch(0.7_0.01_260)] font-medium">{f.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ TECH STACK — with dark_mesh GIF ═══ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
          <img src={GIF_DARK_MESH} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[oklch(0.08_0.02_260/70%)]" />
        <div className="container">
          <FadeIn>
            <div className="mb-14 relative z-10">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.65_0.25_10)] tracking-widest uppercase">
                Technology
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Tech Stack
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative z-10">
            {techStack.map((t, i) => (
              <FadeIn key={t.name} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-5 neon-border rounded-lg bg-[oklch(0.1_0.02_260/60%)] backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-lg bg-[oklch(0.85_0.18_192/10%)] border border-[oklch(0.85_0.18_192/20%)] flex items-center justify-center flex-shrink-0">
                    <t.icon className="w-5 h-5 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-base">
                      {t.name}
                    </h3>
                    <p className="text-xs text-[oklch(0.5_0.02_260)]">{t.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ FUTURE ═══ */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="mb-14">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                Roadmap
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Future Improvements
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {futureItems.map((item, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="flex items-center gap-4 p-5 border border-dashed border-[oklch(0.85_0.18_192/15%)] rounded-lg bg-[oklch(0.1_0.02_260/30%)]">
                  <item.icon className="w-5 h-5 text-[oklch(0.85_0.18_192)] flex-shrink-0" />
                  <span className="text-sm text-[oklch(0.65_0.01_260)]">{item.text}</span>
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
