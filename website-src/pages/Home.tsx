import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import PulseRing from "@/components/PulseRing";
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
  ChevronRight,
  ArrowRight,
  Radio,
} from "lucide-react";
import { Link } from "wouter";

/* ── Design: Neon Grid Noir ──
   GIF Placement:
   - constellation.gif → Hero section, subtle background behind phone mockup
   - dark_mesh.gif → Danger Levels section, atmospheric background
   - neon_network.gif → CTA section, low-opacity ambient texture
   ─────────────────────────────────────────────────────────────── */

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";
const HERO_VIDEO = "/manus-storage/safeyork_hero_video_68467ed2.mp4";
const ABSTRACT_GRID =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_abstract_grid-mqfn7AKDEHLeEedMSmCAZ9.webp";

const GIF_CONSTELLATION = "/manus-storage/constellation_61e334c3.gif";
const GIF_DARK_MESH = "/manus-storage/dark_mesh_5445773f.gif";
const GIF_NEON_NETWORK = "/manus-storage/neon_network_a15f76e5.gif";

function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const features = [
  {
    icon: Zap,
    title: "One-Tap SOS",
    desc: "Send a distress signal instantly when speaking or typing is too difficult. One tap shares your location, danger level, and status.",
    color: "cyan",
  },
  {
    icon: Brain,
    title: "Guardian AI Detection",
    desc: "AI analyzes voice patterns, heart rate, movement, and response status to classify danger levels automatically.",
    color: "magenta",
  },
  {
    icon: Timer,
    title: "Get Home Safe Timer",
    desc: "Start a timer while walking home or riding alone. If you don't respond when time runs out, the app begins escalation.",
    color: "cyan",
  },
  {
    icon: Mic,
    title: "Voice Command Trigger",
    desc: "Activate an alert using a safe word or emergency phrase — no screen interaction needed.",
    color: "magenta",
  },
  {
    icon: Users,
    title: "Trusted Contacts",
    desc: "Notify family, friends, guardians, or campus safety contacts instantly during an emergency.",
    color: "cyan",
  },
  {
    icon: MapPin,
    title: "Live Location Sharing",
    desc: "Share your real-time location with responders so they know exactly where help is needed.",
    color: "magenta",
  },
];

const dangerLevels = [
  {
    level: "01",
    name: "Caution",
    color: "oklch(0.85 0.18 192)",
    desc: "System checks if the user is okay. Silent check-in prompt with a response window.",
  },
  {
    level: "02",
    name: "Warning",
    color: "oklch(0.8 0.18 80)",
    desc: "Alerts trusted contacts and nearby opted-in helpers with location and status context.",
  },
  {
    level: "03",
    name: "Emergency",
    color: "oklch(0.65 0.25 10)",
    desc: "Full-scale alert to trusted contacts, nearby helpers, and emergency support services.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0">
          <img
            src={HERO_BG}
            alt=""
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.08_0.02_260/80%)] via-[oklch(0.08_0.02_260/60%)] to-[oklch(0.08_0.02_260)]" />
        </div>

        {/* Constellation GIF — subtle animated star field behind hero */}
        <div className="absolute inset-0 opacity-[0.12] pointer-events-none mix-blend-screen">
          <img
            src={GIF_CONSTELLATION}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        {/* Scanline overlay */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.85 0.18 192 / 10%) 2px, oklch(0.85 0.18 192 / 10%) 4px)",
          }}
        />
        <ParticleField count={40} />

        <div className="container relative z-10 pt-24 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left content — 7 cols */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[oklch(0.85_0.18_192/25%)] bg-[oklch(0.85_0.18_192/8%)] mb-8">
                  <Activity className="w-3.5 h-3.5 text-[oklch(0.85_0.18_192)]" />
                  <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-wider uppercase">
                    AI-Powered Safety System
                  </span>
                </div>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
                  Safe<span className="neon-text-cyan">York</span>
                </h1>
                <p className="text-xl sm:text-2xl text-[oklch(0.7_0.01_260)] leading-relaxed max-w-xl mb-4">
                  AI-powered emergency alerts for faster help when{" "}
                  <span className="text-white font-medium">every second matters</span>.
                </p>
                <p className="text-base text-[oklch(0.5_0.02_260)] max-w-lg mb-10 leading-relaxed">
                  In dangerous or medical emergencies, people may panic, freeze, or become unable to call for help. SafeYork creates a faster bridge between crisis and trusted support.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/project">
                    <span className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.85_0.18_192)] text-[oklch(0.08_0.02_260)] font-[family-name:var(--font-display)] font-semibold rounded-md hover:shadow-[0_0_30px_oklch(0.85_0.18_192/40%)] transition-all duration-300">
                      View Project <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                  <Link href="/about">
                    <span className="inline-flex items-center gap-2 px-6 py-3 border border-[oklch(0.85_0.18_192/30%)] text-[oklch(0.85_0.18_192)] font-[family-name:var(--font-display)] font-semibold rounded-md hover:bg-[oklch(0.85_0.18_192/10%)] transition-all duration-300">
                      Learn More
                    </span>
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right — hero video — 5 cols */}
            <div className="lg:col-span-5 flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className="relative"
              >
                <PulseRing />
                <div className="absolute -inset-8 bg-[oklch(0.85_0.18_192/8%)] rounded-full blur-3xl" />
                <video
                  src={HERO_VIDEO}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="relative w-64 sm:w-72 lg:w-80 rounded-2xl object-cover drop-shadow-[0_0_40px_oklch(0.85_0.18_192/25%)] border border-[oklch(0.85_0.18_192/15%)]"
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <GlowLine />

      {/* ═══ FEATURES ═══ */}
      <section className="py-28 relative">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url(${ABSTRACT_GRID})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Designed for Speed, Clarity, and Support
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-2xl mx-auto">
                Every feature is built to bridge the gap between crisis and help — even when the user cannot speak, type, or think clearly.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <FadeIn key={f.title} delay={i * 0.1}>
                <div className="group relative p-6 neon-border rounded-lg bg-[oklch(0.1_0.02_260/60%)] hover:bg-[oklch(0.12_0.02_260/80%)] transition-all duration-300 h-full">
                  <div
                    className={`w-11 h-11 rounded-lg flex items-center justify-center mb-5 ${
                      f.color === "cyan"
                        ? "bg-[oklch(0.85_0.18_192/12%)] text-[oklch(0.85_0.18_192)]"
                        : "bg-[oklch(0.65_0.25_10/12%)] text-[oklch(0.65_0.25_10)]"
                    }`}
                  >
                    <f.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-[family-name:var(--font-display)] font-semibold text-white mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">
                    {f.desc}
                  </p>
                  {/* Hover glow */}
                  <div
                    className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${
                      f.color === "cyan"
                        ? "shadow-[inset_0_0_30px_oklch(0.85_0.18_192/6%)]"
                        : "shadow-[inset_0_0_30px_oklch(0.65_0.25_10/6%)]"
                    }`}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ DANGER LEVELS — with dark_mesh GIF background ═══ */}
      <section className="py-28 relative overflow-hidden">
        {/* Dark mesh GIF — atmospheric network visualization */}
        <div className="absolute inset-0 opacity-[0.18] pointer-events-none">
          <img
            src={GIF_DARK_MESH}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.02_260/70%)] via-[oklch(0.08_0.02_260/50%)] to-[oklch(0.08_0.02_260/70%)]" />

        <div className="container relative z-10">
          <FadeIn>
            <div className="mb-16">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.65_0.25_10)] tracking-widest uppercase">
                Intelligent Classification
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Three-Level Danger System
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-xl">
                Guardian AI classifies the situation in real-time based on user response, timer status, voice analysis, and biometric signals.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
            {dangerLevels.map((dl, i) => (
              <FadeIn key={dl.level} delay={i * 0.15}>
                <div
                  className="relative p-8 border border-[oklch(0.85_0.18_192/10%)] h-full backdrop-blur-sm bg-[oklch(0.08_0.02_260/40%)]"
                  style={{ borderLeftColor: dl.color, borderLeftWidth: "2px" }}
                >
                  <span
                    className="font-[family-name:var(--font-mono)] text-5xl font-bold opacity-10 absolute top-4 right-6"
                    style={{ color: dl.color }}
                  >
                    {dl.level}
                  </span>
                  <div className="relative z-10">
                    <span
                      className="inline-block px-3 py-1 text-xs font-[family-name:var(--font-mono)] font-medium rounded-full border mb-4"
                      style={{
                        color: dl.color,
                        borderColor: dl.color,
                        backgroundColor: `color-mix(in oklch, ${dl.color} 10%, transparent)`,
                      }}
                    >
                      Level {dl.level}
                    </span>
                    <h3 className="text-2xl font-[family-name:var(--font-display)] font-bold text-white mb-3">
                      {dl.name}
                    </h3>
                    <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">
                      {dl.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ SIGNAL FLOW — improved How It Works ═══ */}
      <section className="py-28 relative">
        <div className="container relative z-10">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                Signal Flow
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                How SafeYork Works
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-xl mx-auto">
                From trigger to trusted contact notification — a seamless emergency pipeline.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">
            {/* Left — Steps */}
            <div>
              {[
                { step: "01", text: "User opens SafeYork and starts Walking Home mode", highlight: false },
                { step: "02", text: "Timer begins counting down during the journey", highlight: false },
                { step: "03", text: "User does not respond when the timer ends", highlight: true },
                { step: "04", text: "App shows a subtle check-in prompt", highlight: false },
                { step: "05", text: "Guardian AI analyzes the situation in real-time", highlight: true },
                { step: "06", text: "App assigns a danger level based on signals", highlight: false },
                { step: "07", text: "Trusted contacts are notified with location", highlight: true },
                { step: "08", text: "Event is saved in safety history log", highlight: false },
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div className="flex items-start gap-4 mb-5">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${
                      item.highlight
                        ? "bg-[oklch(0.85_0.18_192/15%)] border border-[oklch(0.85_0.18_192/40%)]"
                        : "bg-[oklch(0.85_0.18_192/8%)] border border-[oklch(0.85_0.18_192/15%)]"
                    }`}>
                      <span className="font-[family-name:var(--font-mono)] text-sm text-[oklch(0.85_0.18_192)] font-medium">
                        {item.step}
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className={`text-base ${item.highlight ? "text-white font-medium" : "text-[oklch(0.65_0.01_260)]"}`}>
                        {item.text}
                      </p>
                    </div>
                    {/* Connecting line */}
                    {i < 7 && (
                      <div className="absolute left-[19px] mt-10 w-px h-5 bg-[oklch(0.85_0.18_192/15%)]" style={{ display: "none" }} />
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Right — Signal visualization */}
            <FadeIn delay={0.3}>
              <div className="relative flex items-center justify-center">
                <div className="relative w-full aspect-square max-w-sm mx-auto">
                  {/* Animated rings */}
                  <PulseRing />
                  {/* Center icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-2xl bg-[oklch(0.85_0.18_192/12%)] border border-[oklch(0.85_0.18_192/30%)] flex items-center justify-center neon-glow-cyan">
                      <Radio className="w-9 h-9 text-[oklch(0.85_0.18_192)]" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ CTA — with neon_network GIF background ═══ */}
      <section className="py-28 relative overflow-hidden">
        {/* Neon network GIF — colorful particles, very low opacity */}
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-screen">
          <img
            src={GIF_NEON_NETWORK}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-[oklch(0.1_0.03_192/20%)] to-background/80" />

        <div className="container relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[oklch(0.85_0.18_192/10%)] border border-[oklch(0.85_0.18_192/25%)] mb-8 mx-auto">
              <Shield className="w-8 h-8 text-[oklch(0.85_0.18_192)]" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Help Should Reach People Faster
            </h2>
            <p className="text-lg text-[oklch(0.55_0.02_260)] max-w-xl mx-auto mb-10">
              SafeYork is more than an emergency button. It is an AI-powered safety network designed to help people get support when every second matters.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/project">
                <span className="inline-flex items-center gap-2 px-8 py-4 bg-[oklch(0.85_0.18_192)] text-[oklch(0.08_0.02_260)] font-[family-name:var(--font-display)] font-semibold rounded-md text-lg hover:shadow-[0_0_40px_oklch(0.85_0.18_192/40%)] transition-all duration-300">
                  Explore the Project <ChevronRight className="w-5 h-5" />
                </span>
              </Link>
              <a
                href="https://github.com/PhyoThihaOo32/SafeYork-"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[oklch(0.85_0.18_192/30%)] text-[oklch(0.85_0.18_192)] font-[family-name:var(--font-display)] font-semibold rounded-md text-lg hover:bg-[oklch(0.85_0.18_192/10%)] transition-all duration-300"
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
