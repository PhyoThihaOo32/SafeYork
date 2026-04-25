import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlowLine from "@/components/GlowLine";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Eye,
  Lock,
  HandHeart,
  Scale,
  ClipboardCheck,
  Users,
  GraduationCap,
  Train,
  Baby,
  HeartPulse,
  Car,
  Globe,
  User,
  Code2,
  MapPin,
  MessageSquare,
  Sparkles,
} from "lucide-react";

/* ── Design: Neon Grid Noir — About Page ──
   GIF Placement:
   - constellation.gif → Hero section background (subtle star field)
   - neon_network.gif → Team section background (low-opacity ambient)
   ─────────────────────────────────────────── */

const HERO_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663596274880/dd29vAQoX4zXTUwpnz2neA/safeyork_hero_bg-X7eoEzeqPv6bQWVGFwtmQY.webp";

const GIF_CONSTELLATION = "/manus-storage/constellation_61e334c3.gif";
const GIF_NEON_NETWORK = "/manus-storage/neon_network_a15f76e5.gif";

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

const principles = [
  { icon: Shield, name: "Safety", desc: "Protecting users in their most vulnerable moments through instant, reliable alerts." },
  { icon: Eye, name: "Accessibility", desc: "Designed for everyone — one tap, voice commands, and automatic detection for those who cannot act." },
  { icon: Lock, name: "Privacy", desc: "Users control who receives alerts, what information is shared, and how their data is handled." },
  { icon: HandHeart, name: "Consent", desc: "Nearby helpers must explicitly opt in. No one is forced into the network without agreement." },
  { icon: Scale, name: "Equity", desc: "Emergency technology accessible to all, regardless of socio-economic status or tech literacy." },
  { icon: ClipboardCheck, name: "Accountability", desc: "Transparent AI decision-making with explanations for every danger level classification." },
];

const teamMembers = [
  { name: "Kyawt Kyawt Htun", role: "UI / Front-End", icon: Code2 },
  { name: "Zin Min Wai", role: "Signal Sender / AI NLP", icon: MessageSquare },
  { name: "Phyo Thiha Oo", role: "Location / Biometrics", icon: MapPin },
  { name: "Thet Oo Maung", role: "Contacts / Backend", icon: Users },
];

const targetUsers = [
  { icon: GraduationCap, label: "College Students" },
  { icon: Train, label: "NYC Commuters" },
  { icon: User, label: "Women Walking Alone" },
  { icon: Baby, label: "Children" },
  { icon: Users, label: "Elderly Users" },
  { icon: HeartPulse, label: "People with Health Conditions" },
  { icon: Car, label: "Ride-share Passengers" },
  { icon: Globe, label: "General Public" },
];

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* ═══ HERO — with constellation GIF ═══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_BG} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/90 to-background" />
        </div>
        {/* Constellation GIF — subtle animated star field */}
        <div className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-screen">
          <img src={GIF_CONSTELLATION} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
              About SafeYork
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-3 mb-6 leading-tight">
              Built by <span className="neon-text-cyan">YangonDevs</span>
            </h1>
            <p className="text-lg text-[oklch(0.55_0.02_260)] max-w-2xl leading-relaxed">
              SafeYork is more than an emergency button. It is an AI-powered safety network designed to help people get support when they are scared, frozen, medically unable to respond, or in immediate danger.
            </p>
          </motion.div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ MISSION ═══ */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[oklch(0.85_0.18_192/10%)] border border-[oklch(0.85_0.18_192/25%)] mb-6">
                <Shield className="w-8 h-8 text-[oklch(0.85_0.18_192)]" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-5">Our Mission</h2>
              <p className="text-xl text-[oklch(0.65_0.01_260)] leading-relaxed">
                Help should reach people faster when every second matters.
              </p>
              <p className="text-base text-[oklch(0.5_0.02_260)] mt-4 leading-relaxed">
                We believe that technology should serve the public interest — making emergency response faster, safer, and more accessible for everyone in our communities.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ PUBLIC INTEREST TECH ═══ */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="mb-14">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                Public Interest Technology
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Core Principles
              </h2>
              <p className="text-[oklch(0.55_0.02_260)] max-w-xl">
                SafeYork is designed with public good in mind, guided by six foundational principles.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {principles.map((p, i) => (
              <FadeIn key={p.name} delay={i * 0.08}>
                <div className="group p-6 neon-border rounded-lg bg-[oklch(0.1_0.02_260/40%)] h-full hover:bg-[oklch(0.12_0.02_260/60%)] transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-[oklch(0.85_0.18_192/10%)] flex items-center justify-center mb-4">
                    <p.icon className="w-5 h-5 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-lg mb-2">
                    {p.name}
                  </h3>
                  <p className="text-sm text-[oklch(0.55_0.02_260)] leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ TARGET USERS ═══ */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="mb-14">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.65_0.25_10)] tracking-widest uppercase">
                Who We Serve
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
                Target Users
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {targetUsers.map((u, i) => (
              <FadeIn key={u.label} delay={i * 0.06}>
                <div className="group flex flex-col items-center text-center gap-3 p-5 neon-border rounded-lg bg-[oklch(0.1_0.02_260/30%)] hover:bg-[oklch(0.12_0.02_260/50%)] transition-all duration-300">
                  <u.icon className="w-6 h-6 text-[oklch(0.85_0.18_192)]" />
                  <span className="text-sm text-[oklch(0.65_0.01_260)] font-medium">{u.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine color="magenta" />

      {/* ═══ TEAM — with neon_network GIF ═══ */}
      <section className="py-20 relative overflow-hidden">
        {/* Neon network GIF — very subtle colorful particles */}
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-screen">
          <img src={GIF_NEON_NETWORK} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-[oklch(0.08_0.02_260/60%)]" />

        <div className="container relative z-10">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.85_0.18_192)] tracking-widest uppercase">
                The Team
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-2">
                YangonDevs
              </h2>
              <p className="text-[oklch(0.55_0.02_260)]">
                The team behind SafeYork
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((m, i) => (
              <FadeIn key={m.name} delay={i * 0.1}>
                <div className="text-center p-6 neon-border rounded-lg bg-[oklch(0.1_0.02_260/50%)] backdrop-blur-sm group hover:bg-[oklch(0.12_0.02_260/70%)] transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-[oklch(0.85_0.18_192/10%)] border border-[oklch(0.85_0.18_192/25%)] flex items-center justify-center mx-auto mb-4 group-hover:neon-glow-cyan transition-shadow duration-300">
                    <m.icon className="w-6 h-6 text-[oklch(0.85_0.18_192)]" />
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] font-semibold text-white text-base mb-1">
                    {m.name}
                  </h3>
                  <p className="text-xs font-[family-name:var(--font-mono)] text-[oklch(0.5_0.02_260)]">
                    {m.role}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <GlowLine />

      {/* ═══ IMPACT ═══ */}
      <section className="py-20">
        <div className="container">
          <FadeIn>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[oklch(0.85_0.18_192/10%)] border border-[oklch(0.85_0.18_192/20%)] mb-6 mx-auto">
                <Sparkles className="w-6 h-6 text-[oklch(0.85_0.18_192)]" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Project Impact
              </h2>
              <p className="text-lg text-[oklch(0.6_0.01_260)] leading-relaxed mb-8">
                SafeYork is more than an emergency button. It is an AI-powered safety network designed to help people get support when they are scared, frozen, medically unable to respond, or in immediate danger.
              </p>
              <div className="inline-block px-8 py-4 neon-border rounded-lg bg-[oklch(0.85_0.18_192/8%)]">
                <p className="text-lg font-[family-name:var(--font-display)] font-semibold neon-text-cyan">
                  Help should reach people faster when every second matters.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}
