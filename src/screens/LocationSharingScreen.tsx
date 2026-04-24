import { Text, View } from "react-native";
import { ActionButton, BodyText, Card, KeyValue, Screen, SectionTitle } from "../components/ui";
import { colors } from "../constants/theme";
import { demoLocations } from "../data/demoData";
import { useSafeBeacon } from "../state/SafeBeaconContext";

export default function LocationSharingScreen() {
  const { location, refreshLocation } = useSafeBeacon();

  return (
    <Screen title="Location Sharing" subtitle="Uses Expo Location when available, with a simulated fallback for reliable demos.">
      <Card>
        <SectionTitle>Map-Style Location Card</SectionTitle>
        <View style={{ height: 190, borderRadius: 18, backgroundColor: "#102a48", borderWidth: 1, borderColor: colors.border, padding: 14, justifyContent: "space-between" }}>
          <Text style={{ color: colors.text, fontSize: 18, fontWeight: "900" }}>{location.name}</Text>
          <Text style={{ color: colors.blue, fontSize: 42, fontWeight: "900", textAlign: "center" }}>BEACON</Text>
          <Text style={{ color: colors.muted }}>Safe zone marker | Helper area | Campus security point</Text>
        </View>
        <KeyValue label="Source" value={location.source} />
        <KeyValue label="Coordinates" value={`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`} />
        <KeyValue label="Map link" value={location.mapLink} />
        <ActionButton label="Try GPS or Fallback" tone="blue" onPress={() => refreshLocation()} />
      </Card>
      <Card>
        <SectionTitle>Simulated Safe Route / Nearby Area</SectionTitle>
        {demoLocations.map((item, index) => (
          <ActionButton key={item.name} label={item.name} tone="dark" onPress={() => refreshLocation(index)} />
        ))}
        <BodyText>Static pins represent campus security, hospital placeholder, police station placeholder, 24-hour business, safe zone, and opted-in helper area.</BodyText>
      </Card>
    </Screen>
  );
}
