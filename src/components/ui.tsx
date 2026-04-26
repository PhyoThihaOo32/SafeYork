import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radii, spacing } from "../constants/theme";
import { DangerLevel } from "../models/types";

export function Screen({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <View style={styles.screen}>
      <PlexusBackground />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <Text style={styles.demoPill}>DEMO MODE - NO REAL EMERGENCY CONTACT</Text>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {children}
        <BottomNav />
      </ScrollView>
    </View>
  );
}

const SHARED_PLEXUS_POINTS = [
  { x: 26, y: 92, size: 4, delay: 0, dx: 8, dy: -6 },
  { x: 104, y: 132, size: 5, delay: 240, dx: -10, dy: 8 },
  { x: 194, y: 86, size: 4, delay: 480, dx: 9, dy: 7 },
  { x: 306, y: 158, size: 5, delay: 720, dx: -8, dy: -8 },
  { x: 64, y: 310, size: 5, delay: 180, dx: 10, dy: 9 },
  { x: 148, y: 266, size: 4, delay: 520, dx: -7, dy: 10 },
  { x: 252, y: 326, size: 5, delay: 860, dx: 9, dy: -7 },
  { x: 336, y: 276, size: 4, delay: 1100, dx: -10, dy: 8 },
  { x: 42, y: 560, size: 4, delay: 360, dx: 8, dy: -9 },
  { x: 128, y: 620, size: 5, delay: 700, dx: -9, dy: 7 },
  { x: 230, y: 574, size: 4, delay: 1040, dx: 10, dy: 8 },
  { x: 316, y: 644, size: 5, delay: 1300, dx: -8, dy: -10 },
];

const SHARED_PLEXUS_LINES = [
  { left: 30, top: 102, width: 84, rotate: "24deg", delay: 0 },
  { left: 104, top: 124, width: 96, rotate: "-24deg", delay: 220 },
  { left: 190, top: 94, width: 130, rotate: "34deg", delay: 440 },
  { left: 62, top: 302, width: 92, rotate: "-28deg", delay: 120 },
  { left: 146, top: 274, width: 116, rotate: "28deg", delay: 520 },
  { left: 250, top: 318, width: 92, rotate: "-32deg", delay: 820 },
  { left: 42, top: 568, width: 96, rotate: "34deg", delay: 260 },
  { left: 126, top: 612, width: 112, rotate: "-26deg", delay: 680 },
  { left: 228, top: 584, width: 106, rotate: "36deg", delay: 1040 },
];

function PlexusBackground() {
  const drift = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0.28)).current;

  useEffect(() => {
    const driftAnim = Animated.loop(Animated.sequence([
      Animated.timing(drift, { toValue: 1, duration: 6800, useNativeDriver: true }),
      Animated.timing(drift, { toValue: 0, duration: 6200, useNativeDriver: true }),
    ]));
    const pulseAnim = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 2400, useNativeDriver: true }),
      Animated.timing(pulse, { toValue: 0.28, duration: 3200, useNativeDriver: true }),
    ]));
    driftAnim.start();
    pulseAnim.start();
    return () => {
      driftAnim.stop();
      pulseAnim.stop();
    };
  }, [drift, pulse]);

  const translateX = drift.interpolate({ inputRange: [0, 1], outputRange: [-10, 12] });
  const translateY = drift.interpolate({ inputRange: [0, 1], outputRange: [8, -10] });
  const lineOpacity = pulse.interpolate({ inputRange: [0.28, 1], outputRange: [0.10, 0.28] });
  const nodeOpacity = pulse.interpolate({ inputRange: [0.28, 1], outputRange: [0.34, 0.92] });

  return (
    <View pointerEvents="none" style={styles.plexusLayer}>
      <Animated.View style={[styles.plexusGlow, styles.plexusGlowTop, { opacity: pulse }]} />
      <Animated.View style={[styles.plexusGlow, styles.plexusGlowBottom, { opacity: pulse }]} />
      <Animated.View style={[styles.plexusDrift, { transform: [{ translateX }, { translateY }] }]}>
        {SHARED_PLEXUS_LINES.map((line, index) => (
          <Animated.View
            key={`line-${index}`}
            style={[
              styles.plexusLine,
              {
                left: line.left,
                top: line.top,
                width: line.width,
                opacity: lineOpacity,
                transform: [{ rotate: line.rotate }],
              },
            ]}
          />
        ))}
        {SHARED_PLEXUS_POINTS.map((point, index) => {
          const halo = point.size * 7;
          return (
            <Animated.View
              key={`point-${index}`}
              style={[
                styles.plexusNode,
                {
                  left: point.x - halo / 2,
                  top: point.y - halo / 2,
                  width: halo,
                  height: halo,
                  opacity: nodeOpacity,
                },
              ]}
            >
              <View style={[styles.plexusNodeHalo, { width: halo, height: halo, borderRadius: halo / 2 }]} />
              <View style={[styles.plexusNodeCore, { width: point.size, height: point.size, borderRadius: point.size / 2 }]} />
            </Animated.View>
          );
        })}
      </Animated.View>
    </View>
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
    overflow: "hidden",
  },
  scroll: {
    flex: 1,
    backgroundColor: "transparent",
  },
  plexusLayer: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  plexusDrift: {
    ...StyleSheet.absoluteFillObject,
  },
  plexusGlow: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(96,165,250,0.12)",
    shadowColor: colors.blue,
    shadowOpacity: 0.28,
    shadowRadius: 70,
    shadowOffset: { width: 0, height: 0 },
  },
  plexusGlowTop: {
    top: -76,
    right: -116,
  },
  plexusGlowBottom: {
    bottom: 48,
    left: -128,
    backgroundColor: "rgba(34,197,94,0.09)",
    shadowColor: colors.safe,
  },
  plexusLine: {
    position: "absolute",
    height: StyleSheet.hairlineWidth,
    borderRadius: 1,
    backgroundColor: "rgba(96,230,255,0.95)",
  },
  plexusNode: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  plexusNodeHalo: {
    position: "absolute",
    backgroundColor: "rgba(96,230,255,0.14)",
  },
  plexusNodeCore: {
    backgroundColor: "#9af7ff",
    shadowColor: "#60e6ff",
    shadowOpacity: 0.9,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 0 },
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
