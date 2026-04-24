import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AlertService } from "../services/AlertService";
import { BiometricScenario, BiometricSimulationService } from "../services/BiometricSimulationService";
import { GuardianAIService } from "../services/GuardianAIService";
import { LocationService } from "../services/LocationService";
import { demoLocations, initialContacts, initialEvents, safetyModes } from "../data/demoData";
import {
  AIAnalysis,
  BiometricSignal,
  Contact,
  DangerLevel,
  EmergencySummary,
  LocationInfo,
  NotificationCard,
  SafetyEvent,
  SafetyMode,
  SafetyStatus,
} from "../models/types";

type SafeBeaconState = {
  userName: string;
  status: SafetyStatus;
  dangerLevel: DangerLevel;
  selectedMode: SafetyMode;
  location: LocationInfo;
  biometric: BiometricSignal;
  analysis: AIAnalysis;
  contacts: Contact[];
  helperOptIn: boolean;
  shareMedical: boolean;
  medicalNotes: string;
  notifications: NotificationCard[];
  history: SafetyEvent[];
  emergencySummary: EmergencySummary;
  demoMode: boolean;
  setSelectedMode: (mode: SafetyMode) => void;
  addContact: (contact: Contact) => void;
  toggleHelperOptIn: () => void;
  toggleMedicalSharing: () => void;
  setMedicalNotes: (notes: string) => void;
  analyzeText: (text: string, context?: string) => AIAnalysis;
  simulateBiometric: (scenario: BiometricScenario) => void;
  refreshLocation: (index?: number) => Promise<void>;
  triggerAlert: (level: DangerLevel, triggerType: string, text?: string) => void;
  markSafe: (detail?: string) => void;
  logEvent: (type: string, dangerLevel: DangerLevel, detail: string) => void;
  clearNotifications: () => void;
};

const defaultAnalysis = GuardianAIService.analyzeText("safe check-in");
const defaultBiometric = BiometricSimulationService.generate("normal");
const defaultSummary = GuardianAIService.generateSummary({
  userName: "CUNY Student",
  modeName: safetyModes[0].name,
  triggerType: "Demo startup",
  location: demoLocations[0],
  biometric: defaultBiometric,
  analysis: defaultAnalysis,
  medicalNotes: "Seizure disorder. Allergic to penicillin.",
  shareMedical: true,
  sessionDuration: "00:00",
});

const SafeBeaconContext = createContext<SafeBeaconState | null>(null);

export function SafeBeaconProvider({ children }: { children: React.ReactNode }) {
  const [userName] = useState("CUNY Student");
  const [status, setStatus] = useState<SafetyStatus>("Safe");
  const [dangerLevel, setDangerLevel] = useState<DangerLevel>(0);
  const [selectedMode, setSelectedMode] = useState<SafetyMode>(safetyModes[0]);
  const [location, setLocation] = useState<LocationInfo>(demoLocations[0]);
  const [biometric, setBiometric] = useState<BiometricSignal>(defaultBiometric);
  const [analysis, setAnalysis] = useState<AIAnalysis>(defaultAnalysis);
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [helperOptIn, setHelperOptIn] = useState(true);
  const [shareMedical, setShareMedical] = useState(true);
  const [medicalNotes, setMedicalNotes] = useState("Seizure disorder. Allergic to penicillin.");
  const [notifications, setNotifications] = useState<NotificationCard[]>([]);
  const [history, setHistory] = useState<SafetyEvent[]>(initialEvents);
  const [emergencySummary, setEmergencySummary] = useState<EmergencySummary>(defaultSummary);
  const [demoMode] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem("safebeacon-state").then((stored) => {
      if (!stored) return;
      const parsed = JSON.parse(stored) as Partial<SafeBeaconState>;
      if (parsed.contacts) setContacts(parsed.contacts);
      if (parsed.history) setHistory(parsed.history);
      if (typeof parsed.helperOptIn === "boolean") setHelperOptIn(parsed.helperOptIn);
      if (typeof parsed.shareMedical === "boolean") setShareMedical(parsed.shareMedical);
      if (parsed.medicalNotes) setMedicalNotes(parsed.medicalNotes);
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      "safebeacon-state",
      JSON.stringify({ contacts, history, helperOptIn, shareMedical, medicalNotes })
    ).catch(() => undefined);
  }, [contacts, history, helperOptIn, shareMedical, medicalNotes]);

  function logEvent(type: string, level: DangerLevel, detail: string) {
    setHistory((current) => [
      { id: `${Date.now()}-${type}`, timestamp: new Date().toLocaleString(), type, dangerLevel: level, detail },
      ...current,
    ]);
  }

  function addContact(contact: Contact) {
    setContacts((current) => [contact, ...current]);
    logEvent("Trusted contact added", 0, `${contact.name} added with ${contact.priority} priority.`);
  }

  function toggleHelperOptIn() {
    setHelperOptIn((current) => {
      const next = !current;
      logEvent("Nearby helper consent updated", 0, next ? "User opted in to receive simulated nearby alerts." : "User opted out of nearby helper alerts.");
      return next;
    });
  }

  function toggleMedicalSharing() {
    setShareMedical((current) => {
      const next = !current;
      logEvent("Medical sharing updated", 0, next ? "Medical notes can be shared with trusted contacts during emergencies." : "Medical notes hidden from alert summary.");
      return next;
    });
  }

  function analyzeText(text: string, context = "") {
    const textAnalysis = GuardianAIService.analyzeText(text, context);
    const combined = GuardianAIService.combineSignals(textAnalysis, biometric);
    setAnalysis(combined);
    setDangerLevel(combined.riskLevel);
    setStatus(combined.riskLevel === 3 ? "Emergency" : combined.riskLevel === 2 ? "Warning" : "Caution");
    logEvent("Guardian AI analysis", combined.riskLevel, combined.reasoning);
    return combined;
  }

  function simulateBiometric(scenario: BiometricScenario) {
    const next = BiometricSimulationService.generate(scenario);
    const combined = GuardianAIService.combineSignals(analysis, next);
    setBiometric(next);
    setAnalysis(combined);
    setDangerLevel(combined.riskLevel);
    setStatus(combined.riskLevel === 3 ? "Emergency" : combined.riskLevel === 2 ? "Warning" : "Caution");
    logEvent("Biometric simulation", next.dangerLevel, `${next.riskSignal}. Heart rate ${next.heartRate} BPM.`);
  }

  async function refreshLocation(index?: number) {
    const next = typeof index === "number" ? LocationService.simulated(index) : await LocationService.getLocation();
    setLocation(next);
    logEvent("Location updated", 0, `${next.source === "gps" ? "GPS" : "Simulated"} location: ${next.name}.`);
  }

  function triggerAlert(level: DangerLevel, triggerType: string, text = "") {
    const textAnalysis = text ? GuardianAIService.analyzeText(text, triggerType) : analysis;
    const combined = GuardianAIService.combineSignals(textAnalysis, biometric);
    const finalLevel = Math.max(level, combined.riskLevel) as DangerLevel;
    const finalAnalysis = { ...combined, riskLevel: finalLevel };
    const message = AlertService.generateMessage({ userName, mode: selectedMode, analysis: finalAnalysis, location });
    const cards = AlertService.simulateNotifications(contacts, finalLevel, helperOptIn, message);
    const summary = GuardianAIService.generateSummary({
      userName,
      modeName: selectedMode.name,
      triggerType,
      location,
      biometric,
      analysis: finalAnalysis,
      medicalNotes,
      shareMedical,
      sessionDuration: `${selectedMode.minutes}:00`,
    });

    setDangerLevel(finalLevel);
    setStatus(finalLevel === 3 ? "Emergency" : finalLevel === 2 ? "Warning" : "Caution");
    setAnalysis(finalAnalysis);
    setNotifications(cards);
    setEmergencySummary(summary);
    logEvent("Simulated alert triggered", finalLevel, `${triggerType}. ${message}`);
  }

  function markSafe(detail = "User marked themselves safe.") {
    setStatus("Safe");
    setDangerLevel(0);
    setNotifications([]);
    setAnalysis(defaultAnalysis);
    logEvent("Marked safe", 0, detail);
  }

  const value = useMemo(
    () => ({
      userName,
      status,
      dangerLevel,
      selectedMode,
      location,
      biometric,
      analysis,
      contacts,
      helperOptIn,
      shareMedical,
      medicalNotes,
      notifications,
      history,
      emergencySummary,
      demoMode,
      setSelectedMode,
      addContact,
      toggleHelperOptIn,
      toggleMedicalSharing,
      setMedicalNotes,
      analyzeText,
      simulateBiometric,
      refreshLocation,
      triggerAlert,
      markSafe,
      logEvent,
      clearNotifications: () => setNotifications([]),
    }),
    [status, dangerLevel, selectedMode, location, biometric, analysis, contacts, helperOptIn, shareMedical, medicalNotes, notifications, history, emergencySummary]
  );

  return <SafeBeaconContext.Provider value={value}>{children}</SafeBeaconContext.Provider>;
}

export function useSafeBeacon() {
  const context = useContext(SafeBeaconContext);
  if (!context) {
    throw new Error("useSafeBeacon must be used within SafeBeaconProvider");
  }
  return context;
}
