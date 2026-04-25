import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { ActionButton, BodyText, Card, DangerBadge, KeyValue, Screen, ScreenLink, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { useSafeYork } from "../state/SafeYorkContext";

export default function HomeDashboardScreen() {
  const router = useRouter();
  const { status, dangerLevel, selectedMode, location, biometric, triggerAlert, logEvent } = useSafeYork();

  return (
    <Screen title="Dashboard" subtitle="Privacy-first simulated emergency alerts.">
      <DangerBadge level={dangerLevel} />

      {/* SOS Button — clean, centered */}
      <View style={{ alignItems: "center", paddingVertical: 16, gap: 12 }}>
        <Text style={{ color: colors.muted, fontSize: 10, fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>
          STATUS: {status}
        </Text>
        <Pressable
          onPress={() => triggerAlert(3, "Triple-tap SOS from Home Dashboard", "emergency help")}
          style={{
            width: 160,
            height: 160,
            borderRadius: 80,
            backgroundColor: colors.emergency,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: "#ef444460",
          }}
        >
          <Text style={{ color: colors.white, fontSize: 38, fontWeight: "800", letterSpacing: 2 }}>SOS</Text>
        </Pressable>
        <Text style={{ color: colors.muted, fontSize: 11, textAlign: "center" }}>
          Tap for immediate Level 3 simulated alert
        </Text>
      </View>

      {/* Live Snapshot */}
      <Card>
        <SectionTitle>Live Safety Snapshot</SectionTitle>
        <KeyValue label="Mode" value={selectedMode.name} />
        <KeyValue label="Location" value={location.name} />
        <KeyValue label="Heart Rate" value={`${biometric.heartRate} BPM`} />
        <KeyValue label="Motion" value={biometric.motionStatus} />
      </Card>

      {/* Quick Actions — reduced to 2 */}
      <View style={{ gap: 8 }}>
        <ActionButton label="Full SOS Flow" tone="red" onPress={() => router.push("/sos")} />
        <ActionButton label="I Feel Unsafe" tone="orange" onPress={() => {
          logEvent("I Feel Unsafe mode", 2, "Silent monitoring started.");
          router.push("/safe-mode");
        }} />
      </View>

      {/* Navigation — compact list */}
      <ScreenLink href="/safe-mode" label="Get Home Safe Timer" detail="Walking, Ride, Home Alone, Medical, or custom timer." />
      <ScreenLink href="/guardian" label="Guardian AI" detail="Voice, text, biometric, and coercion analysis." />
      <ScreenLink href="/contacts" label="Trusted Contacts" detail="Family, friends, campus security." />
      <ScreenLink href="/profile" label="Emergency Profile" detail="Privacy-safe medical notes." />
      <ScreenLink href="/helpers" label="Nearby Helpers" detail="Consent-based helper network." />
      <ScreenLink href="/location" label="Location" detail="GPS and safe area markers." />
      <ScreenLink href="/history" label="History" detail="Timeline of alerts and AI decisions." />
      <ScreenLink href="/settings" label="Settings" detail="Widget, fake call, privacy controls." />
      <ScreenLink href="/future" label="Future Vision" detail="Wearables, campus, and public infrastructure." />
    </Screen>
  );
}
