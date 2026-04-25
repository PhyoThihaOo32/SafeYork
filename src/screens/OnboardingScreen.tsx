import { useRouter } from "expo-router";
import { Text, View } from "react-native";
import { ActionButton, BodyText, Card, Screen, SectionTitle, styles } from "../components/ui";
import { teamMembers } from "../data/demoData";
import { colors } from "../constants/theme";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <Screen
      title="SafeYork"
      subtitle="AI-powered personal safety for CUNY students, commuters, and caregivers."
    >
      {/* Hero tagline */}
      <View style={{ paddingVertical: 12, alignItems: "center", gap: 6 }}>
        <Text style={{ color: "#00ff88", fontSize: 11, fontWeight: "700", letterSpacing: 3, textTransform: "uppercase" }}>
          BRIDGING CRISIS AND HELP
        </Text>
        <Text style={{ color: colors.text, fontSize: 22, fontWeight: "800", textAlign: "center", letterSpacing: -0.3 }}>
          One Tap. Instant Alert.
        </Text>
        <Text style={{ color: colors.muted, fontSize: 13, textAlign: "center", lineHeight: 19, maxWidth: 320 }}>
          Emergency alerts through voice command, safety timer, or AI detection — notifying trusted contacts with your location.
        </Text>
      </View>

      {/* Challenge info */}
      <Card>
        <SectionTitle>CUNY AI Innovation Challenge 2026</SectionTitle>
        <BodyText>Track: AI for Health and Public Good</BodyText>
        <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 2 }} />
        <Text style={{ color: colors.muted, fontSize: 11, lineHeight: 16 }}>
          All emergency actions are simulated. SafeYork does not call 911 or send real SMS.
        </Text>
      </Card>

      {/* Team */}
      <Card>
        <SectionTitle>Team YangonDevs</SectionTitle>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
          {teamMembers.map((member) => (
            <View key={member} style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 6,
              borderWidth: 1,
              borderColor: "#00ff8830",
              backgroundColor: "#00ff8808",
            }}>
              <Text style={{ color: colors.text, fontSize: 12, fontWeight: "600" }}>{member}</Text>
            </View>
          ))}
        </View>
      </Card>

      {/* Single CTA */}
      <ActionButton label="Launch Demo" tone="green" onPress={() => router.push("/home")} />
    </Screen>
  );
}
