import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeBeaconProvider } from "../src/state/SafeBeaconContext";
import { colors } from "../src/constants/theme";

export default function RootLayout() {
  return (
    <SafeBeaconProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </SafeBeaconProvider>
  );
}
