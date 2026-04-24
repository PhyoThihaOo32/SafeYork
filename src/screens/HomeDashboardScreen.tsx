import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ActionButton, BodyText, Card, DangerBadge, KeyValue, Screen, ScreenLink, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function HomeDashboardScreen() {
  const router = useRouter();
  const { status, dangerLevel, selectedMode, location, biometric, triggerAlert, logEvent } = useSafeBeacon();

  return (
    <Screen title="SafeBeacon" subtitle="Large controls, minimal steps, privacy-first simulated alerts.">
      <DangerBadge level={dangerLevel} />
      <Card style={{ alignItems: "center", gap: 18 }}>
        <Text style={{ color: colors.text, fontSize: 18, fontWeight: "900" }}>Current Status: {status}</Text>
        <Pressable
          onPress={() => triggerAlert(3, "Triple-tap SOS from Home Dashboard", "emergency help")}
          style={{
            width: 210,
            height: 210,
            borderRadius: 105,
            backgroundColor: colors.emergency,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 12,
            borderColor: "#7f1d1d",
          }}
        >
          <Text style={{ color: colors.white, fontSize: 52, fontWeight: "900" }}>SOS</Text>
          <Text style={{ color: colors.white, fontWeight: "900" }}>TRIPLE TAP DEMO</Text>
        </Pressable>
        <BodyText>Tap opens an immediate Level 3 simulated alert for the demo. The dedicated SOS screen shows the full triple-tap countdown flow.</BodyText>
      </Card>
      <Card>
        <SectionTitle>Live Safety Snapshot</SectionTitle>
        <KeyValue label="Mode" value={selectedMode.name} />
        <KeyValue label="Location" value={`${location.name} (${location.source})`} />
        <KeyValue label="Heart rate" value={`${biometric.heartRate} BPM`} />
        <KeyValue label="Motion" value={biometric.motionStatus} />
      </Card>
      <View style={{ gap: 10 }}>
        <ActionButton label="Open Full SOS Flow" tone="red" onPress={() => router.push("/sos")} />
        <ActionButton label="I Feel Unsafe - Start Silent Monitoring" tone="orange" onPress={() => {
          logEvent("I Feel Unsafe mode", 2, "Silent monitoring started and user was prompted to start a timer.");
          router.push("/safe-mode");
        }} />
        <ActionButton label="Fake Call Demo" tone="dark" onPress={() => router.push("/settings")} />
      </View>
      <ScreenLink href="/safe-mode" label="Get Home Safe Timer" detail="Walking Home, Ride Safety, Home Alone, Medical Emergency, or custom timer." />
      <ScreenLink href="/guardian" label="Guardian AI" detail="Analyze voice, text, biometric, coercion, and triage signals." />
      <ScreenLink href="/contacts" label="Trusted Contacts" detail="Add family, friends, guardians, campus security, or caregivers." />
      <ScreenLink href="/profile" label="Emergency Profile" detail="Privacy-safe medical notes and trusted contact information." />
      <ScreenLink href="/helpers" label="Nearby Helper Opt-In" detail="Consent-based helper network with limited shared information." />
      <ScreenLink href="/location" label="Location and Safe Area" detail="GPS if available, simulated fallback, and map-style safety markers." />
      <ScreenLink href="/history" label="Safety History" detail="Accountability timeline for timers, alerts, AI decisions, and helper responses." />
      <ScreenLink href="/settings" label="Settings and Everyday Safety" detail="Widget demo, fake call, night prompt, checklist, and privacy controls." />
      <ScreenLink href="/future" label="Future Vision" detail="Roadmap for wearables, campus partnerships, and public infrastructure integration." />
    </Screen>
  );
}
