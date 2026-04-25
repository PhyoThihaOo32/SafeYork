import { motion } from "framer-motion";

/**
 * Animated concentric rings that pulse outward — representing the safety signal broadcast.
 * Used in the hero section and CTA areas.
 */
export default function PulseRing({ className = "" }: { className?: string }) {
  const rings = [0, 1, 2, 3];
  return (
    <div className={`absolute inset-0 flex items-center justify-center pointer-events-none ${className}`}>
      {rings.map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-[oklch(0.85_0.18_192/20%)]"
          style={{
            width: `${(i + 1) * 25}%`,
            height: `${(i + 1) * 25}%`,
          }}
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3 - i * 0.06, 0.15 - i * 0.03, 0.3 - i * 0.06],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        />
      ))}
      {/* Center dot */}
      <motion.div
        className="w-3 h-3 rounded-full bg-[oklch(0.85_0.18_192)]"
        animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        style={{ boxShadow: "0 0 15px oklch(0.85 0.18 192 / 60%)" }}
      />
    </div>
  );
}
