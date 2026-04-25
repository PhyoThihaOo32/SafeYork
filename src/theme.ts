export const c = {
  bg:          "#000000",
  surface:     "#0a0a0a",
  surfaceMid:  "#111111",
  border:      "#1a1a1a",
  borderMid:   "#222222",
  text:        "#f0f0f0",
  textMuted:   "#888888",
  textDim:     "#444444",

  // NYC neon palette
  pink:        "#FF2D78",
  pinkBg:      "rgba(255,45,120,0.08)",
  pinkGlow:    "rgba(255,45,120,0.6)",

  blue:        "#00D4FF",
  blueBg:      "rgba(0,212,255,0.08)",
  blueGlow:    "rgba(0,212,255,0.5)",

  green:       "#39FF14",
  greenBg:     "rgba(57,255,20,0.08)",
  greenGlow:   "rgba(57,255,20,0.5)",

  yellow:      "#FFE600",
  yellowBg:    "rgba(255,230,0,0.08)",
  yellowGlow:  "rgba(255,230,0,0.5)",

  orange:      "#FF6B00",
  orangeBg:    "rgba(255,107,0,0.08)",
  orangeGlow:  "rgba(255,107,0,0.5)",

  red:         "#FF2D78",
  redBg:       "rgba(255,45,120,0.08)",
  redGlow:     "rgba(255,45,120,0.6)",

  // Aliases for backward compat
  cyan:        "#00D4FF",
  cyanBg:      "rgba(0,212,255,0.08)",
  cyanGlow:    "rgba(0,212,255,0.5)",
  purple:      "#BD00FF",
  purpleBg:    "rgba(189,0,255,0.08)",
  purpleGlow:  "rgba(189,0,255,0.4)",
} as const;

export const f = {
  xs:   10,
  sm:   12,
  md:   14,
  lg:   16,
  xl:   20,
  xxl:  28,
  hero: 56,
} as const;

export type DangerLevel = 0 | 1 | 2 | 3;

export const DANGER = {
  0: { color: c.blue,   bg: c.blueBg,   glow: c.blueGlow,   label: "SECURE"    },
  1: { color: c.yellow, bg: c.yellowBg, glow: c.yellowGlow, label: "CAUTION"   },
  2: { color: c.orange, bg: c.orangeBg, glow: c.orangeGlow, label: "WARNING"   },
  3: { color: c.pink,   bg: c.pinkBg,   glow: c.pinkGlow,   label: "EMERGENCY" },
} as const;
