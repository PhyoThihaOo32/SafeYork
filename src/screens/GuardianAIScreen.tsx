import { useState } from "react";
import { TextInput, View } from "react-native";
import { ActionButton, BodyText, Card, DangerBadge, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function GuardianAIScreen() {
  const { dangerLevel, analysis, biometric, analyzeText, simulateBiometric, triggerAlert } = useSafeBeacon();
  const [input, setInput] = useState("I am fine do not call me");

  return (
    <Screen title="Guardian AI" subtitle="AI Simulation Mode analyzes text, voice transcripts, biometrics, coercion risk, and emergency type.">
      <DangerBadge level={dangerLevel} />
      <Card>
        <SectionTitle>Voice/Text Distress Analysis</SectionTitle>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a safe word or distress phrase"
          placeholderTextColor={colors.muted}
          multiline
          style={{
            minHeight: 92,
            color: colors.text,
            backgroundColor: colors.surface,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 12,
            textAlignVertical: "top",
          }}
        />
        <ActionButton label="Analyze with Guardian AI Simulation" tone="blue" onPress={() => analyzeText(input, "typed or simulated voice command")} />
        {analysis.coercionRisk ? (
          <ActionButton label="Discreet Prompt: Tap once if you need help" tone="red" onPress={() => triggerAlert(3, "Discreet coercion escalation", input)} />
        ) : null}
      </Card>
      <Card>
        <SectionTitle>Biometric Simulation</SectionTitle>
        <View style={{ gap: 8 }}>
          <ActionButton label="Normal Signals" tone="green" onPress={() => simulateBiometric("normal")} />
          <ActionButton label="High Heart Rate + Panic Motion" tone="orange" onPress={() => simulateBiometric("panic")} />
          <ActionButton label="Fall Detected + Stillness" tone="red" onPress={() => simulateBiometric("fall")} />
          <ActionButton label="Very Low Heart Rate" tone="red" onPress={() => simulateBiometric("medicalLow")} />
        </View>
      </Card>
      <Card>
        <SectionTitle>Explainable AI Panel</SectionTitle>
        <KeyValue label="Mode" value={analysis.mode} />
        <KeyValue label="Risk level" value={`Level ${analysis.riskLevel}`} />
        <KeyValue label="Distress score" value={`${analysis.distressLevel}/10`} />
        <KeyValue label="Emergency type" value={analysis.emergencyType} />
        <KeyValue label="Coercion risk" value={analysis.coercionRisk ? "Flagged" : "Not flagged"} />
        <KeyValue label="Heart rate" value={`${biometric.heartRate} BPM`} />
        <KeyValue label="Motion" value={biometric.motionStatus} />
        <BodyText>Reason: {analysis.reasoning}</BodyText>
        <BodyText>Recommended action: {analysis.recommendedAction}</BodyText>
      </Card>
    </Screen>
  );
}
