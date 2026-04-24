import { Contact, SafetyMode, LocationInfo, SafetyEvent } from "../models/types";

export const teamMembers = ["Kyawt Kyawt Htun", "Zin Min Wai", "Phyo Thiha Oo", "Member 4"];

export const safetyModes: SafetyMode[] = [
  { id: "walking", name: "Walking Home", minutes: 15, description: "For walking alone, campus routes, or late-night commutes." },
  { id: "ride", name: "Ride Safety", minutes: 20, description: "For taxi, rideshare, bus, subway, or riding alone." },
  { id: "home", name: "Home Alone", minutes: 30, description: "Quiet monitoring while alone at home." },
  { id: "medical", name: "Medical Emergency", minutes: 5, description: "Short check-in timer for health risk or symptoms." },
  { id: "custom", name: "Custom Timer", minutes: 10, description: "Presenter-controlled timer for demos." },
];

export const demoLocations: LocationInfo[] = [
  { source: "simulated", name: "BMCC Campus", latitude: 40.7188, longitude: -74.0119, mapLink: "https://maps.example/simulated-bmcc" },
  { source: "simulated", name: "Chambers Street Station", latitude: 40.7144, longitude: -74.0086, mapLink: "https://maps.example/simulated-chambers" },
  { source: "simulated", name: "34th Street Penn Station", latitude: 40.7506, longitude: -73.9935, mapLink: "https://maps.example/simulated-penn" },
  { source: "simulated", name: "CUNY Library", latitude: 40.7479, longitude: -73.9846, mapLink: "https://maps.example/simulated-library" },
  { source: "simulated", name: "Dorm Walk Route", latitude: 40.7295, longitude: -73.9965, mapLink: "https://maps.example/simulated-dorm-route" },
];

export const initialContacts: Contact[] = [
  { id: "c1", name: "Zin Min Wai", relationship: "Roommate", phone: "•••-•••-0168", email: "zin@example.com", priority: "Primary", favorite: true, shareMedical: true },
  { id: "c2", name: "Maya Chen", relationship: "Friend", phone: "•••-•••-4921", email: "maya@example.com", priority: "Backup", favorite: false, shareMedical: false },
  { id: "c3", name: "Campus Security Desk", relationship: "Campus support", phone: "•••-•••-0000", email: "security@example.edu", priority: "Campus", favorite: true, shareMedical: false },
];

export const initialEvents: SafetyEvent[] = [
  {
    id: "event-1",
    timestamp: new Date().toLocaleString(),
    type: "Demo Mode Ready",
    dangerLevel: 0,
    detail: "SafeBeacon started in simulated emergency mode. No real calls, SMS, audio recording, or 911 contact.",
  },
];

export const safetyChecklist = ["Phone", "Keys", "Wallet", "Charger", "ID"];

export const roadmap = [
  {
    phase: "Phase 1",
    items: ["Post-hackathon hardening", "Validated rPPG", "Firebase helper network", "User testing with CUNY students"],
  },
  {
    phase: "Phase 2",
    items: ["Wearable button", "Smart bracelet", "Campus safety partnerships", "Community network"],
  },
  {
    phase: "Phase 3",
    items: ["NYC 911 text integration", "MTA emergency system exploration", "School safety networks", "Smart home API integration", "Public emergency devices"],
  },
];
