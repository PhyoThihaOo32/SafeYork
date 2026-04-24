export type DangerLevel = 0 | 1 | 2 | 3;
export type SafetyStatus = "Safe" | "Timer Active" | "Caution" | "Warning" | "Emergency";
export type EmergencyType = "danger" | "medical" | "unknown";

export type SafetyMode = {
  id: string;
  name: string;
  minutes: number;
  description: string;
};

export type Contact = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  priority: "Primary" | "Backup" | "Campus" | "Caregiver";
  favorite: boolean;
  shareMedical: boolean;
};

export type LocationInfo = {
  source: "gps" | "simulated";
  name: string;
  latitude: number;
  longitude: number;
  mapLink: string;
};

export type BiometricSignal = {
  heartRate: number;
  motionStatus: "normal" | "panic movement" | "fall detected" | "stillness";
  riskSignal: string;
  emergencyType: EmergencyType;
  dangerLevel: DangerLevel;
};

export type AIAnalysis = {
  distressLevel: number;
  coercionRisk: boolean;
  genuinelySafe: boolean;
  recommendedAction: string;
  reasoning: string;
  riskLevel: DangerLevel;
  emergencyType: EmergencyType;
  signals: string[];
  mode: "AI Simulation Mode" | "API Mode";
};

export type SafetyEvent = {
  id: string;
  timestamp: string;
  type: string;
  dangerLevel: DangerLevel;
  detail: string;
};

export type NotificationCard = {
  id: string;
  recipient: string;
  scope: "Trusted Contact" | "Nearby Helper" | "Emergency Support Simulation";
  message: string;
};

export type EmergencySummary = {
  headline: string;
  description: string;
  medicalContext: string;
  recommendedFirstResponse: string;
};
