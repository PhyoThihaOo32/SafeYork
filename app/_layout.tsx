import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeYorkProvider } from "../src/state/SafeYorkContext";
import { colors } from "../src/constants/theme";

export default function RootLayout() {
  return (
    <SafeYorkProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </SafeYorkProvider>
  );
}
