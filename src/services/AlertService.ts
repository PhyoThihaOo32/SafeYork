import { AIAnalysis, Contact, LocationInfo, NotificationCard, SafetyMode } from "../models/types";

export const AlertService = {
  generateMessage(args: {
    userName: string;
    mode: SafetyMode;
    analysis: AIAnalysis;
    location: LocationInfo;
  }) {
    const riskLabel = args.analysis.riskLevel === 3 ? "High" : args.analysis.riskLevel === 2 ? "Medium" : "Caution";
    return `SafeYork Demo Alert: ${args.userName} may need help. Mode: ${args.mode.name}. Risk Level: ${riskLabel}. Last known location: ${args.location.name} (${args.location.source}). Recommended action: ${args.analysis.recommendedAction}`;
  },

  simulateNotifications(contacts: Contact[], level: number, helperOptIn: boolean, message: string): NotificationCard[] {
    const cards: NotificationCard[] = contacts
      .filter((contact) => contact.favorite || level >= 2)
      .map((contact) => ({
        id: `trusted-${contact.id}-${Date.now()}`,
        recipient: contact.name,
        scope: "Trusted Contact",
        message,
      }));

    if (level >= 2 && helperOptIn) {
      cards.push({
        id: `helper-${Date.now()}`,
        recipient: "Nearby opted-in helper network",
        scope: "Nearby Helper",
        message: "Limited privacy-safe alert shared: approximate area, danger level, and request to respond only if safe.",
      });
    }

    if (level >= 3) {
      cards.push({
        id: `support-${Date.now()}`,
        recipient: "Emergency support simulation",
        scope: "Emergency Support Simulation",
        message: "Demo Mode only: no police, 911, SMS, or real emergency service contacted.",
      });
    }

    return cards;
  },
};
