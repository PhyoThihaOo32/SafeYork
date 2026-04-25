/**
 * A thin horizontal neon line that glows — used as a section separator.
 */
export default function GlowLine({ color = "cyan" }: { color?: "cyan" | "magenta" }) {
  const c = color === "cyan" ? "oklch(0.85 0.18 192)" : "oklch(0.65 0.25 10)";
  return (
    <div
      className="w-full h-px"
      style={{
        background: `linear-gradient(90deg, transparent, ${c}, transparent)`,
        boxShadow: `0 0 8px ${c.replace(")", " / 40%)")}`,
      }}
    />
  );
}
