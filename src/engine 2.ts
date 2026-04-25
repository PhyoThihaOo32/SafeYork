export type Motion = "still" | "walking" | "running" | "fall";

export type Signal = {
  heartRate: number;    // BPM
  spo2: number;         // % oxygen saturation
  motion: Motion;
  voiceDistress: number; // 0–10
};

export type Level = 0 | 1 | 2 | 3;

export type Decision = {
  level: Level;
  reason: string;
  autoTrigger: boolean;
};

export function classify(s: Signal): Decision {
  const critical =
    s.motion === "fall" ||
    s.heartRate > 145 ||
    s.heartRate < 40 ||
    s.spo2 < 85 ||
    s.voiceDistress >= 8;

  if (critical) {
    return { level: 3, reason: "Critical signal — immediate danger detected", autoTrigger: true };
  }

  const warning =
    s.heartRate > 120 ||
    s.heartRate < 50 ||
    s.spo2 < 92 ||
    s.voiceDistress >= 5;

  if (warning) {
    return { level: 2, reason: "Elevated distress — monitoring closely", autoTrigger: false };
  }

  const caution =
    s.heartRate > 100 ||
    s.spo2 < 95 ||
    s.voiceDistress >= 3;

  if (caution) {
    return { level: 1, reason: "Mild anomaly — check-in recommended", autoTrigger: false };
  }

  return { level: 0, reason: "All signals normal", autoTrigger: false };
}

const BASE: Record<"normal" | "caution" | "danger" | "critical", Signal> = {
  normal:   { heartRate: 72,  spo2: 99, motion: "still",   voiceDistress: 0 },
  caution:  { heartRate: 102, spo2: 94, motion: "walking",  voiceDistress: 3 },
  danger:   { heartRate: 128, spo2: 90, motion: "running",  voiceDistress: 6 },
  critical: { heartRate: 152, spo2: 82, motion: "fall",     voiceDistress: 9 },
};

export function simulate(scenario: keyof typeof BASE): Signal {
  const base = BASE[scenario];
  return {
    heartRate:    base.heartRate + Math.round((Math.random() - 0.5) * 4),
    spo2:         Math.min(100, base.spo2 + Math.round((Math.random() - 0.5) * 2)),
    motion:       base.motion,
    voiceDistress: base.voiceDistress,
  };
}
