import { ActionButton, BodyText, Card, DangerBadge, KeyValue, Screen, ScreenLink, SectionTitle } from "../components/ui";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function DemoModeScreen() {
  const { dangerLevel, triggerAlert, analyzeText, simulateBiometric, refreshLocation, notifications, markSafe } = useSafeBeacon();

  return (
    <Screen title="Demo Mode" subtitle="Presenter controls for judges. Every action is simulated and labeled.">
      <DangerBadge level={dangerLevel} />
      <Card>
        <SectionTitle>Scenario Controls</SectionTitle>
        <ActionButton label="Simulate SOS" tone="red" onPress={() => triggerAlert(3, "Demo SOS", "help emergency")} />
        <ActionButton label="Simulate Timer Expired + No Response" tone="orange" onPress={() => {
          const result = analyzeText("", "Timer expired and no response");
          triggerAlert(result.riskLevel, "Timer expired with no response");
        }} />
        <ActionButton label="Simulate High Heart Rate" tone="orange" onPress={() => simulateBiometric("panic")} />
        <ActionButton label="Simulate Fall Detected" tone="red" onPress={() => simulateBiometric("fall")} />
        <ActionButton label="Simulate Voice Distress" tone="red" onPress={() => triggerAlert(3, "Voice command trigger", "I need help leave me alone")} />
        <ActionButton label="Simulate Coercion Risk" tone="orange" onPress={() => analyzeText("I am fine do not call me", "Timer expired")} />
        <ActionButton label="Simulate Medical Emergency" tone="red" onPress={() => triggerAlert(3, "Medical emergency demo", "seizure fall no movement")} />
        <ActionButton label="Simulate Danger Emergency" tone="red" onPress={() => triggerAlert(3, "Danger emergency demo", "followed attack scared")} />
        <ActionButton label="Simulate Nearby Helper Accepted" tone="green" onPress={() => triggerAlert(2, "Nearby helper accepted demo", "medium risk")} />
        <ActionButton label="Reset to Safe" tone="green" onPress={() => markSafe("Demo reset to safe status.")} />
      </Card>
      <Card>
        <SectionTitle>Demo Data</SectionTitle>
        <BodyText>Sample users: Zin Min Wai, Maya Chen, CUNY Student, NYC Commuter.</BodyText>
        <ActionButton label="BMCC Campus" tone="dark" onPress={() => refreshLocation(0)} />
        <ActionButton label="Chambers Street Station" tone="dark" onPress={() => refreshLocation(1)} />
        <ActionButton label="34th Street Penn Station" tone="dark" onPress={() => refreshLocation(2)} />
      </Card>
      <Card>
        <SectionTitle>Notification Simulation</SectionTitle>
        {notifications.length ? notifications.map((item) => <KeyValue key={item.id} label={item.scope} value={item.recipient} />) : <BodyText>No simulated alerts sent yet.</BodyText>}
      </Card>
      <ScreenLink href="/future" label="Future Vision" detail="Roadmap for validated AI, wearables, campus partnerships, and public infrastructure." />
    </Screen>
  );
}
