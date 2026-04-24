import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ActionButton, BodyText, Card, DangerBadge, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function SOSEmergencyScreen() {
  const router = useRouter();
  const { dangerLevel, notifications, emergencySummary, triggerAlert, markSafe } = useSafeBeacon();
  const [tapCount, setTapCount] = useState(0);
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      triggerAlert(3, "SOS triple tap countdown completed", "emergency help");
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => setCountdown((value) => (value === null ? null : value - 1)), 1000);
    return () => clearTimeout(timer);
  }, [countdown, triggerAlert]);

  function handleTap() {
    const next = tapCount + 1;
    setTapCount(next);
    if (next >= 3) {
      setCountdown(3);
      setTapCount(0);
    }
  }

  return (
    <Screen title="SOS Emergency" subtitle="Triple-tap activation plus a 3-second cancel window to reduce accidental alerts.">
      <DangerBadge level={dangerLevel} />
      <Card style={{ alignItems: "center", gap: 18, borderColor: countdown !== null ? colors.emergency : colors.border }}>
        <Pressable
          onPress={handleTap}
          style={{
            width: 250,
            height: 250,
            borderRadius: 125,
            backgroundColor: colors.emergency,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 14,
            borderColor: "#991b1b",
          }}
        >
          <Text style={{ color: colors.white, fontSize: 58, fontWeight: "900" }}>SOS</Text>
          <Text style={{ color: colors.white, fontWeight: "900" }}>Tap {Math.min(tapCount + 1, 3)} of 3</Text>
        </Pressable>
        {countdown !== null ? (
          <>
            <Text style={{ color: colors.emergency, fontSize: 42, fontWeight: "900" }}>{countdown}</Text>
            <ActionButton label="Cancel Simulated Alert" tone="dark" onPress={() => {
              setCountdown(null);
              markSafe("SOS countdown canceled before escalation.");
            }} />
          </>
        ) : (
          <BodyText>Triple tap the button. After the third tap, SafeBeacon starts a cancel countdown before simulated escalation.</BodyText>
        )}
      </Card>
      {notifications.length ? (
        <Card>
          <SectionTitle>Alert Confirmation</SectionTitle>
          <KeyValue label="Status" value="Alert sent in Demo Mode" />
          <KeyValue label="Location sharing" value="Active simulation" />
          <KeyValue label="Danger level" value={`Level ${dangerLevel}`} />
          <BodyText>{emergencySummary.headline}</BodyText>
          {notifications.map((card) => (
            <KeyValue key={card.id} label={card.scope} value={card.recipient} />
          ))}
          <ActionButton label="Open History Timeline" tone="blue" onPress={() => router.push("/history")} />
        </Card>
      ) : null}
    </Screen>
  );
}
