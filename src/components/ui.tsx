import { Link, useRouter } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radii, spacing } from "../constants/theme";
import { DangerLevel } from "../models/types";

export function Screen({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
      <View style={styles.header}>
        <Text style={styles.demoPill}>DEMO MODE - NO REAL EMERGENCY CONTACT</Text>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {children}
      <BottomNav />
    </ScrollView>
  );
}

export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

export function BodyText({ children }: { children: React.ReactNode }) {
  return <Text style={styles.body}>{children}</Text>;
}

export function ActionButton({
  label,
  onPress,
  tone = "blue",
}: {
  label: string;
  onPress: () => void;
  tone?: "blue" | "green" | "yellow" | "orange" | "red" | "dark";
}) {
  const background = {
    blue: colors.blue,
    green: colors.safe,
    yellow: colors.caution,
    orange: colors.warning,
    red: colors.emergency,
    dark: colors.surfaceSoft,
  }[tone];

  return (
    <Pressable style={[styles.button, { backgroundColor: background }]} onPress={onPress}>
      <Text style={[styles.buttonText, tone === "yellow" ? styles.darkButtonText : null]}>{label}</Text>
    </Pressable>
  );
}

export function DangerBadge({ level }: { level: DangerLevel }) {
  const config = {
    0: ["Safe", colors.safe, "No active emergency."],
    1: ["Level 1 Caution", colors.caution, "Check if the user is okay."],
    2: ["Level 2 Warning", colors.warning, "Notify trusted contacts and nearby helpers."],
    3: ["Level 3 Emergency", colors.emergency, "Emergency support simulation is active."],
  } as const;
  const [label, color, detail] = config[level];

  return (
    <View style={[styles.badge, { borderColor: color }]}>
      <View style={[styles.badgeDot, { backgroundColor: color }]} />
      <View>
        <Text style={styles.badgeLabel}>{label}</Text>
        <Text style={styles.badgeDetail}>{detail}</Text>
      </View>
    </View>
  );
}

export function ScreenLink({ href, label, detail }: { href: string; label: string; detail: string }) {
  return (
    <Link href={href as never} asChild>
      <Pressable style={styles.linkCard}>
        <Text style={styles.linkTitle}>{label}</Text>
        <Text style={styles.linkDetail}>{detail}</Text>
      </Pressable>
    </Link>
  );
}

export function KeyValue({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.keyValue}>
      <Text style={styles.key}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function BottomNav() {
  const router = useRouter();
  const items = [
    ["Home", "/home"],
    ["SOS", "/sos"],
    ["AI", "/guardian"],
    ["Demo", "/demo"],
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map(([label, path]) => (
        <Pressable key={label} style={styles.navItem} onPress={() => router.push(path as never)}>
          <Text style={styles.navText}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  screenContent: {
    padding: spacing.md,
    paddingTop: 58,
    paddingBottom: 36,
    gap: spacing.md,
  },
  header: {
    gap: spacing.sm,
  },
  demoPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
    overflow: "hidden",
    backgroundColor: "#34131a",
    color: "#fecdd3",
    fontSize: 11,
    fontWeight: "900",
  },
  title: {
    color: colors.text,
    fontSize: 34,
    lineHeight: 39,
    fontWeight: "900",
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
  },
  card: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900",
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  button: {
    minHeight: 52,
    borderRadius: radii.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  buttonText: {
    color: colors.white,
    fontWeight: "900",
    fontSize: 16,
    textAlign: "center",
  },
  darkButtonText: {
    color: "#111827",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
    borderWidth: 1,
    borderRadius: radii.md,
    backgroundColor: colors.surface,
  },
  badgeDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },
  badgeLabel: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900",
  },
  badgeDetail: {
    color: colors.muted,
    marginTop: 2,
  },
  linkCard: {
    padding: spacing.md,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  linkTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "900",
  },
  linkDetail: {
    color: colors.muted,
    marginTop: 4,
    lineHeight: 20,
  },
  keyValue: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  key: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  value: {
    color: colors.text,
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
  },
  bottomNav: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  navItem: {
    flex: 1,
    minHeight: 46,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.md,
    backgroundColor: colors.surfaceSoft,
  },
  navText: {
    color: colors.text,
    fontWeight: "900",
  },
});
