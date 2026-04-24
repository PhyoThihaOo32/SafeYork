import { BiometricSignal } from "../models/types";

export type BiometricScenario = "normal" | "stress" | "panic" | "fall" | "medicalLow";

export const BiometricSimulationService = {
  generate(scenario: BiometricScenario): BiometricSignal {
    switch (scenario) {
      case "stress":
        return { heartRate: 118, motionStatus: "panic movement", riskSignal: "Stress heart rate with irregular movement", emergencyType: "unknown", dangerLevel: 2 };
      case "panic":
        return { heartRate: 154, motionStatus: "panic movement", riskSignal: "Heart rate above 140 plus panic movement", emergencyType: "danger", dangerLevel: 3 };
      case "fall":
        return { heartRate: 132, motionStatus: "fall detected", riskSignal: "Fall event followed by stillness", emergencyType: "medical", dangerLevel: 3 };
      case "medicalLow":
        return { heartRate: 42, motionStatus: "stillness", riskSignal: "Very low heart rate with inactivity", emergencyType: "medical", dangerLevel: 3 };
      case "normal":
      default:
        return { heartRate: 76, motionStatus: "normal", riskSignal: "Normal simulated biometric range", emergencyType: "unknown", dangerLevel: 1 };
    }
  },
};
