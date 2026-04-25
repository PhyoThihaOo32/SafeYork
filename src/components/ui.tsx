import { Link, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, Platform, Pressable, ScrollView, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors, radii, spacing } from "../constants/theme";
import { DangerLevel } from "../models/types";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/* ─── Falling Neon Star / Circuit Particle ─── */
function NeonParticle({ delay, startX }: { delay: number; startX: number }) {
  const translateY = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const size = 2 + Math.random() * 3;
  const duration = 4000 + Math.random() * 6000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const loop = () => {
        translateY.setValue(-20);
        opacity.setValue(0);
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT + 40,
            duration,
            easing: Easing.linear,
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.sequence([
            Animated.timing(opacity, {
              toValue: 0.7 + Math.random() * 0.3,
              duration: duration * 0.15,
              useNativeDriver: Platform.OS !== "web",
            }),
            Animated.timing(opacity, {
              toValue: 0.4,
              duration: duration * 0.6,
              useNativeDriver: Platform.OS !== "web",
            }),
            Animated.timing(opacity, {
              toValue: 0,
              duration: duration * 0.25,
              useNativeDriver: Platform.OS !== "web",
            }),
          ]),
        ]).start(() => loop());
      };
      loop();
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  const isGreen = Math.random() > 0.3;
  const color = isGreen ? "#00ff88" : "#00e5ff";

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: startX,
        top: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        transform: [{ translateY }],
        ...(Platform.OS === "web" ? { boxShadow: `0 0 ${size * 2}px ${color}` } : {}),
      }}
    />
  );
}

function CircuitLine({ delay, startX }: { delay: number; startX: number }) {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const height = 30 + Math.random() * 60;
  const duration = 5000 + Math.random() * 5000;

  useEffect(() => {
    const timeout = setTimeout(() => {
      const loop = () => {
        translateY.setValue(-100);
        opacity.setValue(0);
        Animated.parallel([
          Animated.timing(translateY, {
            toValue: SCREEN_HEIGHT + 100,
            duration,
            easing: Easing.linear,
            useNativeDriver: Platform.OS !== "web",
          }),
          Animated.sequence([
            Animated.timing(opacity, { toValue: 0.15, duration: duration * 0.2, useNativeDriver: Platform.OS !== "web" }),
            Animated.timing(opacity, { toValue: 0.08, duration: duration * 0.5, useNativeDriver: Platform.OS !== "web" }),
            Animated.timing(opacity, { toValue: 0, duration: duration * 0.3, useNativeDriver: Platform.OS !== "web" }),
          ]),
        ]).start(() => loop());
      };
      loop();
    }, delay);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Animated.View
      style={{
        position: "absolute",
        left: startX,
        top: 0,
        width: 1,
        height,
        backgroundColor: "#00ff88",
        opacity,
        transform: [{ translateY }],
      }}
    />
  );
}

function FallingNeonField() {
  const particles = useRef(
    Array.from({ length: 25 }, (_, i) => ({
      id: `p-${i}`,
      delay: Math.random() * 8000,
      startX: Math.random() * SCREEN_WIDTH,
    }))
  ).current;

  const lines = useRef(
    Array.from({ length: 8 }, (_, i) => ({
      id: `l-${i}`,
      delay: Math.random() * 10000,
      startX: Math.random() * SCREEN_WIDTH,
    }))
  ).current;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {lines.map((l) => (
        <CircuitLine key={l.id} delay={l.delay} startX={l.startX} />
      ))}
      {particles.map((p) => (
        <NeonParticle key={p.id} delay={p.delay} startX={p.startX} />
      ))}
    </View>
  );
}

/* ─── Scan Line Effect ─── */
function ScanLine() {
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = () => {
      translateY.setValue(0);
      Animated.timing(translateY, {
        toValue: SCREEN_HEIGHT,
        duration: 8000,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== "web",
      }).start(() => loop());
    };
    loop();
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 1,
        backgroundColor: "#00ff8815",
        transform: [{ translateY }],
        ...(Platform.OS === "web" ? { boxShadow: "0 0 20px 4px #00ff8810" } : {}),
      }}
    />
  );
}

/* ─── Screen Wrapper ─── */
export function Screen({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <FallingNeonField />
      <ScanLine />
      <ScrollView style={styles.screen} contentContainerStyle={styles.screenContent}>
        <View style={styles.header}>
          <Text style={styles.demoPill}>DEMO MODE</Text>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
        {children}
        <BottomNav />
      </ScrollView>
    </View>
  );
}

/* ─── Card ─── */
export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

/* ─── Section Title ─── */
export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <View style={{ width: 3, height: 18, backgroundColor: "#00ff88", borderRadius: 2 }} />
      <Text style={styles.sectionTitle}>{children}</Text>
    </View>
  );
}

/* ─── Body Text ─── */
export function BodyText({ children }: { children: React.ReactNode }) {
  return <Text style={styles.body}>{children}</Text>;
}

/* ─── Action Button ─── */
export function ActionButton({
  label,
  onPress,
  tone = "blue",
}: {
  label: string;
  onPress: () => void;
  tone?: "blue" | "green" | "yellow" | "orange" | "red" | "dark";
}) {
  const config: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: "transparent", border: colors.blue, text: colors.blue },
    green: { bg: "transparent", border: "#00ff88", text: "#00ff88" },
    yellow: { bg: "transparent", border: colors.caution, text: colors.caution },
    orange: { bg: "transparent", border: colors.warning, text: colors.warning },
    red: { bg: colors.emergency, border: colors.emergency, text: colors.white },
    dark: { bg: "transparent", border: colors.border, text: colors.muted },
  };
  const c = config[tone] || config.blue;

  return (
    <Pressable
      style={[styles.button, { backgroundColor: c.bg, borderWidth: 1, borderColor: c.border }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: c.text }]}>{label}</Text>
    </Pressable>
  );
}

/* ─── Danger Badge ─── */
export function DangerBadge({ level }: { level: DangerLevel }) {
  const config = {
    0: ["Safe", "#00ff88", "System nominal."],
    1: ["Caution", colors.caution, "Monitoring active."],
    2: ["Warning", colors.warning, "Contacts alerted."],
    3: ["Emergency", colors.emergency, "Full response active."],
  } as const;
  const [label, color, detail] = config[level];

  return (
    <View style={[styles.badge, { borderColor: color + "40" }]}>
      <View style={styles.badgeDotOuter}>
        <PulseDot color={color as string} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.badgeLabel, { color: color as string }]}>{label}</Text>
        <Text style={styles.badgeDetail}>{detail}</Text>
      </View>
      <Text style={{ color: color as string, fontSize: 11, fontWeight: "700", letterSpacing: 1 }}>LVL {level}</Text>
    </View>
  );
}

function PulseDot({ color }: { color: string }) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = () => {
      scale.setValue(1);
      opacity.setValue(1);
      Animated.parallel([
        Animated.timing(scale, { toValue: 2.2, duration: 1200, useNativeDriver: Platform.OS !== "web" }),
        Animated.timing(opacity, { toValue: 0, duration: 1200, useNativeDriver: Platform.OS !== "web" }),
      ]).start(() => loop());
    };
    loop();
  }, []);

  return (
    <View style={{ width: 12, height: 12, alignItems: "center", justifyContent: "center" }}>
      <Animated.View
        style={{
          position: "absolute",
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: color + "40",
          transform: [{ scale }],
          opacity,
        }}
      />
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
    </View>
  );
}

/* ─── Screen Link ─── */
export function ScreenLink({ href, label, detail }: { href: string; label: string; detail: string }) {
  return (
    <Link href={href as never} asChild>
      <Pressable style={styles.linkCard}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <Text style={{ color: "#00ff88", fontSize: 10, fontWeight: "700" }}>{">"}</Text>
          <Text style={styles.linkTitle}>{label}</Text>
        </View>
        <Text style={styles.linkDetail}>{detail}</Text>
      </Pressable>
    </Link>
  );
}

/* ─── Key Value ─── */
export function KeyValue({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.keyValue}>
      <Text style={styles.key}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

/* ─── Bottom Nav ─── */
function BottomNav() {
  const router = useRouter();
  const items: [string, string, string][] = [
    ["Home", "/home", "◉"],
    ["SOS", "/sos", "⚠"],
    ["AI", "/guardian", "◈"],
    ["Demo", "/demo", "▶"],
  ];

  return (
    <View style={styles.bottomNav}>
      {items.map(([label, path, icon]) => (
        <Pressable key={label} style={styles.navItem} onPress={() => router.push(path as never)}>
          <Text style={{ color: label === "SOS" ? colors.emergency : "#00ff88", fontSize: 16 }}>{icon}</Text>
          <Text style={styles.navText}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

/* ─── Styles ─── */
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  screenContent: {
    padding: spacing.md,
    paddingTop: 52,
    paddingBottom: 36,
    gap: 14,
  },
  header: {
    gap: 6,
    marginBottom: 8,
  },
  demoPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    overflow: "hidden",
    backgroundColor: "#00ff8818",
    color: "#00ff88",
    fontSize: 9,
    fontWeight: "700",
    letterSpacing: 2,
  },
  title: {
    color: colors.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    padding: 14,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card + "cc",
    gap: 10,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  body: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 19,
  },
  button: {
    minHeight: 44,
    borderRadius: radii.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 14,
    textAlign: "center",
    letterSpacing: 0.3,
  },
  darkButtonText: {
    color: "#111827",
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
  },
  badgeDotOuter: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeLabel: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  badgeDetail: {
    color: colors.muted,
    fontSize: 11,
    marginTop: 1,
  },
  linkCard: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    gap: 3,
  },
  linkTitle: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
  },
  linkDetail: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    paddingLeft: 18,
  },
  keyValue: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  key: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    gap: 6,
    paddingTop: spacing.lg,
    marginTop: 8,
  },
  navItem: {
    flex: 1,
    minHeight: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radii.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 2,
  },
  navText: {
    color: colors.muted,
    fontWeight: "700",
    fontSize: 10,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
