import { BodyText, Card, Screen, SectionTitle } from "../components/ui";
import { roadmap } from "../data/demoData";

export default function FutureVisionScreen() {
  return (
    <Screen title="Future Vision" subtitle="How SafeYork could grow after the hackathon while keeping privacy, consent, and safety first.">
      {roadmap.map((phase) => (
        <Card key={phase.phase}>
          <SectionTitle>{phase.phase}</SectionTitle>
          {phase.items.map((item) => (
            <BodyText key={item}>• {item}</BodyText>
          ))}
        </Card>
      ))}
      <Card>
        <SectionTitle>Important Boundary</SectionTitle>
        <BodyText>This demo is not a production emergency system. Real emergency integrations would require validation, legal review, privacy review, campus/community partnerships, and rigorous safety testing.</BodyText>
      </Card>
    </Screen>
  );
}
