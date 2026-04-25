export type ThemeColors = {
  isDark: boolean;
  bg: string; surface: string; surfaceMid: string;
  border: string; borderMid: string;
  text: string; textMuted: string; textDim: string;
  pink: string; pinkBg: string; pinkGlow: string;
  blue: string; blueBg: string; blueGlow: string;
  green: string; greenBg: string; greenGlow: string;
  yellow: string; yellowBg: string; yellowGlow: string;
  orange: string; orangeBg: string; orangeGlow: string;
  red: string; redBg: string; redGlow: string;
  cyan: string; cyanBg: string; cyanGlow: string;
  purple: string; purpleBg: string; purpleGlow: string;
  orbA: string; orbB: string; orbC: string;
  scanLine: string; gridLine: string;
  sensorCardBg: string; aiOverlayBg: string;
};

export const darkTheme: ThemeColors = {
  isDark: true,
  bg:          "#000000",
  surface:     "#0a0a0a",
  surfaceMid:  "#111111",
  border:      "#1a1a1a",
  borderMid:   "#252525",
  text:        "#f0f0f0",
  textMuted:   "#888888",
  textDim:     "#444444",

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
  cyan:        "#00D4FF",
  cyanBg:      "rgba(0,212,255,0.08)",
  cyanGlow:    "rgba(0,212,255,0.5)",
  purple:      "#BD00FF",
  purpleBg:    "rgba(189,0,255,0.08)",
  purpleGlow:  "rgba(189,0,255,0.4)",

  orbA:         "rgba(0,212,255,0.04)",
  orbB:         "rgba(57,255,20,0.03)",
  orbC:         "rgba(189,0,255,0.03)",
  scanLine:     "rgba(0,212,255,0.04)",
  gridLine:     "rgba(255,255,255,0.02)",
  sensorCardBg: "rgba(255,255,255,0.02)",
  aiOverlayBg:  "rgba(0,0,0,0.93)",
};

export const lightTheme: ThemeColors = {
  isDark: false,
  bg:          "#F8FAFC",
  surface:     "#FFFFFF",
  surfaceMid:  "#F1F5F9",
  border:      "#E2E8F0",
  borderMid:   "#CBD5E1",
  text:        "#0F172A",
  textMuted:   "#475569",
  textDim:     "#94A3B8",

  pink:        "#C2185B",
  pinkBg:      "rgba(194,24,91,0.07)",
  pinkGlow:    "rgba(194,24,91,0.2)",
  blue:        "#0277BD",
  blueBg:      "rgba(2,119,189,0.07)",
  blueGlow:    "rgba(2,119,189,0.2)",
  green:       "#2E7D32",
  greenBg:     "rgba(46,125,50,0.07)",
  greenGlow:   "rgba(46,125,50,0.2)",
  yellow:      "#B45309",
  yellowBg:    "rgba(180,83,9,0.07)",
  yellowGlow:  "rgba(180,83,9,0.2)",
  orange:      "#C2410C",
  orangeBg:    "rgba(194,65,12,0.07)",
  orangeGlow:  "rgba(194,65,12,0.2)",
  red:         "#C2185B",
  redBg:       "rgba(194,24,91,0.07)",
  redGlow:     "rgba(194,24,91,0.2)",
  cyan:        "#0277BD",
  cyanBg:      "rgba(2,119,189,0.07)",
  cyanGlow:    "rgba(2,119,189,0.2)",
  purple:      "#6D28D9",
  purpleBg:    "rgba(109,40,217,0.07)",
  purpleGlow:  "rgba(109,40,217,0.2)",

  orbA:         "rgba(2,119,189,0.05)",
  orbB:         "rgba(46,125,50,0.04)",
  orbC:         "rgba(109,40,217,0.04)",
  scanLine:     "rgba(0,0,0,0.03)",
  gridLine:     "rgba(0,0,0,0.03)",
  sensorCardBg: "rgba(0,0,0,0.02)",
  aiOverlayBg:  "rgba(248,250,252,0.95)",
};

export type DangerLevel = 0 | 1 | 2 | 3;

export function getDanger(th: ThemeColors) {
  return {
    0: { color: th.blue,   bg: th.blueBg,   glow: th.blueGlow,   label: "SECURE"    },
    1: { color: th.yellow, bg: th.yellowBg, glow: th.yellowGlow, label: "CAUTION"   },
    2: { color: th.orange, bg: th.orangeBg, glow: th.orangeGlow, label: "WARNING"   },
    3: { color: th.pink,   bg: th.pinkBg,   glow: th.pinkGlow,   label: "EMERGENCY" },
  } as const;
}

// Legacy exports — keep for any file that still imports c/DANGER
export const c = darkTheme;
export const f = { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 28, hero: 56 } as const;
export const DANGER = getDanger(darkTheme);
