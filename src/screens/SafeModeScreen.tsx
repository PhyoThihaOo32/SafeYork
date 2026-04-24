import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ActionButton, BodyText, Card, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { safetyModes } from "../data/demoData";
import { useSafeYork } from "../state/SafeYorkContext";

export default function SafeModeScreen() {
  const { selectedMode, setSelectedMode, triggerAlert, markSafe, logEvent, analyzeText } = useSafeYork();
  const [secondsLeft, setSecondsLeft] = useState(selectedMode.minutes * 60);
  const [active, setActive] = useState(false);
  const [grace, setGrace] = useState(false);

  useEffect(() => {
    if (!active) return;
    if (secondsLeft <= 0) {
      setActive(false);
      setGrace(true);
      logEvent("Soft warning shown", 1, "Timer expired. User has a 30-second grace period to check in.");
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((value) => value - 1), 1000);
    return () => clearTimeout(timer);
  }, [active, secondsLeft, logEvent]);

  function format(value: number) {
    const minutes = Math.floor(value / 60).toString().padStart(2, "0");
    const seconds = (value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  return (
    <Screen title="Get Home Safe" subtitle="Start a timer, check in when safe, or escalate if help is needed.">
      <Card>
        <SectionTitle>Safety Mode Selection</SectionTitle>
        <View style={{ gap: 8 }}>
          {safetyModes.map((mode) => (
            <Pressable
              key={mode.id}
              onPress={() => {
                setSelectedMode(mode);
                setSecondsLeft(mode.minutes * 60);
              }}
              style={{
                padding: 14,
                borderRadius: 16,
                borderWidth: 1,
                borderColor: selectedMode.id === mode.id ? colors.blue : colors.border,
                backgroundColor: selectedMode.id === mode.id ? "#102a48" : colors.surface,
              }}
            >
              <Text style={{ color: colors.text, fontWeight: "900" }}>{mode.name} - {mode.minutes} min</Text>
              <Text style={{ color: colors.muted, marginTop: 4 }}>{mode.description}</Text>
            </Pressable>
          ))}
        </View>
      </Card>
      <Card style={{ alignItems: "center" }}>
        <Text style={{ color: grace ? colors.caution : colors.text, fontSize: 58, fontWeight: "900" }}>{grace ? "00:30" : format(secondsLeft)}</Text>
        <BodyText>{grace ? "Tap I'm Home Safe if you are okay. If no response, Guardian AI escalates." : `Selected mode: ${selectedMode.name}`}</BodyText>
        <View style={{ width: "100%", gap: 10 }}>
          <ActionButton label={active ? "Timer Running" : "Start Timer"} tone="green" onPress={() => {
            setActive(true);
            setGrace(false);
            logEvent("Timer started", 0, `${selectedMode.name} started for ${selectedMode.minutes} minutes.`);
          }} />
          <ActionButton label="I'm Home Safe" tone="green" onPress={() => {
            setActive(false);
            setGrace(false);
            markSafe(`${selectedMode.name} completed. User checked in safe.`);
          }} />
          <ActionButton label="Need Help Now" tone="red" onPress={() => triggerAlert(3, "Need Help pressed from Safe Mode", "I need help")} />
          <ActionButton label="Simulate No Response After Timer" tone="orange" onPress={() => {
            setGrace(false);
            const result = analyzeText("", "Timer expired and no response");
            triggerAlert(result.riskLevel, "Timer expired with no response", "");
          }} />
        </View>
      </Card>
    </Screen>
  );
}
