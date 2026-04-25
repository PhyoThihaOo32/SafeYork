import { useState } from "react";
import { TextInput, View } from "react-native";
import { ActionButton, BodyText, Card, DangerBadge, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors, radii } from "../constants/theme";
import { useSafeYork } from "../state/SafeYorkContext";

export default function GuardianAIScreen() {
  const { dangerLevel, analysis, biometric, analyzeText, simulateBiometric, triggerAlert } = useSafeYork();
  const [input, setInput] = useState("I am fine do not call me");

  return (
    <Screen title="Guardian AI" subtitle="AI analysis of text, voice, biometrics, and coercion risk.">
      <DangerBadge level={dangerLevel} />

      {/* Text Analysis */}
      <Card>
        <SectionTitle>Distress Analysis</SectionTitle>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a distress phrase or safe word..."
          placeholderTextColor={colors.muted}
          multiline
          style={{
            minHeight: 72,
            color: colors.text,
            backgroundColor: colors.surface,
            borderRadius: radii.sm,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 12,
            fontSize: 13,
            textAlignVertical: "top",
          }}
        />
        <ActionButton label="Analyze" tone="blue" onPress={() => analyzeText(input, "typed or simulated voice command")} />
        {analysis.coercionRisk ? (
          <ActionButton label="Discreet Help Prompt" tone="red" onPress={() => triggerAlert(3, "Discreet coercion escalation", input)} />
        ) : null}
      </Card>

      {/* Biometric Sim */}
      <Card>
        <SectionTitle>Biometric Simulation</SectionTitle>
        <View style={{ gap: 6 }}>
          <ActionButton label="Normal Signals" tone="green" onPress={() => simulateBiometric("normal")} />
          <ActionButton label="Panic Mode" tone="orange" onPress={() => simulateBiometric("panic")} />
          <ActionButton label="Fall Detected" tone="red" onPress={() => simulateBiometric("fall")} />
          <ActionButton label="Low Heart Rate" tone="red" onPress={() => simulateBiometric("medicalLow")} />
        </View>
      </Card>

      {/* AI Panel */}
      <Card>
        <SectionTitle>AI Analysis Panel</SectionTitle>
        <KeyValue label="Risk Level" value={`Level ${analysis.riskLevel}`} />
        <KeyValue label="Distress" value={`${analysis.distressLevel}/10`} />
        <KeyValue label="Emergency Type" value={analysis.emergencyType} />
        <KeyValue label="Coercion" value={analysis.coercionRisk ? "Flagged" : "Clear"} />
        <KeyValue label="Heart Rate" value={`${biometric.heartRate} BPM`} />
        <KeyValue label="Motion" value={biometric.motionStatus} />
        <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 2 }} />
        <BodyText>{analysis.reasoning}</BodyText>
        <BodyText>Action: {analysis.recommendedAction}</BodyText>
      </Card>
    </Screen>
  );
}
