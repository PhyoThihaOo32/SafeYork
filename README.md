# SafeYork

**AI-powered emergency alerts for faster help when every second matters.**

SafeYork (powered by SafeSignal) bridges the gap between crisis and trusted support. In dangerous or medical emergencies, people may panic, freeze, or be unable to call for help — SafeYork detects danger automatically and alerts the right people instantly.

**Live site:** [safeyork.vercel.app](https://safeyork.vercel.app)

---

## The Problem

During a medical crisis, personal attack, or moment of panic, fumbling through a phone to call 911 can cost critical seconds. Many people — especially women, elderly individuals, students, and those with health conditions — need a faster, simpler way to signal for help.

## The Solution

SafeYork uses AI signal analysis, biometric monitoring, and a one-tap alert system to:

- Detect emergencies automatically via heart rate, motion, and voice
- Notify trusted contacts with location, danger level, and medical info
- Escalate alerts through 3 danger levels up to emergency services
- Give users full control over what is shared and with whom

---

## Features

### 3-Level Danger System
| Level | Status | Action |
|-------|--------|--------|
| 1 | Caution | App checks in, prepares support options |
| 2 | Warning | Alerts trusted contacts and nearby helpers |
| 3 | Emergency | Alerts contacts, helpers, and emergency services |

### Guardian AI
Analyzes combined signals — text responses, heart rate, motion, fall detection, and stillness — to assess risk and generate an emergency summary with recommended actions. Includes coercion risk detection.

### Safety Modes
- Walking Home (15 min)
- Ride Safety (20 min)
- Home Alone (30 min)
- Medical Emergency (5 min)
- Custom Timer

### Multi-Trigger Alerts
One-tap button · Voice command · AI auto-detection · Check-in timer

### Trusted Contacts
Priority levels (Primary, Backup, Campus, Caregiver) with per-contact controls for location and medical info sharing.

### Privacy & Consent
Every data-sharing feature — location, medical notes, nearby helpers — requires explicit opt-in and can be toggled off at any time.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile | React Native 0.81.5, Expo 54 |
| Navigation | Expo Router 6 |
| Web | Static HTML / CSS / JavaScript |
| Language | TypeScript 5.9 |
| State | React Context API + AsyncStorage |
| Location | Expo Location |
| Sensors | Expo Sensors |
| Deployment | Vercel |

---

## Project Structure

```
SafeYork/
├── app/                    # Expo Router screens
│   ├── _layout.tsx         # Root layout + SafeYorkContext
│   ├── home.tsx            # Dashboard
│   ├── sos.tsx             # Emergency SOS
│   ├── contacts.tsx        # Trusted contacts
│   ├── guardian.tsx        # Guardian AI interface
│   ├── safe-mode.tsx       # Safety mode selection
│   ├── location.tsx        # Location sharing
│   ├── profile.tsx         # Emergency profile
│   ├── history.tsx         # Safety event log
│   └── settings.tsx        # App settings
├── src/                    # Services & context
├── index.html              # Landing page
├── project.html            # Project overview + interactive demo
├── about.html              # About & team
├── styles.css              # Shared styles (light/dark themes)
└── script.js               # Navigation, theme toggle, demo logic
```

---

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI

### Install
```bash
git clone https://github.com/PhyoThihaOo32/SafeYork-.git
cd SafeYork-
npm install
```

### Run
```bash
# Web browser
npm run web

# iOS simulator
npm run ios

# Android emulator
npm run android
```

### Build for web
```bash
npm run build:web
```

---

## Interactive Demo

The project page includes a live danger level classifier — select biometric signals and click **Analyze Signals** to see how Guardian AI assesses risk in real time.

The app ships with a CUNY student demo profile (contacts, NYC locations, medical notes) so you can walk through a full emergency scenario without any setup.

**Demo flow:**
1. Start Walking Home mode
2. Timer begins — don't respond when it ends
3. Guardian AI analyzes the situation
4. Danger level is assigned and escalated
5. Trusted contacts are notified (simulated)
6. Location and emergency message are displayed
7. Mark yourself safe to cancel

---

## Public Interest Technology

SafeYork was built with Public Interest Technology guidelines at its core:

- **Safety** — rapid detection and multi-channel notification
- **Equity** — designed for vulnerable populations (students, elderly, people with health conditions)
- **Privacy** — user-controlled data sharing with explicit consent
- **Accountability** — full event logging and transparent AI reasoning
- **Accessibility** — semantic HTML, ARIA labels, reduced motion support, responsive design

---

## Team

| Name | Role |
|------|------|
| Kyawt Kyawt Htun | UI / Front-End |
| Zin Min Wai | Signal Sender / AI NLP |
| Phyo Thiha Oo | Location / Biometrics |
| Thet Oo Maung | Contacts / Backend |

---

## Future Plans

- Real push notifications (SMS + email)
- Apple Watch integration
- Real biometric detection via wearables
- Campus safety dashboard
- Multi-language support
- Smart home and public emergency system partnerships

---

## License

MIT
