import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { classify, Decision, Level, Signal, simulate } from "./engine";

export type Contact = {
  id: string;
  name: string;
  phone: string;
  relation: string;
  priority: "primary" | "backup";
};

export type AlertState = {
  active: boolean;
  level: Level;
  reason: string;
  triggeredBy: "manual" | "ai" | null;
  sentAt: number | null;
  notified: { label: string; count: number }[];
};

type AppState = {
  signal: Signal;
  decision: Decision;
  alert: AlertState;
  contacts: Contact[];
  name: string;
  medicalNote: string;
  aiActive: boolean;
  setName: (v: string) => void;
  setMedicalNote: (v: string) => void;
  addContact: (c: Contact) => void;
  removeContact: (id: string) => void;
  triggerAlert: (level: Level, reason: string, by: "manual" | "ai") => void;
  cancelAlert: () => void;
  setSignalScenario: (s: "normal" | "caution" | "danger" | "critical") => void;
};

const DEFAULT_CONTACTS: Contact[] = [
  { id: "1", name: "Maya Chen", phone: "•••-•••-4821", relation: "Friend", priority: "primary" },
  { id: "2", name: "Mom", phone: "•••-•••-1234", relation: "Family", priority: "primary" },
  { id: "3", name: "Campus Security", phone: "•••-•••-9100", relation: "Campus", priority: "backup" },
];

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [signal, setSignal] = useState<Signal>(simulate("normal"));
  const [decision, setDecision] = useState<Decision>(classify(simulate("normal")));
  const [alert, setAlert] = useState<AlertState>({
    active: false, level: 0, reason: "", triggeredBy: null, sentAt: null, notified: [],
  });
  const [contacts, setContacts] = useState<Contact[]>(DEFAULT_CONTACTS);
  const [name, setName] = useState("CUNY Student");
  const [medicalNote, setMedicalNote] = useState("Penicillin allergy. Seizure disorder.");
  const [aiActive] = useState(true);

  // Pulse signal simulation every 2s
  const scenarioRef = useRef<"normal" | "caution" | "danger" | "critical">("normal");
  useEffect(() => {
    const id = setInterval(() => {
      const s = simulate(scenarioRef.current);
      setSignal(s);
      const d = classify(s);
      setDecision(d);
      if (d.autoTrigger && !alert.active) {
        triggerAlert(d.level, d.reason, "ai");
      }
    }, 2000);
    return () => clearInterval(id);
  }, [alert.active]);

  useEffect(() => {
    AsyncStorage.getItem("sy-contacts").then((v) => {
      if (v) setContacts(JSON.parse(v));
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("sy-contacts", JSON.stringify(contacts)).catch(() => undefined);
  }, [contacts]);

  function buildNotified(level: Level, ctcts: Contact[]) {
    const list: { label: string; count: number }[] = [];
    const primary = ctcts.filter((c) => c.priority === "primary").length;
    const backup = ctcts.filter((c) => c.priority === "backup").length;
    if (level >= 1) list.push({ label: "Nearby users", count: Math.floor(Math.random() * 4) + 1 });
    if (level >= 2) list.push({ label: "Trusted contacts", count: primary + backup });
    if (level >= 3) list.push({ label: "911 Emergency Services", count: 1 });
    return list;
  }

  const triggerAlert = useCallback((level: Level, reason: string, by: "manual" | "ai") => {
    setAlert({
      active: true,
      level,
      reason,
      triggeredBy: by,
      sentAt: Date.now(),
      notified: buildNotified(level, contacts),
    });
  }, [contacts]);

  function cancelAlert() {
    setAlert({ active: false, level: 0, reason: "", triggeredBy: null, sentAt: null, notified: [] });
    setSignalScenario("normal");
  }

  function setSignalScenario(s: "normal" | "caution" | "danger" | "critical") {
    scenarioRef.current = s;
    const sig = simulate(s);
    setSignal(sig);
    setDecision(classify(sig));
  }

  function addContact(c: Contact) {
    setContacts((prev) => [c, ...prev]);
  }

  function removeContact(id: string) {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <Ctx.Provider value={{
      signal, decision, alert, contacts, name, medicalNote, aiActive,
      setName, setMedicalNote, addContact, removeContact,
      triggerAlert, cancelAlert, setSignalScenario,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useApp outside AppProvider");
  return ctx;
}
