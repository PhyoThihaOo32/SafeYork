import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { c, DANGER, DangerLevel, f } from "../src/theme";

// ─── Animation hooks ──────────────────────────────────────────────────────────

function usePulse(active = true, duration = 1200) {
  const v = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!active) { v.setValue(1); return; }
    const a = Animated.loop(Animated.sequence([
      Animated.timing(v, { toValue: 0.3, duration, useNativeDriver: true }),
      Animated.timing(v, { toValue: 1, duration, useNativeDriver: true }),
    ]));
    a.start(); return () => a.stop();
  }, [active, duration]);
  return v;
}

function usePing(active = true, delay = 0) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) { scale.setValue(1); opacity.setValue(0); return; }
    const a = Animated.loop(Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(scale, { toValue: 2.5, duration: 1800, useNativeDriver: true }),
        Animated.sequence([
          Animated.timing(opacity, { toValue: 0.6, duration: 200, useNativeDriver: true }),
          Animated.timing(opacity, { toValue: 0, duration: 1600, useNativeDriver: true }),
        ]),
      ]),
      Animated.parallel([
        Animated.timing(scale, { toValue: 1, duration: 0, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0, duration: 0, useNativeDriver: true }),
      ]),
    ]));
    a.start(); return () => a.stop();
  }, [active, delay]);
  return { scale, opacity };
}

function useSpin(active = true) {
  const r = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) return;
    const a = Animated.loop(Animated.timing(r, { toValue: 1, duration: 4000, useNativeDriver: true }));
    a.start(); return () => a.stop();
  }, [active]);
  return r.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "360deg"] });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const [dangerLevel, setDangerLevel] = useState<DangerLevel>(0);
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [heartRate, setHeartRate] = useState(72);
  const [bodyTemp, setBodyTemp] = useState(98.6);
  const [voiceStress, setVoiceStress] = useState(12);
  const [motionPattern, setMotionPattern] = useState("NORMAL");
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  const [detectionTrigger, setDetectionTrigger] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [tapCount, setTapCount] = useState(0);
  const [alertLevel, setAlertLevel] = useState<"none" | "contacts" | "nearby" | "authorities">("none");
  const [nearbyRange, setNearbyRange] = useState(1);
  const [lastTapTime, setLastTapTime] = useState(0);

  const d = DANGER[dangerLevel];

  useEffect(() => {
    const id = setInterval(() => {
      if (isSOSActive) return;
      setHeartRate(v => Math.max(60, Math.min(95, v + Math.floor(Math.random() * 8 - 4))));
      setBodyTemp(v => parseFloat((v + (Math.random() * 0.2 - 0.1)).toFixed(1)));
      setVoiceStress(v => Math.max(0, Math.min(30, v + Math.floor(Math.random() * 6 - 3))));
    }, 2000);
    return () => clearInterval(id);
  }, [isSOSActive]);

  useEffect(() => {
    if (isSOSActive) return;
    let trigger = "";
    let msg = "";
    if (heartRate >= 200) { trigger = "HEART RATE"; msg = `Tachycardia detected — ${heartRate} BPM`; }
    else if (bodyTemp >= 103) { trigger = "BODY TEMP"; msg = `Hyperthermia detected — ${bodyTemp}°F`; }
    else if (voiceStress >= 85) { trigger = "VOICE"; msg = "Extreme distress in voice patterns"; }
    else if (motionPattern === "FALL" || motionPattern === "SEIZURE") { trigger = motionPattern; msg = `${motionPattern} detected`; }
    if (trigger) {
      setAiAnalyzing(true);
      setDetectionTrigger(trigger);
      setAlertMessage(msg);
      setTimeout(() => {
        setAiAnalyzing(false);
        setIsSOSActive(true);
        setDangerLevel(3);
        setAlertLevel("authorities");
      }, 2000);
    }
  }, [heartRate, bodyTemp, voiceStress, motionPattern, isSOSActive]);

  function handleSOS() {
    const now = Date.now();
    const next = now - lastTapTime > 3000 && tapCount === 0 ? 1 : tapCount + 1;
    setTapCount(next);
    setLastTapTime(now);
    setIsSOSActive(true);
    setDetectionTrigger("manual");
    if (next >= 9) {
      setAlertLevel("authorities"); setDangerLevel(3);
      setAlertMessage("Emergency services and local authorities notified.");
    } else if (next >= 6) {
      setAlertLevel("nearby"); setDangerLevel(2);
      setAlertMessage(`Broadcasting to nearby users within ${nearbyRange} mile.`);
    } else if (next >= 3) {
      setAlertLevel("contacts"); setDangerLevel(1);
      setAlertMessage("Alerting 3 trusted contacts with your location.");
    } else {
      setDangerLevel(0);
      setAlertMessage(`Tap ${3 - next} more time${3 - next > 1 ? "s" : ""} to alert trusted contacts.`);
    }
  }

  function handleMarkSafe() {
    setIsSOSActive(false); setDangerLevel(0); setAlertLevel("none");
    setTapCount(0); setDetectionTrigger(null); setAlertMessage("");
    setAiAnalyzing(false); setLastTapTime(0);
    setHeartRate(72); setBodyTemp(98.6); setVoiceStress(12); setMotionPattern("NORMAL");
  }

  return (
    <SafeAreaView style={s.screen} edges={["top", "bottom"]}>
      {aiAnalyzing && <AIOverlay message={alertMessage} spin={useSpin(aiAnalyzing)} />}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

        {/* ── Header ── */}
        <View style={s.header}>
          <View>
            <Text style={[s.wordmark, { color: d.color, shadowColor: d.glow }]}>SAFEYORK</Text>
            <Text style={s.location}>◎  Manhattan, NY</Text>
          </View>
          <StatusDot level={dangerLevel} isActive={isSOSActive} />
        </View>

        <View style={s.divider} />

        {/* ── System status ── */}
        <StatusStrip level={dangerLevel} isActive={isSOSActive} trigger={detectionTrigger} />

        <View style={s.divider} />

        {/* ── SOS ── */}
        <SOSButton
          tapCount={tapCount}
          dangerLevel={dangerLevel}
          isActive={isSOSActive}
          onPress={handleSOS}
        />

        <View style={s.divider} />

        {/* ── Biometrics ── */}
        <BiometricsRow
          heartRate={heartRate}
          bodyTemp={bodyTemp}
          voiceStress={voiceStress}
          motionPattern={motionPattern}
        />

        <View style={s.divider} />

        {/* ── Alert escalation ── */}
        {tapCount >= 3 && (
          <>
            <AlertSection
              tapCount={tapCount}
              alertLevel={alertLevel}
              alertMessage={alertMessage}
              nearbyRange={nearbyRange}
              setNearbyRange={setNearbyRange}
              onMarkSafe={handleMarkSafe}
            />
            <View style={s.divider} />
          </>
        )}

        {/* ── Guardian AI ── */}
        <GuardianPanel
          isActive={isSOSActive}
          onPanic={() => { setHeartRate(210); setVoiceStress(90); setBodyTemp(99.2); }}
          onFall={() => setMotionPattern("FALL")}
          onHeat={() => { setBodyTemp(104.5); setHeartRate(125); }}
        />

        <View style={s.divider} />

        {/* ── Contacts ── */}
        <ContactsPanel />

        <View style={s.divider} />

        {/* ── Activity ── */}
        <ActivityPanel />

      </ScrollView>
    </SafeAreaView>
  );
}

// ─── AI Overlay ───────────────────────────────────────────────────────────────

function AIOverlay({ message, spin }: { message: string; spin: Animated.AnimatedInterpolation<string> }) {
  const blink = usePulse(true, 700);
  return (
    <View style={s.aiOverlay}>
      <View style={s.aiInner}>
        <Animated.Text style={[s.aiGlyph, { transform: [{ rotate: spin }] }]}>◎</Animated.Text>
        <Animated.Text style={[s.aiTitle, { opacity: blink }]}>AI ANALYZING</Animated.Text>
        <Text style={s.aiSub}>THREAT ASSESSMENT IN PROGRESS</Text>
        <Text style={s.aiMsg}>{message}</Text>
      </View>
    </View>
  );
}

// ─── Status dot ───────────────────────────────────────────────────────────────

function StatusDot({ level, isActive }: { level: DangerLevel; isActive: boolean }) {
  const d = DANGER[level];
  const pulse = usePulse(isActive, 900);
  return (
    <Animated.View style={[s.statusDot, { backgroundColor: d.color, shadowColor: d.glow, opacity: isActive ? pulse : 1 }]} />
  );
}

// ─── Status strip ─────────────────────────────────────────────────────────────

function StatusStrip({ level, isActive, trigger }: {
  level: DangerLevel; isActive: boolean; trigger: string | null;
}) {
  const d = DANGER[level];
  const pulse = usePulse(isActive, 1000);
  return (
    <View style={s.statusStrip}>
      <View style={s.statusLeft}>
        <Animated.View style={[s.statusBar, { backgroundColor: d.color, shadowColor: d.glow, opacity: isActive ? pulse : 0.6 }]} />
        <View>
          <Text style={s.statusLabel}>SYSTEM STATUS</Text>
          <Text style={[s.statusLevel, { color: d.color, shadowColor: d.glow }]}>{d.label}</Text>
        </View>
      </View>
      {isActive && trigger && (
        <View style={[s.triggerPill, { borderColor: d.color }]}>
          <Text style={[s.triggerText, { color: d.color }]}>{trigger}</Text>
        </View>
      )}
    </View>
  );
}

// ─── SOS Button ───────────────────────────────────────────────────────────────

function SOSButton({ tapCount, dangerLevel, isActive, onPress }: {
  tapCount: number; dangerLevel: DangerLevel; isActive: boolean; onPress: () => void;
}) {
  const d = DANGER[dangerLevel];
  const ring1 = usePing(isActive, 0);
  const ring2 = usePing(isActive, 600);
  const ring3 = usePing(isActive, 1200);
  const btnScale = useRef(new Animated.Value(1)).current;

  function onPressIn() {
    Animated.spring(btnScale, { toValue: 0.94, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  }
  function onPressOut() {
    Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 28, bounciness: 10 }).start();
  }

  const label = tapCount >= 9 ? "POLICE" : tapCount >= 6 ? "NEARBY" : tapCount >= 3 ? "CONTACTS" : "SOS";
  const sub = tapCount >= 3 ? `LEVEL ${dangerLevel} · ACTIVE` : "HOLD TO ACTIVATE";

  return (
    <View style={s.sosWrap}>
      {[ring1, ring2, ring3].map((r, i) => (
        <Animated.View
          key={i}
          pointerEvents="none"
          style={[s.sosRing, { borderColor: d.color, transform: [{ scale: r.scale }], opacity: r.opacity, shadowColor: d.glow }]}
        />
      ))}

      <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[s.sosBtn, { borderColor: d.color, shadowColor: d.glow, transform: [{ scale: btnScale }] }]}>
          {tapCount > 0 && (
            <Text style={[s.tapCount, { color: d.color }]}>{tapCount}</Text>
          )}
          <Text style={[s.sosLabel, { color: d.color, shadowColor: d.glow }]}>{label}</Text>
          <Text style={s.sosSub}>{sub}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

// ─── Biometrics ───────────────────────────────────────────────────────────────

function BiometricsRow({ heartRate, bodyTemp, voiceStress, motionPattern }: {
  heartRate: number; bodyTemp: number; voiceStress: number; motionPattern: string;
}) {
  const metrics = [
    {
      value: `${heartRate}`, unit: "BPM", label: "HEART",
      color: heartRate >= 200 ? c.pink : heartRate >= 100 ? c.yellow : c.green,
      alert: heartRate >= 200,
    },
    {
      value: bodyTemp.toFixed(1), unit: "°F", label: "TEMP",
      color: bodyTemp >= 103 ? c.pink : bodyTemp >= 100 ? c.yellow : c.blue,
      alert: bodyTemp >= 103,
    },
    {
      value: `${voiceStress}`, unit: "%", label: "VOICE",
      color: voiceStress >= 85 ? c.pink : voiceStress >= 50 ? c.yellow : c.green,
      alert: voiceStress >= 85,
    },
    {
      value: motionPattern, unit: "", label: "MOTION",
      color: motionPattern === "FALL" || motionPattern === "SEIZURE" ? c.pink : c.green,
      alert: motionPattern === "FALL" || motionPattern === "SEIZURE",
    },
  ];

  return (
    <View style={s.bioRow}>
      {metrics.map((m, i) => {
        const alertPulse = usePulse(m.alert, 500);
        return (
          <View key={m.label} style={[s.bioCell, i < metrics.length - 1 && s.bioCellBorder]}>
            <Animated.Text style={[s.bioValue, { color: m.color, shadowColor: m.color }, m.alert && { opacity: alertPulse }]}>
              {m.value}
              {m.unit ? <Text style={s.bioUnit}>{m.unit}</Text> : null}
            </Animated.Text>
            <Text style={s.bioLabel}>{m.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

// ─── Alert section ────────────────────────────────────────────────────────────

function AlertSection({ tapCount, alertLevel, alertMessage, nearbyRange, setNearbyRange, onMarkSafe }: {
  tapCount: number; alertLevel: string; alertMessage: string;
  nearbyRange: number; setNearbyRange: (v: number) => void; onMarkSafe: () => void;
}) {
  const STAGES = [
    { threshold: 3, label: "CONTACTS", color: c.yellow, glow: c.yellowGlow },
    { threshold: 6, label: "NEARBY",   color: c.orange, glow: c.orangeGlow },
    { threshold: 9, label: "POLICE",   color: c.pink,   glow: c.pinkGlow   },
  ];
  const alertColor = tapCount >= 9 ? c.pink : tapCount >= 6 ? c.orange : c.yellow;

  return (
    <View style={s.alertSection}>
      {/* Stage pills */}
      <View style={s.stagePills}>
        {STAGES.map((stage) => {
          const active = tapCount >= stage.threshold;
          return (
            <View
              key={stage.label}
              style={[
                s.stagePill,
                { borderColor: active ? stage.color : c.borderMid },
                active && { shadowColor: stage.glow, shadowOpacity: 0.8, shadowRadius: 10 },
              ]}
            >
              <Text style={[s.stagePillText, { color: active ? stage.color : c.textDim }]}>
                {stage.label}
              </Text>
            </View>
          );
        })}
      </View>

      {/* Message */}
      <View style={[s.alertMsg, { borderLeftColor: alertColor }]}>
        <Text style={[s.alertMsgTitle, { color: alertColor }]}>
          {alertLevel === "authorities" ? "EMERGENCY SERVICES NOTIFIED"
            : alertLevel === "nearby" ? "BROADCASTING TO NEARBY USERS"
            : "TRUSTED CONTACTS ALERTED"}
        </Text>
        <Text style={s.alertMsgBody}>{alertMessage}</Text>
      </View>

      {/* Range selector */}
      {alertLevel === "nearby" && (
        <View style={s.rangeWrap}>
          <Text style={s.rangeLabel}>BROADCAST RANGE</Text>
          <View style={s.rangeRow}>
            {[1, 2, 3, 5].map((mi) => (
              <Pressable
                key={mi}
                onPress={() => setNearbyRange(mi)}
                style={[s.rangeBtn, { borderColor: nearbyRange === mi ? c.orange : c.borderMid },
                  nearbyRange === mi && { shadowColor: c.orangeGlow, shadowOpacity: 0.7, shadowRadius: 8 }]}
              >
                <Text style={[s.rangeBtnText, { color: nearbyRange === mi ? c.orange : c.textDim }]}>{mi}mi</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {/* Mark safe */}
      <Pressable style={[s.safeBtn, { borderColor: c.green, shadowColor: c.greenGlow }]} onPress={onMarkSafe}>
        <Text style={[s.safeBtnText, { color: c.green }]}>I'M SAFE — CANCEL ALERT</Text>
      </Pressable>
    </View>
  );
}

// ─── Guardian AI ──────────────────────────────────────────────────────────────

function GuardianPanel({ isActive, onPanic, onFall, onHeat }: {
  isActive: boolean; onPanic: () => void; onFall: () => void; onHeat: () => void;
}) {
  const spin = useSpin(true);
  const onlinePulse = usePulse(true, 1400);

  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Animated.Text style={[s.aiGlyphSm, { transform: [{ rotate: spin }] }]}>◎</Animated.Text>
          <Text style={s.sectionTitle}>GUARDIAN AI</Text>
        </View>
        <View style={s.onlineBadge}>
          <Animated.View style={[s.onlineDot, { opacity: onlinePulse }]} />
          <Text style={s.onlineText}>ONLINE</Text>
        </View>
      </View>

      {!isActive && (
        <View style={s.demoRow}>
          <Text style={s.demoLabel}>SIMULATE —</Text>
          {[
            { label: "PANIC", fn: onPanic, color: c.pink },
            { label: "FALL",  fn: onFall,  color: c.orange },
            { label: "HEAT",  fn: onHeat,  color: c.yellow },
          ].map(({ label, fn, color }) => (
            <Pressable
              key={label}
              onPress={fn}
              style={[s.demoBtn, { borderColor: color, shadowColor: color }]}
            >
              <Text style={[s.demoBtnText, { color }]}>{label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

function ContactsPanel() {
  const CONTACTS = [
    { name: "Mom",        role: "PRIMARY", phone: "(917) 555-0123", color: c.pink,  online: true  },
    { name: "S. Chen",    role: "CAMPUS",  phone: "(646) 555-0198", color: c.blue,  online: true  },
    { name: "Dr. Wilson", role: "MEDICAL", phone: "(212) 555-0167", color: c.green, online: false },
  ];
  const pulse = usePulse(true, 1500);

  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Text style={s.sectionTitle}>TRUSTED CONTACTS</Text>
        <Text style={s.sectionCount}>{CONTACTS.length}</Text>
      </View>
      {CONTACTS.map((ct, i) => (
        <View key={ct.name} style={[s.contactRow, i < CONTACTS.length - 1 && s.contactRowBorder]}>
          <View style={[s.contactAvatar, { borderColor: ct.color }]}>
            <Text style={[s.contactInitial, { color: ct.color }]}>{ct.name[0]}</Text>
            {ct.online && (
              <Animated.View style={[s.onlineIndicator, { opacity: pulse, backgroundColor: ct.color }]} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.contactName}>{ct.name}</Text>
            <Text style={[s.contactRole, { color: ct.color }]}>{ct.role}</Text>
          </View>
          <Text style={s.contactPhone}>{ct.phone}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Activity ─────────────────────────────────────────────────────────────────

function ActivityPanel() {
  const EVENTS = [
    { time: "2h ago",     event: "Walking Home mode completed",     success: true  },
    { time: "Yesterday",  event: "Check-in: Marked safe",           success: true  },
    { time: "3 days ago", event: "Added Dr. Wilson to contacts",    success: false },
  ];
  return (
    <View style={s.section}>
      <Text style={s.sectionTitle}>ACTIVITY LOG</Text>
      {EVENTS.map((ev, i) => (
        <View key={i} style={[s.eventRow, i < EVENTS.length - 1 && s.eventRowBorder]}>
          <View style={[s.eventDot, { backgroundColor: ev.success ? c.green : c.blue, shadowColor: ev.success ? c.greenGlow : c.blueGlow }]} />
          <Text style={s.eventText}>{ev.event}</Text>
          <Text style={s.eventTime}>{ev.time}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const SOS_SIZE = 200;
const RING_SIZE = SOS_SIZE + 90;

const s = StyleSheet.create({
  screen: { flex: 1, backgroundColor: c.bg },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 48 },

  divider: { height: StyleSheet.hairlineWidth, backgroundColor: c.borderMid, marginVertical: 28 },

  // AI overlay
  aiOverlay: { ...StyleSheet.absoluteFillObject, zIndex: 100, backgroundColor: "rgba(0,0,0,0.93)", alignItems: "center", justifyContent: "center" },
  aiInner: { alignItems: "center", gap: 20 },
  aiGlyph: { color: c.pink, fontSize: 72, shadowColor: c.pinkGlow, shadowOpacity: 1, shadowRadius: 20 },
  aiTitle: { color: c.pink, fontSize: f.xxl, fontWeight: "800", letterSpacing: 6, shadowColor: c.pinkGlow, shadowOpacity: 1, shadowRadius: 12 },
  aiSub: { color: c.textMuted, fontSize: f.xs, letterSpacing: 3 },
  aiMsg: { color: c.yellow, fontSize: f.sm, textAlign: "center", paddingHorizontal: 40, letterSpacing: 0.5, lineHeight: 20 },

  // Header
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 8, paddingBottom: 24 },
  wordmark: { fontSize: f.xxl, fontWeight: "900", letterSpacing: 6, shadowOpacity: 1, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
  location: { color: c.textMuted, fontSize: f.xs, letterSpacing: 2, marginTop: 4 },
  statusDot: { width: 14, height: 14, borderRadius: 7, shadowOpacity: 1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },

  // Status strip
  statusStrip: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statusLeft: { flexDirection: "row", alignItems: "center", gap: 14 },
  statusBar: { width: 3, height: 40, borderRadius: 2, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  statusLabel: { color: c.textDim, fontSize: f.xs, letterSpacing: 3, marginBottom: 4, fontWeight: "600" },
  statusLevel: { fontSize: f.xl, fontWeight: "800", letterSpacing: 4, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  triggerPill: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  triggerText: { fontSize: f.xs, fontWeight: "700", letterSpacing: 1.5 },

  // SOS
  sosWrap: { alignItems: "center", justifyContent: "center", height: RING_SIZE + 40, marginVertical: 12 },
  sosRing: { position: "absolute", width: RING_SIZE, height: RING_SIZE, borderRadius: RING_SIZE / 2, borderWidth: 1, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  sosBtn: { width: SOS_SIZE, height: SOS_SIZE, borderRadius: SOS_SIZE / 2, borderWidth: 1, alignItems: "center", justifyContent: "center", shadowOpacity: 1, shadowRadius: 40, shadowOffset: { width: 0, height: 0 } },
  tapCount: { position: "absolute", top: 32, fontSize: f.md, fontWeight: "800", letterSpacing: 1 },
  sosLabel: { fontSize: 36, fontWeight: "900", letterSpacing: 8, shadowOpacity: 1, shadowRadius: 16, shadowOffset: { width: 0, height: 0 } },
  sosSub: { color: c.textDim, fontSize: f.xs, letterSpacing: 3, marginTop: 8 },

  // Biometrics
  bioRow: { flexDirection: "row" },
  bioCell: { flex: 1, alignItems: "center", paddingVertical: 8 },
  bioCellBorder: { borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: c.borderMid },
  bioValue: { fontSize: f.xl, fontWeight: "700", letterSpacing: 1, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  bioUnit: { fontSize: f.xs, fontWeight: "400" },
  bioLabel: { color: c.textDim, fontSize: 9, letterSpacing: 2.5, marginTop: 5, fontWeight: "600" },

  // Alert
  alertSection: { gap: 20 },
  stagePills: { flexDirection: "row", gap: 10 },
  stagePill: { flex: 1, borderWidth: 1, borderRadius: 4, paddingVertical: 8, alignItems: "center" },
  stagePillText: { fontSize: f.xs, fontWeight: "700", letterSpacing: 1.5 },
  alertMsg: { borderLeftWidth: 2, paddingLeft: 16, gap: 4 },
  alertMsgTitle: { fontSize: f.sm, fontWeight: "800", letterSpacing: 1 },
  alertMsgBody: { color: c.textMuted, fontSize: f.xs, lineHeight: 18 },
  rangeWrap: { gap: 10 },
  rangeLabel: { color: c.textDim, fontSize: f.xs, letterSpacing: 2 },
  rangeRow: { flexDirection: "row", gap: 8 },
  rangeBtn: { flex: 1, paddingVertical: 10, borderRadius: 4, borderWidth: 1, alignItems: "center", shadowOpacity: 0, shadowRadius: 0, shadowOffset: { width: 0, height: 0 } },
  rangeBtnText: { fontSize: f.xs, fontWeight: "700" },
  safeBtn: { borderWidth: 1, borderRadius: 4, paddingVertical: 18, alignItems: "center", shadowOpacity: 0.5, shadowRadius: 16, shadowOffset: { width: 0, height: 0 } },
  safeBtnText: { fontSize: f.md, fontWeight: "800", letterSpacing: 3 },

  // Section shared
  section: { gap: 18 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  sectionTitle: { color: c.textMuted, fontSize: f.xs, fontWeight: "700", letterSpacing: 3 },
  sectionCount: { color: c.textDim, fontSize: f.xs, letterSpacing: 1 },
  aiGlyphSm: { color: c.blue, fontSize: 16, shadowColor: c.blueGlow, shadowOpacity: 1, shadowRadius: 8 },

  // Online badge
  onlineBadge: { flexDirection: "row", alignItems: "center", gap: 6 },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: c.green, shadowColor: c.greenGlow, shadowOpacity: 1, shadowRadius: 6 },
  onlineText: { color: c.green, fontSize: f.xs, fontWeight: "700", letterSpacing: 1.5 },

  // Demo
  demoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  demoLabel: { color: c.textDim, fontSize: f.xs, letterSpacing: 1.5 },
  demoBtn: { paddingHorizontal: 16, paddingVertical: 9, borderRadius: 4, borderWidth: 1, shadowOpacity: 0.5, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  demoBtnText: { fontSize: f.xs, fontWeight: "700", letterSpacing: 1 },

  // Contacts
  contactRow: { flexDirection: "row", alignItems: "center", gap: 16, paddingVertical: 14 },
  contactRowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.borderMid },
  contactAvatar: { width: 42, height: 42, borderRadius: 6, borderWidth: 1, alignItems: "center", justifyContent: "center", position: "relative" },
  contactInitial: { fontSize: f.lg, fontWeight: "800" },
  onlineIndicator: { position: "absolute", top: -4, right: -4, width: 10, height: 10, borderRadius: 5, borderWidth: 2, borderColor: c.bg, shadowOpacity: 1, shadowRadius: 6 },
  contactName: { color: c.text, fontSize: f.md, fontWeight: "600", letterSpacing: 0.5 },
  contactRole: { fontSize: f.xs, letterSpacing: 2, marginTop: 2 },
  contactPhone: { color: c.textDim, fontSize: f.xs, letterSpacing: 0.5 },

  // Events
  eventRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 },
  eventRowBorder: { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: c.borderMid },
  eventDot: { width: 8, height: 8, borderRadius: 4, shadowOpacity: 1, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  eventText: { flex: 1, color: c.textMuted, fontSize: f.sm, letterSpacing: 0.3 },
  eventTime: { color: c.textDim, fontSize: f.xs, letterSpacing: 0.5 },
});
