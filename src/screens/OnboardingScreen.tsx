import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ActionButton, BodyText, Card, Screen, SectionTitle, styles } from "../components/ui";
import { teamMembers } from "../data/demoData";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen
      title="SafeBeacon"
      subtitle="AI-powered personal safety for CUNY students, commuters, caregivers, and people who need fast support in unsafe or medical emergencies."
    >
      <Card>
        <SectionTitle>CUNY AI Innovation Challenge 2026</SectionTitle>
        <BodyText>Track: AI for Health and Public Good</BodyText>
        <BodyText>All emergency actions in this app are simulated. SafeBeacon does not call 911, police, strangers, or send real SMS.</BodyText>
      </Card>
      <Card>
        <SectionTitle>Team</SectionTitle>
        {teamMembers.map((member) => (
          <Text key={member} style={styles.body}>{member}</Text>
        ))}
      </Card>
      <View style={{ gap: 10 }}>
        <ActionButton label="Start Demo App" tone="red" onPress={() => router.push("/home")} />
        <ActionButton label="Open Demo Controls" tone="dark" onPress={() => router.push("/demo")} />
      </View>
    </Screen>
  );
}
