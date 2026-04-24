# SafeBeacon

## Track
CUNY AI Innovation Challenge 2026  
AI for Health and Public Good

## Problem Statement
In emergency situations such as being followed late at night, attacked, kidnapped, or facing sudden medical conditions, people often struggle to get immediate help. Victims may be unable to communicate clearly, while others do not know their location, what is happening, or who to contact. Reaching out one by one is slow and unreliable. As a result, critical time is lost when every second matters.

## Solution
SafeBeacon is an AI-powered personal safety app that helps users get emergency support through one tap, voice command, or AI detection. The app classifies danger levels, notifies the right people, shares location, and creates AI-generated emergency summaries.

This is a polished working demo app, not a production emergency system. It does not call police, 911, strangers, or emergency services. It does not send real SMS or real emergency alerts. All alert behavior is clearly labeled as Demo Mode or simulation.

## Target Users
- Students
- College campus communities
- NYC commuters
- Women walking alone
- Children
- Elderly users
- People with medical conditions
- General public long term

## AI Integration
Guardian AI performs:
- Biometric anomaly detection simulation
- Voice and text distress analysis
- Coercion risk detection
- Emergency triage summary generation
- Explainable AI reasoning
- Risk classification into Level 1, Level 2, Level 3

If no Claude or OpenAI API key is available, the app uses realistic local fallback logic and labels the behavior as AI Simulation Mode.

## Public Interest Technology
SafeBeacon demonstrates:
- Safety and equity
- Accessibility
- Privacy and consent
- Accountability
- Community responsibility

Privacy safeguards include masked phone numbers, no home address display, medical sharing controls, helper opt-in consent, simulated audio monitoring, and minimum necessary information for nearby helpers.

## Core Demo Features
- Onboarding screen
- Home dashboard with large SOS button
- SOS emergency screen with triple-tap and cancel countdown
- Safe Mode / Get Home Safe timer
- Guardian AI analysis screen
- Trusted contacts
- Emergency profile
- Nearby helper opt-in
- Location sharing / safe area screen
- Safety history timeline
- Settings with fake call, widget demo, night prompt, and checklist
- Demo mode controls
- Future vision roadmap

## Alert Levels
- Level 1: Caution, yellow, checks if the user is okay
- Level 2: Warning, orange, notifies trusted contacts and nearby opted-in helpers
- Level 3: Emergency, red, notifies trusted contacts, nearby helpers, and emergency support simulation

## Challenges
- Biometric accuracy without wearables
- False positives
- Panic-state usability
- API fallback
- Privacy and helper safety

## What We Learned
- Designing for crisis is different from designing for convenience
- AI should support decision-making, not create confusion
- Community safety requires consent and privacy
- Working prototype is different from trustworthy production product

## Next Steps
- Validated rPPG
- Real notification APIs
- Firebase helper network
- Wearables
- Campus safety partnerships
- Smart home APIs
- NYC public infrastructure integration

## Demo Script
SafeBeacon is an AI-powered personal safety app designed first for students and college campuses. A user can press SOS, speak a safe word, or start a Get Home Safe timer when walking home or riding alone. If the user does not respond, SafeBeacon first gives a subtle check-in reminder. If there is still no response, Guardian AI analyzes the situation, assigns a danger level, generates an emergency message, shares location, and escalates alerts to the right people. Level 1 checks on the user, Level 2 alerts trusted contacts and nearby helpers, and Level 3 alerts trusted contacts, nearby helpers, and emergency support simulation. SafeBeacon is designed to reduce emergency response delays while protecting privacy.

## Run Locally
```bash
npm install
npm run start
```

Then open the app in Expo Go, an iOS simulator, Android emulator, or the Expo web target.

## Tech Stack
- React Native
- Expo SDK 54
- TypeScript
- Expo Router
- AsyncStorage
- Expo Location with simulated fallback
- Expo Sensors planned with simulated fallback
- Local Guardian AI simulation with API-ready service abstraction
# SafeYork
