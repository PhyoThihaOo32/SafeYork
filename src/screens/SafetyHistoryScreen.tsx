import { Card, DangerBadge, KeyValue, Screen, SectionTitle } from "../components/ui";
import { useSafeYork } from "../state/SafeYorkContext";

export default function SafetyHistoryScreen() {
  const { history } = useSafeYork();

  return (
    <Screen title="Safety History" subtitle="Newest events first. All demo actions are logged for accountability and presentation review.">
      {history.map((event) => (
        <Card key={event.id}>
          <SectionTitle>{event.type}</SectionTitle>
          <DangerBadge level={event.dangerLevel} />
          <KeyValue label="Time" value={event.timestamp} />
          <KeyValue label="Detail" value={event.detail} />
        </Card>
      ))}
    </Screen>
  );
}
