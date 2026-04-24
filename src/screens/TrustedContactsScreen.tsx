import { useState } from "react";
import { TextInput, View } from "react-native";
import { ActionButton, BodyText, Card, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function TrustedContactsScreen() {
  const { contacts, addContact } = useSafeBeacon();
  const [name, setName] = useState("Guardian Contact");
  const [relationship, setRelationship] = useState("Family");
  const [email, setEmail] = useState("guardian@example.com");

  return (
    <Screen title="Trusted Contacts" subtitle="Contacts receive detailed simulated emergency information. Phone numbers stay masked.">
      <Card>
        <SectionTitle>Add Trusted Contact</SectionTitle>
        {[["Name", name, setName], ["Relationship", relationship, setRelationship], ["Email", email, setEmail]].map(([label, value, setter]) => (
          <TextInput
            key={label as string}
            value={value as string}
            onChangeText={setter as (text: string) => void}
            placeholder={label as string}
            placeholderTextColor={colors.muted}
            style={{ color: colors.text, backgroundColor: colors.surface, borderRadius: 14, padding: 12, borderColor: colors.border, borderWidth: 1 }}
          />
        ))}
        <ActionButton
          label="Add Contact Locally"
          tone="blue"
          onPress={() =>
            addContact({
              id: `contact-${Date.now()}`,
              name,
              relationship,
              phone: "•••-•••-1234",
              email,
              priority: "Backup",
              favorite: false,
              shareMedical: false,
            })
          }
        />
      </Card>
      {contacts.map((contact) => (
        <Card key={contact.id}>
          <SectionTitle>{contact.name}</SectionTitle>
          <KeyValue label="Relationship" value={contact.relationship} />
          <KeyValue label="Phone" value={contact.phone} />
          <KeyValue label="Email" value={contact.email} />
          <KeyValue label="Priority" value={contact.priority} />
          <KeyValue label="Medical sharing" value={contact.shareMedical ? "Allowed" : "Not allowed"} />
        </Card>
      ))}
      <BodyText>SafeBeacon never displays home address or full phone numbers in public helper views.</BodyText>
    </Screen>
  );
}
