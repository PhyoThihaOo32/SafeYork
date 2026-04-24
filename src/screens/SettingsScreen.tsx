import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { ActionButton, BodyText, Card, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { safetyChecklist } from "../data/demoData";
import { useSafeYork } from "../state/SafeYorkContext";

export default function SettingsScreen() {
  const { helperOptIn, shareMedical, toggleHelperOptIn, toggleMedicalSharing, triggerAlert, logEvent } = useSafeYork();
  const [fakeCall, setFakeCall] = useState(false);
  const [checked, setChecked] = useState<string[]>(["Phone"]);

  return (
    <Screen title="Settings & Everyday Safety" subtitle="Privacy controls, fake call, widget demo, night prompt, and safety checklist.">
      <Card>
        <SectionTitle>Privacy Controls</SectionTitle>
        <KeyValue label="Nearby helper consent" value={helperOptIn ? "Opted in" : "Opted out"} />
        <ActionButton label="Toggle Helper Consent" tone="dark" onPress={toggleHelperOptIn} />
        <KeyValue label="Medical sharing" value={shareMedical ? "Enabled" : "Disabled"} />
        <ActionButton label="Toggle Medical Sharing" tone="dark" onPress={toggleMedicalSharing} />
      </Card>
      <Card>
        <SectionTitle>Phone Widget Demo</SectionTitle>
        <View style={{ padding: 16, borderRadius: 22, backgroundColor: "#0b1426", borderWidth: 1, borderColor: colors.border }}>
          <Text style={{ color: colors.text, fontWeight: "900", fontSize: 18 }}>SafeYork Widget</Text>
          <Text style={{ color: colors.muted, marginVertical: 8 }}>Walking Home: 12:45 left</Text>
          <ActionButton label="Triple-Tap Widget SOS Simulation" tone="red" onPress={() => triggerAlert(3, "Phone widget quick access demo", "emergency")} />
        </View>
      </Card>
      <Card>
        <SectionTitle>Fake Call</SectionTitle>
        {fakeCall ? (
          <View style={{ padding: 18, borderRadius: 18, backgroundColor: colors.surface }}>
            <Text style={{ color: colors.text, fontSize: 24, fontWeight: "900" }}>Incoming call from Mom</Text>
            <View style={{ gap: 8, marginTop: 14 }}>
              <ActionButton label="Answer" tone="green" onPress={() => {
                setFakeCall(false);
                logEvent("Fake call answered", 0, "Fake incoming call simulation answered.");
              }} />
              <ActionButton label="Decline" tone="red" onPress={() => setFakeCall(false)} />
            </View>
          </View>
        ) : (
          <ActionButton label="Start Fake Incoming Call" tone="blue" onPress={() => setFakeCall(true)} />
        )}
      </Card>
      <Card>
        <SectionTitle>Night Safety Prompt</SectionTitle>
        <BodyText>Demo condition: It is late. Start Get Home Safe Timer?</BodyText>
        <ActionButton label="Log Late-Night Prompt" tone="yellow" onPress={() => logEvent("Night safety prompt", 1, "It is late. User was prompted to start Get Home Safe Timer.")} />
      </Card>
      <Card>
        <SectionTitle>Safety Checklist</SectionTitle>
        {safetyChecklist.map((item) => (
          <Pressable
            key={item}
            onPress={() => setChecked((current) => current.includes(item) ? current.filter((value) => value !== item) : [...current, item])}
            style={{ padding: 12, borderRadius: 14, backgroundColor: checked.includes(item) ? "#12351f" : colors.surface, marginBottom: 8 }}
          >
            <Text style={{ color: colors.text, fontWeight: "800" }}>{checked.includes(item) ? "✓ " : ""}{item}</Text>
          </Pressable>
        ))}
      </Card>
    </Screen>
  );
}
