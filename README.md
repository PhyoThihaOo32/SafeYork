# SafeBeacon

AI-powered personal safety app for emergency alerts, location sharing, and fast trusted-contact support.

## Overview

SafeBeacon is a personal safety application designed to help users get emergency support quickly when they feel unsafe, are walking alone, riding alone, or experiencing a medical emergency.

The app allows users to send alerts through one tap, voice command, safety timer, or AI detection. SafeBeacon can notify trusted contacts, share location, classify danger levels, and guide the right emergency response while protecting user privacy.

## Problem

In emergency situations, people may panic, freeze, lose consciousness, or become unable to call for help. Traditional phone calls can be slow, missed, muted, or mistaken for normal communication.

SafeBeacon solves this by creating a faster bridge between a person in crisis and the people who can help.

## Key Features

### One-Tap SOS

Users can quickly trigger an emergency alert with a single tap.

### Get Home Safe Timer

Users can start a timer while walking home, riding alone, or feeling unsafe. If they do not respond when time runs out, the app begins an escalation process.

### Voice Command Trigger

Users can activate an alert using a safe word or emergency phrase.

### Guardian AI Risk Detection

AI analyzes the situation and classifies the danger level based on user response, timer status, selected safety mode, text input, and simulated emergency signals.

### Danger Level System

Level 1: Caution  
Checks if the user is okay.

Level 2: Warning  
Alerts trusted contacts and nearby opted-in helpers.

Level 3: Emergency  
Alerts trusted contacts, nearby helpers, and emergency support simulation.

### Trusted Contacts

Users can add family, friends, guardians, roommates, or campus safety contacts who should be notified during an emergency.

### Location Sharing

The app shares the user’s live or simulated location during an emergency so responders know where help is needed.

### Emergency Profile

Displays important information such as first name, medical notes, allergy notes, and trusted contact details if the user cannot communicate.

### Nearby Helper Network

Users can opt in to help nearby people in trouble. Helpers only receive limited emergency details to protect user privacy.

### Safety History

The app logs safety events such as SOS triggers, timer sessions, danger levels, alerts, and check-ins.

## AI Integration

SafeBeacon uses Guardian AI to support emergency decision-making.

Guardian AI can:

- Analyze danger level
- Detect emergency keywords
- Identify possible distress or no-response situations
- Generate emergency messages
- Recommend the next action
- Explain why a danger level was selected

For the MVP, some AI, location, biometric, and notification features may be simulated for a safe and reliable demo.

## Tech Stack

- React Native
- Expo
- TypeScript
- NativeWind or React Native styling
- Expo Location
- Expo Sensors
- Firebase Realtime Database
- Claude API or OpenAI API
- Local storage for profile and safety history

## MVP Features

- Home dashboard
- SOS emergency button
- Get Home Safe timer
- Voice command trigger
- Guardian AI analysis
- AI-generated emergency message
- Three-level danger system
- Trusted contacts
- Emergency profile
- Location sharing simulation
- Nearby helper simulation
- Safety history log
- Demo mode

## Public Interest Technology

SafeBeacon is designed with public good in mind.

The project focuses on:

- Safety
- Accessibility
- Privacy
- Consent
- Equity
- Accountability
- Community support

Users control who receives alerts, what information is shared, and whether they want to participate as nearby helpers.

## Target Users

- College students
- NYC commuters
- Women walking alone
- Children
- Elderly users
- People with health conditions
- Ride-share passengers
- General public

## Demo Flow

1. User opens SafeBeacon.
2. User starts Walking Home mode.
3. Timer begins.
4. User does not respond when the timer ends.
5. App shows a subtle check-in prompt.
6. Guardian AI analyzes the situation.
7. App assigns a danger level.
8. Trusted contacts are notified through simulation.
9. Location and emergency message are displayed.
10. Event is saved in safety history.

## Future Improvements

- Real push notifications
- SMS and email alerts
- Apple Watch integration
- Wearable emergency button
- Smart bracelet for children and elderly users
- Real biometric detection
- Campus safety dashboard
- Smart home API integration
- Public emergency system partnerships
- Multi-language support

## Team Members

- Kyawt Kyawt Htun — UI / Front-End
- Zin Min Wai — Signal Sender / AI NLP
- Phyo Thiha Oo — Location / Biometrics
- Member 4 — Contacts / Backend

## Project Impact

SafeBeacon is more than an emergency button. It is an AI-powered safety network designed to help people get support when they are scared, frozen, medically unable to respond, or in immediate danger.

The goal is simple:

Help should reach people faster when every second matters.