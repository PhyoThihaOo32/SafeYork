import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ActionButton, BodyText, Card, DangerBadge, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { useSafeYork } from "../state/SafeYorkContext";

export default function SOSEmergencyScreen() {
  const router = useRouter();
  const { dangerLevel, notifications, emergencySummary, triggerAlert, markSafe } = useSafeYork();
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
    <Screen title="SOS Emergency" subtitle="Triple-tap with 3-second cancel window.">
      <DangerBadge level={dangerLevel} />

      {/* SOS Circle */}
      <View style={{ alignItems: "center", paddingVertical: 20, gap: 14 }}>
        <Pressable
          onPress={handleTap}
          style={{
            width: 180,
            height: 180,
            borderRadius: 90,
            backgroundColor: countdown !== null ? "#991b1b" : colors.emergency,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: countdown !== null ? colors.emergency : "#ef444440",
          }}
        >
          <Text style={{ color: colors.white, fontSize: 44, fontWeight: "800", letterSpacing: 2 }}>SOS</Text>
          <Text style={{ color: "#ffffffcc", fontSize: 12, fontWeight: "700" }}>Tap {Math.min(tapCount + 1, 3)} of 3</Text>
        </Pressable>

        {countdown !== null ? (
          <View style={{ alignItems: "center", gap: 8 }}>
            <Text style={{ color: colors.emergency, fontSize: 48, fontWeight: "800" }}>{countdown}</Text>
            <ActionButton label="Cancel Alert" tone="dark" onPress={() => {
              setCountdown(null);
              markSafe("SOS countdown canceled before escalation.");
            }} />
          </View>
        ) : (
          <Text style={{ color: colors.muted, fontSize: 12, textAlign: "center", maxWidth: 280 }}>
            Triple tap to activate. 3-second cancel window before simulated escalation.
          </Text>
        )}
      </View>

      {notifications.length ? (
        <Card>
          <SectionTitle>Alert Confirmation</SectionTitle>
          <KeyValue label="Status" value="Alert sent (Demo)" />
          <KeyValue label="Location" value="Active simulation" />
          <KeyValue label="Danger" value={`Level ${dangerLevel}`} />
          <BodyText>{emergencySummary.headline}</BodyText>
          {notifications.map((card) => (
            <KeyValue key={card.id} label={card.scope} value={card.recipient} />
          ))}
          <ActionButton label="View History" tone="blue" onPress={() => router.push("/history")} />
        </Card>
      ) : null}
    </Screen>
  );
}
