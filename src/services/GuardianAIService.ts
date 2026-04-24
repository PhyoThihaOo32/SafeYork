import { AIAnalysis, BiometricSignal, DangerLevel, EmergencySummary, EmergencyType, LocationInfo } from "../models/types";

const dangerWords = ["followed", "kidnapped", "attack", "stalking", "stabbing", "threat", "scared", "police", "911"];
const medicalWords = ["seizure", "heart", "panic", "fainting", "fall", "dizzy", "cannot breathe", "medical"];
const distressWords = ["help", "stop", "danger", "emergency", "leave me alone", "i need help"];
const coercionPhrases = ["i am fine do not call me", "everything is okay please stop asking", "i said i am safe"];

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function maxLevel(a: DangerLevel, b: DangerLevel): DangerLevel {
  return Math.max(a, b) as DangerLevel;
}

export const GuardianAIService = {
  analyzeText(input: string, context = ""): AIAnalysis {
    const text = `${input} ${context}`.toLowerCase().trim();
    const signals: string[] = [];
    let riskLevel: DangerLevel = 1;
    let distressLevel = 2;
    let emergencyType: EmergencyType = "unknown";

    if (!text) {
      signals.push("No response from user");
      riskLevel = 2;
      distressLevel = 6;
    }

    if (includesAny(text, distressWords)) {
      signals.push("Explicit distress keyword detected");
      riskLevel = maxLevel(riskLevel, 3);
      distressLevel = 9;
    }

    if (includesAny(text, dangerWords)) {
      signals.push("Danger-related emergency language");
      emergencyType = "danger";
      riskLevel = maxLevel(riskLevel, 3);
      distressLevel = 9;
    }

    if (includesAny(text, medicalWords)) {
      signals.push("Medical emergency language");
      emergencyType = "medical";
      riskLevel = maxLevel(riskLevel, 3);
      distressLevel = 8;
    }

    const coercionRisk = includesAny(text, coercionPhrases) || (text.includes("fine") && context.toLowerCase().includes("timer expired"));
    if (coercionRisk) {
      signals.push("Possible coercion risk in check-in response");
      riskLevel = maxLevel(riskLevel, 2);
      distressLevel = Math.max(distressLevel, 7);
    }

    return {
      distressLevel,
      coercionRisk,
      genuinelySafe: riskLevel === 1 && !coercionRisk,
      recommendedAction:
        riskLevel === 3
          ? emergencyType === "medical"
            ? "Start medical support simulation and notify trusted contacts."
            : "Start emergency support simulation and notify trusted contacts."
          : riskLevel === 2
            ? "Notify trusted contacts and nearby opted-in helpers."
            : "Ask the user if they are okay.",
      reasoning: signals.length ? signals.join("; ") : "No high-risk terms detected. Continue check-in monitoring.",
      riskLevel,
      emergencyType,
      signals,
      mode: "AI Simulation Mode",
    };
  },

  combineSignals(textAnalysis: AIAnalysis, biometric: BiometricSignal): AIAnalysis {
    const riskLevel = maxLevel(textAnalysis.riskLevel, biometric.dangerLevel);
    const emergencyType = biometric.emergencyType !== "unknown" ? biometric.emergencyType : textAnalysis.emergencyType;
    const signals = [...textAnalysis.signals, biometric.riskSignal].filter(Boolean);

    return {
      ...textAnalysis,
      riskLevel,
      emergencyType,
      signals,
      reasoning: signals.join("; "),
      recommendedAction:
        riskLevel === 3
          ? emergencyType === "medical"
            ? "Escalate to Level 3 medical emergency simulation."
            : "Escalate to Level 3 danger emergency simulation."
          : riskLevel === 2
            ? "Escalate to Level 2 warning and notify trusted contacts plus helpers."
            : "Keep Level 1 caution and request user check-in.",
    };
  },

  generateSummary(args: {
    userName: string;
    modeName: string;
    triggerType: string;
    location: LocationInfo;
    biometric: BiometricSignal;
    analysis: AIAnalysis;
    medicalNotes: string;
    shareMedical: boolean;
    sessionDuration: string;
  }): EmergencySummary {
    const level = `Level ${args.analysis.riskLevel}`;
    const medicalContext = args.shareMedical ? args.medicalNotes : "Medical notes hidden by user privacy setting.";

    return {
      headline: `${args.userName} triggered a ${level} SafeBeacon alert near ${args.location.name}.`,
      description: `${args.triggerType} during ${args.modeName}. Location is ${args.location.source === "gps" ? "GPS" : "simulated"}: ${args.location.name}. Signals: ${args.analysis.reasoning}. Session duration: ${args.sessionDuration}.`,
      medicalContext,
      recommendedFirstResponse: args.analysis.recommendedAction,
    };
  },
};
