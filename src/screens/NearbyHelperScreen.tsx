import { ActionButton, BodyText, Card, KeyValue, Screen, SectionTitle } from "../components/ui";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function NearbyHelperScreen() {
  const { helperOptIn, toggleHelperOptIn, notifications } = useSafeBeacon();

  return (
    <Screen title="Nearby Helper Network" subtitle="Helpers must consent before receiving any simulated nearby emergency alerts.">
      <Card>
        <SectionTitle>Consent System</SectionTitle>
        <KeyValue label="Helper participation" value={helperOptIn ? "Opted in" : "Opted out"} />
        <BodyText>Nearby helpers receive limited information only: approximate area, danger level, and privacy-safe response instructions.</BodyText>
        <ActionButton label={helperOptIn ? "Opt Out" : "Opt In as Nearby Helper"} tone={helperOptIn ? "orange" : "green"} onPress={toggleHelperOptIn} />
      </Card>
      <Card>
        <SectionTitle>Simulated Helper Alerts</SectionTitle>
        {notifications.filter((item) => item.scope === "Nearby Helper").length ? (
          notifications.filter((item) => item.scope === "Nearby Helper").map((item) => (
            <KeyValue key={item.id} label={item.recipient} value={item.message} />
          ))
        ) : (
          <BodyText>No nearby helper alert is active.</BodyText>
        )}
      </Card>
    </Screen>
  );
}
