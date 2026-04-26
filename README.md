# SafeYork

**AI-powered emergency alerts for faster help when every second matters.**

SafeYork is a polished Expo React Native demo app for the CUNY AI Innovation Challenge 2026, Track: AI for Health and Public Good. It helps demonstrate one-tap safety alerts, voice/text distress analysis, AI danger classification, trusted contacts, location sharing, safety history, and privacy-first emergency workflows.

**Live demo:** [safeyork.vercel.app](https://safeyork.vercel.app)

> Demo Mode only: SafeYork does not call 911, police, emergency services, strangers, or send real SMS. All alerts, helper notifications, and emergency support actions are simulated.

---

## Problem Statement

In emergency situations such as being followed late at night, attacked, kidnapped, or facing sudden medical conditions, people often struggle to get immediate help. Victims may be unable to communicate clearly, while others do not know their location, what is happening, or who to contact. Reaching out one by one is slow and unreliable. As a result, critical time is lost when every second matters.

## Solution

SafeYork is an AI-powered personal safety app demo that helps users get emergency support through one tap, voice command, or AI detection. The app classifies danger levels, simulates notifying the right people, shares location in demo mode, and creates AI-generated emergency summaries.

## Target Users

- Students and college campus communities
- NYC commuters
- Women walking alone
- Children and young adults
- Elderly users
- People with medical conditions
- General public, long term

---

## Core Features

### 3-Level Danger System

| Level | Status | Action |
| ----- | ------ | ------ |
| 1 | Caution | Ask the user if they are okay |
| 2 | Warning | Simulate alerts to trusted contacts and opted-in nearby helpers |
| 3 | Emergency | Simulate alerts to trusted contacts, nearby helpers, and emergency support |

### Guardian AI

Guardian AI performs biometric anomaly detection simulation, voice/text distress analysis, coercion risk detection, emergency triage summary generation, explainable AI reasoning, and risk classification into Level 1, Level 2, or Level 3.

### Safety Modes

- Walking Home
- Ride Safety
- Home Alone
- Medical Emergency
- Custom Timer

### Privacy and Consent

SafeYork is designed around minimum necessary sharing. Trusted contacts can receive detailed simulated emergency information, nearby helpers receive limited information, phone numbers stay masked, medical notes are controlled by user permission, and helper participation requires opt-in.

---

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| App | React Native 0.81.5, Expo SDK 54 |
| Navigation | Expo Router 6 |
| Language | TypeScript 5.9 |
| State | React Context API + AsyncStorage |
| Location | Expo Location with simulated fallback |
| Sensors | Expo Sensors with simulated fallback |
| Web Deploy | Expo web static export on Vercel |

---

## Project Structure

```
SafeYork/
├── app/                    # Expo Router routes
│   ├── _layout.tsx         # Root layout and app provider
│   ├── home.tsx            # Main polished dashboard
│   ├── sos.tsx             # SOS emergency flow
│   ├── guardian.tsx        # Guardian AI analysis
│   ├── safe-mode.tsx       # Get Home Safe timer
│   ├── location.tsx        # Location sharing and safe areas
│   ├── profile.tsx         # Privacy-safe emergency profile
│   ├── helpers.tsx         # Nearby helper opt-in
│   ├── history.tsx         # Safety history timeline
│   ├── demo.tsx            # Judge/demo controls
│   └── future.tsx          # Future vision roadmap
├── src/
│   ├── components/         # Shared UI components
│   ├── constants/          # Design tokens
│   ├── data/               # Demo users, locations, roadmap data
│   ├── models/             # TypeScript models
│   ├── screens/            # Screen implementations
│   ├── services/           # Alert, AI, biometric, and location services
│   ├── context.tsx         # App state provider
│   ├── engine.ts           # Rule-based danger classifier
│   └── theme.ts            # Day/night app theme
├── website-src/            # Optional reference website source, not the Vercel deploy target
├── app.json                # Expo app config
├── package.json            # Scripts and dependencies
├── tsconfig.json           # TypeScript config
└── vercel.json             # Vercel builds the Expo web app from app/ and src/
```

Vercel deploys the Expo app with `npx expo export -p web`. The `website-src/` folder is retained only as reference source and is not used by the current deployment.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Expo CLI through `npx expo`

### Install

```bash
git clone https://github.com/PhyoThihaOo32/SafeYork.git
cd SafeYork
npm install
```

### Run Locally

```bash
# Web browser
npm run web

# iOS simulator
npm run ios

# Android emulator
npm run android
```

### Build for Vercel/Web

```bash
npm run build:web
```

---

## Demo Script

SafeYork is an AI-powered personal safety app designed first for students and college campuses. A user can press SOS, use a voice/text trigger, or start a Get Home Safe timer when walking home or riding alone. If the user does not respond, SafeYork gives a subtle check-in reminder. If there is still no response, Guardian AI analyzes the situation, assigns a danger level, generates an emergency message, shares location in demo mode, and escalates simulated alerts to the right people. Level 1 checks on the user, Level 2 alerts trusted contacts and nearby helpers in simulation, and Level 3 simulates trusted contacts, nearby helpers, and emergency support.

---

## Public Interest Technology

SafeYork demonstrates public-interest technology principles:

- Safety and equity
- Accessibility
- Privacy and consent
- Accountability
- Community responsibility

---

## Challenges

- Biometric accuracy without wearables
- False positives
- Panic-state usability
- AI/API fallback reliability
- Privacy and helper safety

## What We Learned

Designing for crisis is different from designing for convenience. AI should support decision-making, not create confusion. Community safety requires consent, privacy, and clear accountability. A working prototype is different from a trustworthy production emergency system.

## Next Steps

- Validated rPPG or wearable-based biometric detection
- Real notification APIs with explicit user consent
- Firebase helper network
- Wearable safety button
- Campus safety partnerships
- Smart home APIs
- NYC public infrastructure exploration

---

## Team

| Name | Role |
| ---- | ---- |
| Kyawt Kyawt Htun | UI / Front-End |
| Zin Min Wai | Signal Sender / AI NLP |
| Phyo Thiha Oo | Location / Biometrics |
| Thet Oo Maung | Contacts / Backend |

---

## License

MIT
