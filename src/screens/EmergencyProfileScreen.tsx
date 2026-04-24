import { TextInput } from "react-native";
import { ActionButton, BodyText, Card, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function EmergencyProfileScreen() {
  const { contacts, medicalNotes, setMedicalNotes, shareMedical, toggleMedicalSharing, logEvent } = useSafeBeacon();
  const primary = contacts[0];

  return (
    <Screen title="Emergency Profile" subtitle="Privacy-safe information for trusted contacts if the user cannot communicate.">
      <Card>
        <SectionTitle>Visible Emergency Info</SectionTitle>
        <KeyValue label="Name shown" value="CUNY Student" />
        <KeyValue label="Allergy note" value="Penicillin allergy" />
        <KeyValue label="Emergency contact" value={primary?.name ?? "No contact added"} />
        <KeyValue label="Masked phone" value={primary?.phone ?? "Hidden"} />
        <BodyText>Home address and private notes are not displayed.</BodyText>
      </Card>
      <Card>
        <SectionTitle>Medical Notes Permission</SectionTitle>
        <KeyValue label="Share during emergencies" value={shareMedical ? "Enabled for trusted contacts" : "Disabled"} />
        <TextInput
          value={medicalNotes}
          onChangeText={setMedicalNotes}
          multiline
          placeholder="Medical notes"
          placeholderTextColor={colors.muted}
          style={{ minHeight: 90, color: colors.text, backgroundColor: colors.surface, borderRadius: 14, padding: 12, borderColor: colors.border, borderWidth: 1 }}
        />
        <ActionButton label={shareMedical ? "Disable Medical Sharing" : "Enable Medical Sharing"} tone="orange" onPress={toggleMedicalSharing} />
        <ActionButton label="Simulated Call Trusted Contact" tone="dark" onPress={() => logEvent("Trusted contact call simulation", 0, `Demo call button pressed for ${primary?.name ?? "trusted contact"}. No real call placed.`)} />
      </Card>
    </Screen>
  );
}
