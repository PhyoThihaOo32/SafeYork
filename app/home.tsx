import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  darkTheme,
  getDanger,
  DangerLevel,
  lightTheme,
  ThemeColors,
} from "../src/theme";

const f = { xs: 10, sm: 12, md: 14, lg: 16, xl: 20, xxl: 28 } as const;

// ─── Theme context ────────────────────────────────────────────────────────────

const ThemeCtx = createContext<ThemeColors>(darkTheme);
const useTheme = () => useContext(ThemeCtx);

// ─── Animation hooks ──────────────────────────────────────────────────────────

function usePulse(active = true, duration = 1200) {
  const v = useRef(new Animated.Value(0.3)).current;
  useEffect(() => {
    if (!active) { v.setValue(0.3); return; }
    const a = Animated.loop(Animated.sequence([
      Animated.timing(v, { toValue: 1, duration, useNativeDriver: true }),
      Animated.timing(v, { toValue: 0.3, duration, useNativeDriver: true }),
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

function useScanLine() {
  const y = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const a = Animated.loop(Animated.timing(y, { toValue: 1, duration: 7000, useNativeDriver: true }));
    a.start(); return () => a.stop();
  }, []);
  return y.interpolate({ inputRange: [0, 1], outputRange: [-20, 900] });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

type SensorKey = "heart" | "temp" | "voice" | "motion";

export default function HomeScreen() {
  const [isDark, setIsDark] = useState(true);
  const theme = isDark ? darkTheme : lightTheme;

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
  const [aiSensors, setAiSensors] = useState<Record<SensorKey, boolean>>({
    heart: true, temp: true, voice: true, motion: true,
  });
  const [drillActive, setDrillActive] = useState(false);
  const [journeyActive, setJourneyActive] = useState(false);
  const [journeyMins, setJourneyMins] = useState(10);
  const [journeySecsLeft, setJourneySecsLeft] = useState(0);
  const [isHelper, setIsHelper] = useState(false);
  const [voiceListening, setVoiceListening] = useState(false);
  const [alertTimestamp, setAlertTimestamp] = useState("");

  function toggleSensor(key: SensorKey) {
    setAiSensors(prev => ({ ...prev, [key]: !prev[key] }));
  }

  // Auto-reset after drill completes (~3.5s in emergency = ~5.5s total from button press)
  useEffect(() => {
    if (!drillActive || !isSOSActive) return;
    const id = setTimeout(() => {
      setIsSOSActive(false); setDangerLevel(0); setAlertLevel("none"); setTapCount(0);
      setDetectionTrigger(null); setAlertMessage(""); setAiAnalyzing(false); setLastTapTime(0);
      setHeartRate(72); setBodyTemp(98.6); setVoiceStress(12); setMotionPattern("NORMAL");
      setDrillActive(false); setAlertTimestamp("");
    }, 3500);
    return () => clearTimeout(id);
  }, [drillActive, isSOSActive]);

  useEffect(() => {
    const id = setInterval(() => {
      if (isSOSActive) return;
      if (aiSensors.heart) setHeartRate(v => Math.max(60, Math.min(95, v + Math.floor(Math.random() * 8 - 4))));
      if (aiSensors.temp)  setBodyTemp(v => parseFloat((v + (Math.random() * 0.2 - 0.1)).toFixed(1)));
      if (aiSensors.voice) setVoiceStress(v => Math.max(0, Math.min(30, v + Math.floor(Math.random() * 6 - 3))));
    }, 2000);
    return () => clearInterval(id);
  }, [isSOSActive, aiSensors]);

  useEffect(() => {
    if (isSOSActive) return;
    let trigger = ""; let msg = "";
    if (aiSensors.heart && heartRate >= 200)  { trigger = "HEART RATE"; msg = `Tachycardia detected — ${heartRate} BPM`; }
    else if (aiSensors.temp && bodyTemp >= 103) { trigger = "BODY HEAT";  msg = `Hyperthermia detected — ${bodyTemp}°F`; }
    else if (aiSensors.voice && voiceStress >= 85) { trigger = "VOICE";  msg = "Extreme distress in voice patterns"; }
    else if (aiSensors.motion && (motionPattern === "FALL" || motionPattern === "SEIZURE")) { trigger = motionPattern; msg = `${motionPattern} detected`; }
    if (trigger) {
      setAiAnalyzing(true); setDetectionTrigger(trigger); setAlertMessage(msg);
      setTimeout(() => {
        setAiAnalyzing(false); setIsSOSActive(true); setDangerLevel(3); setAlertLevel("authorities");
        setAlertTimestamp(new Date().toLocaleTimeString()); setTapCount(9);
      }, 2000);
    }
  }, [heartRate, bodyTemp, voiceStress, motionPattern, isSOSActive, aiSensors]);

  function handleSOS() {
    const now = Date.now();
    const next = now - lastTapTime > 3000 && tapCount === 0 ? 1 : tapCount + 1;
    setTapCount(next); setLastTapTime(now); setIsSOSActive(true); setDetectionTrigger("manual");
    if (next === 1) setAlertTimestamp(new Date().toLocaleTimeString());
    if (next >= 9)      { setAlertLevel("authorities"); setDangerLevel(3); setAlertMessage("Emergency services and local authorities notified."); }
    else if (next >= 6) { setAlertLevel("nearby");      setDangerLevel(2); setAlertMessage(`Broadcasting to nearby users within ${nearbyRange} mile.`); }
    else if (next >= 3) { setAlertLevel("contacts");    setDangerLevel(1); setAlertMessage("Alerting 3 trusted contacts with your location."); }
    else { setDangerLevel(0); setAlertMessage(`Tap ${3 - next} more time${3 - next > 1 ? "s" : ""} to alert trusted contacts.`); }
  }

  function handleMarkSafe() {
    setIsSOSActive(false); setDangerLevel(0); setAlertLevel("none"); setTapCount(0);
    setDetectionTrigger(null); setAlertMessage(""); setAiAnalyzing(false); setLastTapTime(0);
    setHeartRate(72); setBodyTemp(98.6); setVoiceStress(12); setMotionPattern("NORMAL");
    setAlertTimestamp(""); setJourneyActive(false);
  }

  function handleVoiceTrigger() {
    if (voiceListening || isSOSActive) return;
    setVoiceListening(true);
    setTimeout(() => { setVoiceListening(false); setVoiceStress(90); }, 3000);
  }

  function startJourney() {
    setJourneySecsLeft(journeyMins * 60);
    setJourneyActive(true);
  }

  useEffect(() => {
    if (!journeyActive) return;
    const id = setInterval(() => {
      setJourneySecsLeft(prev => {
        if (prev <= 1) {
          setJourneyActive(false);
          setIsSOSActive(true); setDangerLevel(1); setAlertLevel("contacts");
          setTapCount(3); setDetectionTrigger("JOURNEY TIMER");
          setAlertMessage("Journey timer expired — no check-in received. Alerting trusted contacts.");
          setAlertTimestamp(new Date().toLocaleTimeString());
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [journeyActive]);

  const d = getDanger(theme)[dangerLevel];
  const analyzeSpin = useSpin(true);

  return (
    <ThemeCtx.Provider value={theme}>
      <SafeAreaView style={[s.screen, { backgroundColor: theme.bg }]} edges={["top", "bottom"]}>

        <NeonBackground dangerLevel={dangerLevel} />
        <FirefliesBackground />
        {aiAnalyzing && <AIOverlay message={alertMessage} spin={analyzeSpin} />}

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>

          {/* ── Header ── */}
          <View style={s.header}>
            <View>
              <Text style={[s.wordmark, { color: d.color, shadowColor: d.glow }]}>SAFEYORK</Text>
              <Text style={[s.location, { color: theme.textMuted }]}>◎  Manhattan, NY</Text>
            </View>
            <View style={s.headerRight}>
              {/* Theme toggle */}
              <Pressable
                onPress={() => setIsDark(v => !v)}
                style={[s.themeToggle, { borderColor: theme.borderMid, backgroundColor: theme.surfaceMid }]}
              >
                <Text style={[s.themeToggleIcon, { color: theme.textMuted }]}>
                  {isDark ? "☀" : "☾"}
                </Text>
                <Text style={[s.themeToggleLabel, { color: theme.textDim }]}>
                  {isDark ? "LIGHT" : "DARK"}
                </Text>
              </Pressable>
              <StatusDot level={dangerLevel} isActive={isSOSActive} />
            </View>
          </View>

          <View style={[s.divider, { backgroundColor: theme.borderMid }]} />

          <StatusStrip level={dangerLevel} isActive={isSOSActive} trigger={detectionTrigger} />

          <View style={[s.divider, { backgroundColor: theme.borderMid }]} />

          <SOSButton tapCount={tapCount} dangerLevel={dangerLevel} isActive={isSOSActive} onPress={handleSOS} />

          <VoiceSOSButton listening={voiceListening} isActive={isSOSActive} onPress={handleVoiceTrigger} />

          <View style={[s.divider, { backgroundColor: theme.borderMid }]} />

          {tapCount >= 3 && (
            <>
              <AlertSection tapCount={tapCount} alertLevel={alertLevel} alertMessage={alertMessage}
                nearbyRange={nearbyRange} setNearbyRange={setNearbyRange} onMarkSafe={handleMarkSafe}
                alertTimestamp={alertTimestamp} />
              <View style={[s.divider, { backgroundColor: theme.borderMid }]} />
            </>
          )}

          <JourneyPanel
            active={journeyActive} mins={journeyMins} secsLeft={journeySecsLeft}
            onSetMins={setJourneyMins} onStart={startJourney}
            onCancel={() => { setJourneyActive(false); setJourneySecsLeft(0); }}
            isSOSActive={isSOSActive}
          />

          <View style={[s.divider, { backgroundColor: theme.borderMid }]} />

          <GuardianPanel
            heartRate={heartRate} bodyTemp={bodyTemp} voiceStress={voiceStress}
            motionPattern={motionPattern} isActive={isSOSActive}
            aiSensors={aiSensors} toggleSensor={toggleSensor}
            onPanic={() => { setDrillActive(true); setHeartRate(210); setVoiceStress(90); setBodyTemp(99.2); }}
            onFall={() => { setDrillActive(true); setMotionPattern("FALL"); }}
            onHeat={() => { setDrillActive(true); setBodyTemp(104.5); setHeartRate(125); }}
          />

          <View style={[s.divider, { backgroundColor: theme.borderMid }]} />
          <ContactsPanel isHelper={isHelper} onToggleHelper={() => setIsHelper(v => !v)} />
          <View style={[s.divider, { backgroundColor: theme.borderMid }]} />
          <AreaSafetyPanel />

        </ScrollView>
      </SafeAreaView>
    </ThemeCtx.Provider>
  );
}

// ─── Neon Background ─────────────────────────────────────────────────────────

function NeonBackground({ dangerLevel }: { dangerLevel: DangerLevel }) {
  const th = useTheme();
  const p1 = usePulse(true, 3200);
  const p2 = usePulse(true, 4600);
  const p3 = usePulse(true, 2700);
  const scanY = useScanLine();
  const orbC = dangerLevel >= 2 ? th.pinkGlow.replace(/[\d.]+\)$/, "0.05)") : th.orbC;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[s.bgOrb, { top: -100, left: -80, width: 320, height: 320, backgroundColor: th.orbA, opacity: p1 }]} />
      <Animated.View style={[s.bgOrb, { bottom: 120, right: -100, width: 280, height: 280, backgroundColor: th.orbB, opacity: p2 }]} />
      <Animated.View style={[s.bgOrb, { top: "40%", left: "20%", width: 200, height: 200, backgroundColor: orbC, opacity: p3 }]} />
      <Animated.View style={[s.scanLine, { backgroundColor: th.scanLine, transform: [{ translateY: scanY }] }]} />
      <View style={[s.gridLine, { left: "25%", backgroundColor: th.gridLine }]} />
      <View style={[s.gridLine, { left: "50%", backgroundColor: th.gridLine }]} />
      <View style={[s.gridLine, { left: "75%", backgroundColor: th.gridLine }]} />
    </View>
  );
}

// ─── Fireflies ────────────────────────────────────────────────────────────────

type FireflyDatum = { x: number; y: number; size: number; color: string; dur: number; dx: number; dy: number; blink: number };

const FIREFLY_DATA: FireflyDatum[] = [
  { x: 35,  y: 60,  size: 2.5, color: "#C8FF00", dur: 5000, dx: 22,  dy: -15, blink: 0    },
  { x: 180, y: 40,  size: 3,   color: "#FFE600", dur: 6200, dx: -18, dy: 25,  blink: 600  },
  { x: 310, y: 95,  size: 2,   color: "#39FF14", dur: 4800, dx: 15,  dy: -20, blink: 1200 },
  { x: 75,  y: 200, size: 2.5, color: "#FFE600", dur: 5500, dx: -25, dy: 18,  blink: 300  },
  { x: 250, y: 180, size: 3.5, color: "#C8FF00", dur: 7000, dx: 20,  dy: -22, blink: 900  },
  { x: 355, y: 245, size: 2,   color: "#39FF14", dur: 4500, dx: -12, dy: 15,  blink: 1500 },
  { x: 20,  y: 360, size: 3,   color: "#FFE600", dur: 6000, dx: 28,  dy: -12, blink: 400  },
  { x: 145, y: 330, size: 2,   color: "#C8FF00", dur: 5200, dx: -16, dy: 20,  blink: 1100 },
  { x: 320, y: 385, size: 2.5, color: "#FFE600", dur: 4900, dx: 14,  dy: -25, blink: 700  },
  { x: 195, y: 455, size: 3,   color: "#39FF14", dur: 5800, dx: -22, dy: 16,  blink: 200  },
  { x: 60,  y: 525, size: 2,   color: "#FFE600", dur: 6300, dx: 18,  dy: -18, blink: 1300 },
  { x: 280, y: 510, size: 3,   color: "#C8FF00", dur: 5100, dx: -14, dy: 22,  blink: 500  },
  { x: 370, y: 565, size: 2.5, color: "#FFE600", dur: 4600, dx: 20,  dy: -15, blink: 800  },
  { x: 125, y: 625, size: 2,   color: "#39FF14", dur: 5700, dx: -24, dy: 14,  blink: 1600 },
  { x: 48,  y: 705, size: 3,   color: "#C8FF00", dur: 6100, dx: 16,  dy: -20, blink: 350  },
  { x: 220, y: 685, size: 2,   color: "#FFE600", dur: 4700, dx: -18, dy: 24,  blink: 950  },
  { x: 340, y: 735, size: 2.5, color: "#39FF14", dur: 5300, dx: 22,  dy: -16, blink: 1400 },
  { x: 100, y: 805, size: 2,   color: "#FFE600", dur: 5900, dx: -15, dy: 12,  blink: 650  },
  { x: 260, y: 825, size: 3,   color: "#C8FF00", dur: 6400, dx: 20,  dy: -18, blink: 1100 },
  { x: 385, y: 765, size: 2,   color: "#FFE600", dur: 4800, dx: -12, dy: 14,  blink: 1700 },
];

function Firefly({ x, y, size, color, dur, dx, dy, blink }: FireflyDatum) {
  const tx   = useRef(new Animated.Value(0)).current;
  const ty   = useRef(new Animated.Value(0)).current;
  const op   = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatX = Animated.loop(Animated.sequence([
      Animated.timing(tx, { toValue: dx,         duration: dur,       useNativeDriver: true }),
      Animated.timing(tx, { toValue: -dx * 0.6,  duration: dur * 0.8, useNativeDriver: true }),
      Animated.timing(tx, { toValue: dx * 0.3,   duration: dur * 0.7, useNativeDriver: true }),
      Animated.timing(tx, { toValue: 0,           duration: dur * 0.5, useNativeDriver: true }),
    ]));
    const floatY = Animated.loop(Animated.sequence([
      Animated.timing(ty, { toValue: dy,         duration: dur * 1.1, useNativeDriver: true }),
      Animated.timing(ty, { toValue: -dy * 0.5,  duration: dur * 0.9, useNativeDriver: true }),
      Animated.timing(ty, { toValue: dy * 0.35,  duration: dur * 0.7, useNativeDriver: true }),
      Animated.timing(ty, { toValue: 0,           duration: dur * 0.4, useNativeDriver: true }),
    ]));
    const glow = Animated.loop(Animated.sequence([
      Animated.delay(blink),
      Animated.timing(op, { toValue: 0.9, duration: 250, useNativeDriver: true }),
      Animated.timing(op, { toValue: 0.4, duration: 350, useNativeDriver: true }),
      Animated.timing(op, { toValue: 0.85, duration: 200, useNativeDriver: true }),
      Animated.timing(op, { toValue: 0,   duration: 600, useNativeDriver: true }),
      Animated.delay(1200 + (blink % 900)),
    ]));
    floatX.start(); floatY.start(); glow.start();
    return () => { floatX.stop(); floatY.stop(); glow.stop(); };
  }, []);

  return (
    <Animated.View pointerEvents="none" style={{
      position: "absolute", left: x, top: y,
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: color,
      shadowColor: color, shadowOpacity: 1, shadowRadius: size * 5,
      shadowOffset: { width: 0, height: 0 },
      opacity: op, transform: [{ translateX: tx }, { translateY: ty }],
    }} />
  );
}

function FirefliesBackground() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {FIREFLY_DATA.map((f, i) => <Firefly key={i} {...f} />)}
    </View>
  );
}

// ─── AI Overlay ───────────────────────────────────────────────────────────────

function AIOverlay({ message, spin }: { message: string; spin: Animated.AnimatedInterpolation<string> }) {
  const th = useTheme();
  const blink = usePulse(true, 700);
  return (
    <View style={[s.aiOverlay, { backgroundColor: th.aiOverlayBg }]}>
      <View style={s.aiInner}>
        <Animated.Text style={[s.aiGlyph, { color: th.pink, shadowColor: th.pinkGlow, transform: [{ rotate: spin }] }]}>◎</Animated.Text>
        <Animated.Text style={[s.aiTitle, { color: th.pink, shadowColor: th.pinkGlow, opacity: blink }]}>AI ANALYZING</Animated.Text>
        <Text style={[s.aiSub, { color: th.textMuted }]}>THREAT ASSESSMENT IN PROGRESS</Text>
        <Text style={[s.aiMsg, { color: th.yellow }]}>{message}</Text>
      </View>
    </View>
  );
}

// ─── Status dot ───────────────────────────────────────────────────────────────

function StatusDot({ level, isActive }: { level: DangerLevel; isActive: boolean }) {
  const th = useTheme();
  const d = getDanger(th)[level];
  const pulse = usePulse(isActive, 900);
  return (
    <Animated.View style={[s.statusDot, { backgroundColor: d.color, shadowColor: d.glow, opacity: isActive ? pulse : 1 }]} />
  );
}

// ─── Status strip ─────────────────────────────────────────────────────────────

function StatusStrip({ level, isActive, trigger }: { level: DangerLevel; isActive: boolean; trigger: string | null }) {
  const th = useTheme();
  const d = getDanger(th)[level];
  const pulse = usePulse(isActive, 1000);
  return (
    <View style={s.statusStrip}>
      <View style={s.statusLeft}>
        <Animated.View style={[s.statusBar, { backgroundColor: d.color, shadowColor: d.glow, opacity: isActive ? pulse : 0.6 }]} />
        <View>
          <Text style={[s.statusLabel, { color: th.textDim }]}>SYSTEM STATUS</Text>
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
  const th = useTheme();
  const d = getDanger(th)[dangerLevel];
  const ring1 = usePing(isActive, 0);
  const ring2 = usePing(isActive, 600);
  const ring3 = usePing(isActive, 1200);
  const btnScale = useRef(new Animated.Value(1)).current;

  function onPressIn() { Animated.spring(btnScale, { toValue: 0.94, useNativeDriver: true, speed: 50, bounciness: 0 }).start(); }
  function onPressOut() { Animated.spring(btnScale, { toValue: 1, useNativeDriver: true, speed: 28, bounciness: 10 }).start(); }

  const label = tapCount >= 9 ? "POLICE" : tapCount >= 6 ? "NEARBY" : tapCount >= 3 ? "CONTACTS" : "SOS";
  const sub   = tapCount >= 3 ? `LEVEL ${dangerLevel} · ACTIVE` : "TAP TO ACTIVATE";

  return (
    <View style={s.sosWrap}>
      {[ring1, ring2, ring3].map((r, i) => (
        <Animated.View key={i} pointerEvents="none"
          style={[s.sosRing, { borderColor: d.color, shadowColor: d.glow, transform: [{ scale: r.scale }], opacity: r.opacity }]} />
      ))}
      <Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Animated.View style={[s.sosBtn, { borderColor: d.color, shadowColor: d.glow, transform: [{ scale: btnScale }] }]}>
          {tapCount > 0 && <Text style={[s.tapCount, { color: d.color }]}>{tapCount}</Text>}
          <Text style={[s.sosLabel, { color: d.color, shadowColor: d.glow }]}>{label}</Text>
          <Text style={[s.sosSub, { color: th.textDim }]}>{sub}</Text>
        </Animated.View>
      </Pressable>
    </View>
  );
}

// ─── Voice SOS Button ────────────────────────────────────────────────────────

function VoiceSOSButton({ listening, isActive, onPress }: { listening: boolean; isActive: boolean; onPress: () => void }) {
  const th = useTheme();
  const pulse = usePulse(listening, 400);
  const color = isActive ? th.textDim : listening ? th.pink : th.blue;
  return (
    <View style={s.voiceWrap}>
      <Pressable onPress={onPress} disabled={isActive}
        style={[s.voiceBtn, { borderColor: `${color}60`, backgroundColor: `${color}10`, opacity: isActive ? 0.35 : 1 }]}>
        <Animated.Text style={[s.voiceIcon, { color, shadowColor: color, opacity: listening ? pulse : 1 }]}>
          {listening ? "◉" : "◎"}
        </Animated.Text>
        <View style={{ flex: 1 }}>
          <Text style={[s.voiceBtnText, { color }]}>{listening ? "LISTENING..." : "VOICE SOS"}</Text>
          <Text style={[s.voiceBtnSub, { color: th.textDim }]}>
            {listening ? 'Say "HELP" to trigger emergency alert' : "Tap to activate voice trigger"}
          </Text>
        </View>
        {listening && (
          <View style={s.voiceBars}>
            {[0.4, 1, 0.6, 0.9, 0.3, 0.7, 0.5].map((h, i) => (
              <Animated.View key={i} style={[s.voiceBar, { backgroundColor: th.pink, height: 20 * h, opacity: pulse }]} />
            ))}
          </View>
        )}
      </Pressable>
    </View>
  );
}

// ─── Journey Panel ────────────────────────────────────────────────────────────

function JourneyPanel({ active, mins, secsLeft, onSetMins, onStart, onCancel, isSOSActive }: {
  active: boolean; mins: number; secsLeft: number;
  onSetMins: (m: number) => void; onStart: () => void; onCancel: () => void; isSOSActive: boolean;
}) {
  const th = useTheme();
  const progressPulse = usePulse(active, 1600);
  const DURATIONS = [5, 10, 15, 20];
  const minsLeft = Math.floor(secsLeft / 60);
  const secsDisplay = secsLeft % 60;
  const timerStr = `${minsLeft}:${String(secsDisplay).padStart(2, "0")}`;
  const nearExpiry = secsLeft <= 60 && secsLeft > 0;

  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Text style={[s.aiGlyphSm, { color: active ? th.green : th.textDim }]}>⊕</Text>
          <View>
            <Text style={[s.sectionTitle, { color: th.textMuted }]}>WALK HOME MODE</Text>
            <Text style={[s.guardianSub, { color: th.textDim }]}>
              {active ? "Journey in progress — check in when safe" : "Set a timer for your journey"}
            </Text>
          </View>
        </View>
        {active && (
          <Animated.View style={[s.riskBadge,
            { borderColor: nearExpiry ? th.orange : th.green, backgroundColor: nearExpiry ? th.orangeBg : th.greenBg, opacity: progressPulse }]}>
            <Text style={[s.riskBadgeText, { color: nearExpiry ? th.orange : th.green }]}>{nearExpiry ? "EXPIRING" : "ACTIVE"}</Text>
          </Animated.View>
        )}
      </View>

      {active ? (
        <View style={s.journeyActive}>
          <View style={s.journeyTimerWrap}>
            <Text style={[s.journeyTimerLabel, { color: th.textDim }]}>TIME REMAINING</Text>
            <Text style={[s.journeyTimer, { color: nearExpiry ? th.orange : th.green, shadowColor: nearExpiry ? th.orangeGlow : th.greenGlow }]}>
              {timerStr}
            </Text>
            <Text style={[s.journeyTimerSub, { color: th.textDim }]}>
              {nearExpiry ? "⚠ Almost expired — tap below if you arrived safely" : "Your contacts are alerted if the timer expires"}
            </Text>
          </View>
          <Pressable onPress={onCancel} style={[s.safeBtn, { borderColor: th.green, shadowColor: th.greenGlow }]}>
            <Text style={[s.safeBtnText, { color: th.green }]}>I ARRIVED SAFELY</Text>
          </Pressable>
        </View>
      ) : (
        <View style={{ gap: 14 }}>
          <View style={{ gap: 8 }}>
            <Text style={[s.rangeLabel, { color: th.textDim }]}>JOURNEY DURATION</Text>
            <View style={s.rangeRow}>
              {DURATIONS.map((m) => (
                <Pressable key={m} onPress={() => onSetMins(m)}
                  style={[s.rangeBtn, { borderColor: mins === m ? th.green : th.borderMid },
                    mins === m && { shadowColor: th.greenGlow, shadowOpacity: 0.6, shadowRadius: 8 }]}>
                  <Text style={[s.rangeBtnText, { color: mins === m ? th.green : th.textDim }]}>{m}m</Text>
                </Pressable>
              ))}
            </View>
          </View>
          <Pressable onPress={onStart} disabled={isSOSActive}
            style={[s.journeyStartBtn, { borderColor: isSOSActive ? th.borderMid : th.green,
              backgroundColor: isSOSActive ? "transparent" : th.greenBg,
              shadowColor: th.greenGlow, opacity: isSOSActive ? 0.4 : 1 }]}>
            <Text style={[s.journeyStartText, { color: isSOSActive ? th.textDim : th.green }]}>
              START {mins}-MIN JOURNEY TIMER
            </Text>
          </Pressable>
          <Text style={[s.journeyNote, { color: th.textDim }]}>
            If you don't check in within {mins} minutes, your trusted contacts will be automatically alerted.
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── Quick Biometrics ────────────────────────────────────────────────────────

function BiometricsRow({ heartRate, bodyTemp, voiceStress, motionPattern, aiSensors }: {
  heartRate: number; bodyTemp: number; voiceStress: number;
  motionPattern: string; aiSensors: Record<SensorKey, boolean>;
}) {
  const th = useTheme();
  const metrics = [
    { key: "heart" as SensorKey, value: `${heartRate}`,       unit: "BPM", label: "HEART",
      color: heartRate >= 200 ? th.pink : heartRate >= 100 ? th.yellow : th.green, alert: heartRate >= 200 },
    { key: "temp"  as SensorKey, value: bodyTemp.toFixed(1), unit: "°F",  label: "TEMP",
      color: bodyTemp >= 103 ? th.pink : bodyTemp >= 100 ? th.yellow : th.blue, alert: bodyTemp >= 103 },
    { key: "voice" as SensorKey, value: `${voiceStress}`,    unit: "%",   label: "VOICE",
      color: voiceStress >= 85 ? th.pink : voiceStress >= 50 ? th.yellow : th.green, alert: voiceStress >= 85 },
    { key: "motion" as SensorKey, value: motionPattern,       unit: "",    label: "MOTION",
      color: motionPattern === "FALL" || motionPattern === "SEIZURE" ? th.pink : th.green,
      alert: motionPattern === "FALL" || motionPattern === "SEIZURE" },
  ];

  return (
    <View style={[s.bioRow, { borderColor: th.borderMid }]}>
      {metrics.map((m, i) => {
        const alertPulse = usePulse(m.alert, 500);
        const enabled = aiSensors[m.key];
        return (
          <View key={m.label} style={[s.bioCell, i < metrics.length - 1 && { borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: th.borderMid }]}>
            <Animated.Text style={[s.bioValue, { color: enabled ? m.color : th.textDim, shadowColor: m.color },
              m.alert && enabled && { opacity: alertPulse }]}>
              {m.value}{m.unit ? <Text style={s.bioUnit}>{m.unit}</Text> : null}
            </Animated.Text>
            <Text style={[s.bioLabel, { color: enabled ? th.textDim : th.border }]}>{m.label}</Text>
            {!enabled && <Text style={[s.bioOff, { color: th.textDim }]}>OFF</Text>}
          </View>
        );
      })}
    </View>
  );
}

// ─── EQ Bars ─────────────────────────────────────────────────────────────────

function EqBars({ active, color }: { active: boolean; color: string }) {
  const b = [usePulse(active, 320), usePulse(active, 480), usePulse(active, 260), usePulse(active, 540), usePulse(active, 380), usePulse(active, 420)];
  return (
    <View style={s.eqWrap}>
      {b.map((bar, i) => (
        <Animated.View key={i} style={[s.eqBar, { backgroundColor: color, transform: [{ scaleY: bar }], opacity: active ? 1 : 0.12 }]} />
      ))}
    </View>
  );
}

// ─── Heartbeat Line ──────────────────────────────────────────────────────────

function HeartbeatLine({ active, color }: { active: boolean; color: string }) {
  const beat = usePulse(active, 800);
  return (
    <View style={s.hbWrap}>
      {[0.2, 1, 0.3, 0.6, 0.2, 0.4, 1, 0.2].map((h, i) => (
        <Animated.View key={i} style={[s.hbBar, { backgroundColor: color, height: 24 * h, opacity: active ? beat : 0.1 }]} />
      ))}
    </View>
  );
}

// ─── Guardian AI Panel ────────────────────────────────────────────────────────

function GuardianPanel({ heartRate, bodyTemp, voiceStress, motionPattern, isActive, aiSensors, toggleSensor, onPanic, onFall, onHeat }: {
  heartRate: number; bodyTemp: number; voiceStress: number; motionPattern: string;
  isActive: boolean; aiSensors: Record<SensorKey, boolean>;
  toggleSensor: (k: SensorKey) => void;
  onPanic: () => void; onFall: () => void; onHeat: () => void;
}) {
  const th = useTheme();
  const spin = useSpin(true);
  const onlinePulse = usePulse(true, 1400);
  const activeSensorCount = Object.values(aiSensors).filter(Boolean).length;

  const sensors: { key: SensorKey; icon: string; label: string; value: string; unit: string; color: string; status: string; alert: boolean }[] = [
    { key: "heart",  icon: "♡", label: "HEART BEAT",   value: `${heartRate}`,      unit: "BPM",
      color: heartRate >= 200 ? th.pink : heartRate >= 100 ? th.yellow : th.blue,
      status: heartRate >= 200 ? "CRITICAL" : heartRate >= 100 ? "ELEVATED" : "NORMAL", alert: heartRate >= 200 },
    { key: "temp",   icon: "⊕", label: "BODY HEAT",    value: bodyTemp.toFixed(1), unit: "°F",
      color: bodyTemp >= 103 ? th.pink : bodyTemp >= 100 ? th.yellow : th.green,
      status: bodyTemp >= 103 ? "CRITICAL" : bodyTemp >= 100 ? "ELEVATED" : "NORMAL", alert: bodyTemp >= 103 },
    { key: "voice",  icon: "≋", label: "VOICE / SOUND",value: `${voiceStress}`,    unit: "%",
      color: voiceStress >= 85 ? th.pink : voiceStress >= 50 ? th.yellow : th.green,
      status: voiceStress >= 85 ? "DISTRESS" : voiceStress >= 50 ? "STRESS" : "CALM", alert: voiceStress >= 85 },
    { key: "motion", icon: "⊙", label: "MOTION",       value: motionPattern,       unit: "",
      color: motionPattern === "FALL" || motionPattern === "SEIZURE" ? th.pink : th.green,
      status: motionPattern === "FALL" ? "FALL DETECTED" : motionPattern === "SEIZURE" ? "SEIZURE" : "STABLE",
      alert: motionPattern === "FALL" || motionPattern === "SEIZURE" },
  ];

  return (
    <View style={s.section}>
      {/* Header */}
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Animated.Text style={[s.aiGlyphSm, { color: th.blue, shadowColor: th.blueGlow, transform: [{ rotate: spin }] }]}>◎</Animated.Text>
          <View>
            <Text style={[s.sectionTitle, { color: th.textMuted }]}>GUARDIAN AI</Text>
            <Text style={[s.guardianSub, { color: th.textDim }]}>{activeSensorCount}/4 sensors active</Text>
          </View>
        </View>
        <View style={s.onlineBadge}>
          <Animated.View style={[s.onlineDot, { backgroundColor: th.green, shadowColor: th.greenGlow, opacity: onlinePulse }]} />
          <Text style={[s.onlineText, { color: th.green }]}>{activeSensorCount > 0 ? "MONITORING" : "STANDBY"}</Text>
        </View>
      </View>

      {/* Sensor grid */}
      <View style={s.sensorGrid}>
        {sensors.map((sensor) => {
          const enabled = aiSensors[sensor.key];
          const cardColor = enabled ? sensor.color : th.textDim;
          const alertPulse = usePulse(sensor.alert && enabled, 600);

          return (
            <Animated.View key={sensor.key} style={[
              s.sensorCard,
              { borderColor: enabled ? `${cardColor}50` : th.border, backgroundColor: th.sensorCardBg },
              sensor.alert && enabled && { borderColor: sensor.color, shadowColor: sensor.color, shadowOpacity: 0.5, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },
              sensor.alert && enabled && { opacity: alertPulse },
            ]}>
              {/* Card header */}
              <View style={s.sensorCardHeader}>
                <View style={s.sensorIconRow}>
                  <Text style={[s.sensorIcon, { color: cardColor }]}>{sensor.icon}</Text>
                  <Text style={[s.sensorLabel, { color: enabled ? th.textMuted : th.textDim }]}>{sensor.label}</Text>
                </View>
                <Pressable onPress={() => toggleSensor(sensor.key)}
                  style={[s.togglePill, { borderColor: enabled ? cardColor : th.borderMid, backgroundColor: enabled ? `${cardColor}18` : "transparent" }]}>
                  <Text style={[s.toggleText, { color: enabled ? cardColor : th.textDim }]}>{enabled ? "ON" : "OFF"}</Text>
                </Pressable>
              </View>

              {/* Value */}
              <Text style={[s.sensorValue, { color: cardColor }]}>
                {sensor.value}{sensor.unit ? <Text style={s.sensorUnit}> {sensor.unit}</Text> : null}
              </Text>

              {/* Live waveform */}
              {sensor.key === "heart" || sensor.key === "voice"
                ? <EqBars active={enabled} color={cardColor} />
                : <HeartbeatLine active={enabled} color={cardColor} />
              }

              {/* Status */}
              <View style={s.sensorStatus}>
                <View style={[s.statusPip, { backgroundColor: enabled ? sensor.color : th.textDim }]} />
                <Text style={[s.statusPipLabel, { color: enabled ? sensor.color : th.textDim }]}>
                  {enabled ? sensor.status : "SENSOR OFF"}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </View>

      {/* Demo triggers */}
      {!isActive && (
        <View style={[s.demoWrap, { borderTopColor: th.borderMid }]}>
          <Text style={[s.demoHeading, { color: th.textDim }]}>SIMULATE EMERGENCY</Text>
          <View style={s.demoRow}>
            {[
              { label: "PANIC ATTACK", fn: onPanic, color: th.pink },
              { label: "FALL",         fn: onFall,  color: th.orange },
              { label: "HEAT STROKE",  fn: onHeat,  color: th.yellow },
            ].map(({ label, fn, color }) => (
              <Pressable key={label} onPress={fn}
                style={[s.demoBtn, { borderColor: `${color}60`, shadowColor: color }]}>
                <Text style={[s.demoBtnText, { color }]}>{label}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// ─── Alert section ────────────────────────────────────────────────────────────

function AlertSection({ tapCount, alertLevel, alertMessage, nearbyRange, setNearbyRange, onMarkSafe, alertTimestamp }: {
  tapCount: number; alertLevel: string; alertMessage: string;
  nearbyRange: number; setNearbyRange: (v: number) => void; onMarkSafe: () => void;
  alertTimestamp: string;
}) {
  const th = useTheme();
  const STAGES = [
    { threshold: 3, label: "CONTACTS", color: th.yellow, glow: th.yellowGlow },
    { threshold: 6, label: "NEARBY",   color: th.orange, glow: th.orangeGlow },
    { threshold: 9, label: "POLICE",   color: th.pink,   glow: th.pinkGlow   },
  ];
  const alertColor = tapCount >= 9 ? th.pink : tapCount >= 6 ? th.orange : th.yellow;

  return (
    <View style={s.alertSection}>
      <View style={s.stagePills}>
        {STAGES.map((stage) => {
          const active = tapCount >= stage.threshold;
          return (
            <View key={stage.label} style={[s.stagePill, { borderColor: active ? stage.color : th.borderMid },
              active && { shadowColor: stage.glow, shadowOpacity: 0.8, shadowRadius: 10 }]}>
              <Text style={[s.stagePillText, { color: active ? stage.color : th.textDim }]}>{stage.label}</Text>
            </View>
          );
        })}
      </View>
      <View style={[s.alertMsg, { borderLeftColor: alertColor }]}>
        <Text style={[s.alertMsgTitle, { color: alertColor }]}>
          {alertLevel === "authorities" ? "EMERGENCY SERVICES NOTIFIED"
            : alertLevel === "nearby" ? "BROADCASTING TO NEARBY USERS"
            : "TRUSTED CONTACTS ALERTED"}
        </Text>
        <Text style={[s.alertMsgBody, { color: th.textMuted }]}>{alertMessage}</Text>
      </View>

      <View style={[s.locationBlock, { borderColor: th.borderMid, backgroundColor: th.sensorCardBg }]}>
        <View style={s.locationRow}>
          <Text style={[s.locationIcon, { color: th.blue, shadowColor: th.blueGlow }]}>◎</Text>
          <View style={{ flex: 1 }}>
            <Text style={[s.locationLabel, { color: th.textDim }]}>SHARING LIVE LOCATION</Text>
            <Text style={[s.locationCoords, { color: th.text }]}>40.7831° N, 73.9712° W</Text>
            <Text style={[s.locationArea, { color: th.textMuted }]}>Upper West Side, Manhattan</Text>
          </View>
          {alertTimestamp ? <Text style={[s.locationTime, { color: th.textDim }]}>Sent {alertTimestamp}</Text> : null}
        </View>
      </View>

      <View style={[s.notifWrap, { borderColor: th.borderMid }]}>
        <Text style={[s.notifTitle, { color: th.textDim }]}>NOTIFICATION STATUS</Text>
        {[
          { name: "Mom",              status: tapCount >= 3 ? "NOTIFIED"     : "PENDING",    color: tapCount >= 3 ? th.green : th.textDim },
          { name: "S. Chen",          status: tapCount >= 3 ? "NOTIFIED"     : "PENDING",    color: tapCount >= 3 ? th.green : th.textDim },
          { name: "Dr. Wilson",       status: tapCount >= 6 ? "NOTIFIED"     : "STANDBY",    color: tapCount >= 6 ? th.green : th.yellow  },
          { name: "Nearby Users (7)", status: tapCount >= 6 ? "BROADCASTING" : "STANDBY",    color: tapCount >= 6 ? th.blue  : th.textDim },
          { name: "Emergency Svcs",   status: tapCount >= 9 ? "DISPATCHED"   : "STANDBY",    color: tapCount >= 9 ? th.pink  : th.textDim },
        ].map((n, i) => (
          <View key={n.name} style={[s.notifRow,
            i < 4 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: th.borderMid }]}>
            <View style={[s.notifDot, { backgroundColor: n.color }]} />
            <Text style={[s.notifName, { color: th.text }]}>{n.name}</Text>
            <Text style={[s.notifStatus, { color: n.color }]}>{n.status}</Text>
          </View>
        ))}
      </View>

      {alertLevel === "nearby" && (
        <View style={s.rangeWrap}>
          <Text style={[s.rangeLabel, { color: th.textDim }]}>BROADCAST RANGE</Text>
          <View style={s.rangeRow}>
            {[1, 2, 3, 5].map((mi) => (
              <Pressable key={mi} onPress={() => setNearbyRange(mi)}
                style={[s.rangeBtn, { borderColor: nearbyRange === mi ? th.orange : th.borderMid },
                  nearbyRange === mi && { shadowColor: th.orangeGlow, shadowOpacity: 0.7, shadowRadius: 8 }]}>
                <Text style={[s.rangeBtnText, { color: nearbyRange === mi ? th.orange : th.textDim }]}>{mi}mi</Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}
      <Pressable style={[s.safeBtn, { borderColor: th.green, shadowColor: th.greenGlow }]} onPress={onMarkSafe}>
        <Text style={[s.safeBtnText, { color: th.green }]}>I'M SAFE — CANCEL ALERT</Text>
      </Pressable>
    </View>
  );
}

// ─── Contacts ─────────────────────────────────────────────────────────────────

function ContactsPanel({ isHelper, onToggleHelper }: { isHelper: boolean; onToggleHelper: () => void }) {
  const th = useTheme();
  const CONTACTS = [
    { name: "Mom",        role: "PRIMARY", phone: "(917) 555-0123", color: th.pink,  online: true  },
    { name: "S. Chen",    role: "CAMPUS",  phone: "(646) 555-0198", color: th.blue,  online: true  },
    { name: "Dr. Wilson", role: "MEDICAL", phone: "(212) 555-0167", color: th.green, online: false },
  ];
  const pulse = usePulse(true, 1500);

  return (
    <View style={s.section}>
      <View style={s.sectionHeader}>
        <Text style={[s.sectionTitle, { color: th.textMuted }]}>TRUSTED CONTACTS</Text>
        <Text style={[s.sectionCount, { color: th.textDim }]}>{CONTACTS.length}</Text>
      </View>
      {CONTACTS.map((ct, i) => (
        <View key={ct.name} style={[s.contactRow, { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: th.borderMid }]}>
          <View style={[s.contactAvatar, { borderColor: ct.color }]}>
            <Text style={[s.contactInitial, { color: ct.color }]}>{ct.name[0]}</Text>
            {ct.online && (
              <Animated.View style={[s.onlineIndicator, { backgroundColor: ct.color, borderColor: th.bg, opacity: pulse }]} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[s.contactName, { color: th.text }]}>{ct.name}</Text>
            <Text style={[s.contactRole, { color: ct.color }]}>{ct.role}</Text>
          </View>
          <Text style={[s.contactPhone, { color: th.textDim }]}>{ct.phone}</Text>
        </View>
      ))}
      <View style={[s.helperToggleWrap, { borderColor: isHelper ? th.blue : th.borderMid, backgroundColor: isHelper ? th.blueBg : th.sensorCardBg }]}>
        <View style={{ flex: 1 }}>
          <Text style={[s.helperToggleTitle, { color: isHelper ? th.blue : th.textMuted }]}>JOIN AS NEARBY HELPER</Text>
          <Text style={[s.helperToggleSub, { color: th.textDim }]}>
            {isHelper ? "You're visible to others who need help nearby" : "Opt in to receive emergency alerts from nearby users"}
          </Text>
        </View>
        <Pressable onPress={onToggleHelper}
          style={[s.togglePill, { borderColor: isHelper ? th.blue : th.borderMid, backgroundColor: isHelper ? `${th.blue}18` : "transparent" }]}>
          <Text style={[s.toggleText, { color: isHelper ? th.blue : th.textDim }]}>{isHelper ? "ON" : "OFF"}</Text>
        </Pressable>
      </View>
    </View>
  );
}

// ─── Area Safety Panel ────────────────────────────────────────────────────────

type RiskLevel = "LOW" | "MODERATE" | "HIGH" | "CRITICAL";

const AREA_DATA: {
  neighborhood: string; borough: string;
  risk: RiskLevel; score: number;
  crimeIndex: number; incidents: number;
  warning: string | null;
  recentCrimes: { type: string; time: string; distance: string; severity: RiskLevel }[];
}[] = [
  {
    neighborhood: "East Harlem", borough: "Manhattan",
    risk: "HIGH", score: 28, crimeIndex: 74, incidents: 12,
    warning: "High crime zone — stay alert and avoid isolated areas after dark.",
    recentCrimes: [
      { type: "Armed Robbery",   time: "2h ago",    distance: "0.3 mi", severity: "CRITICAL" },
      { type: "Assault",         time: "5h ago",    distance: "0.6 mi", severity: "HIGH"     },
      { type: "Vehicle Break-in",time: "Yesterday", distance: "0.2 mi", severity: "MODERATE" },
      { type: "Petty Theft",     time: "Yesterday", distance: "0.4 mi", severity: "LOW"      },
    ],
  },
];

function AreaSafetyPanel() {
  const th = useTheme();
  const area = AREA_DATA[0];
  const scanPulse = usePulse(true, 2000);
  const warnPulse = usePulse(area.risk === "CRITICAL" || area.risk === "HIGH", 900);

  const riskColor = (r: RiskLevel) =>
    r === "CRITICAL" ? th.pink : r === "HIGH" ? th.orange : r === "MODERATE" ? th.yellow : th.green;
  const riskGlow  = (r: RiskLevel) =>
    r === "CRITICAL" ? th.pinkGlow : r === "HIGH" ? th.orangeGlow : r === "MODERATE" ? th.yellowGlow : th.greenGlow;

  const areaColor = riskColor(area.risk);
  const areaGlow  = riskGlow(area.risk);

  // Score bar — score is 0-100 where 0=safest, 100=most dangerous
  const barWidth = `${area.score}%` as const;

  return (
    <View style={s.section}>

      {/* Header */}
      <View style={s.sectionHeader}>
        <View style={s.sectionTitleRow}>
          <Animated.Text style={[s.aiGlyphSm, { color: areaColor, shadowColor: areaGlow, opacity: scanPulse }]}>◎</Animated.Text>
          <View>
            <Text style={[s.sectionTitle, { color: th.textMuted }]}>AREA MONITORING</Text>
            <Text style={[s.guardianSub, { color: th.textDim }]}>{area.neighborhood}, {area.borough}</Text>
          </View>
        </View>
        {/* Risk badge */}
        <Animated.View style={[
          s.riskBadge,
          { borderColor: areaColor, backgroundColor: `${areaColor}15` },
          (area.risk === "HIGH" || area.risk === "CRITICAL") && { opacity: warnPulse },
        ]}>
          <Text style={[s.riskBadgeText, { color: areaColor, shadowColor: areaGlow }]}>{area.risk} RISK</Text>
        </Animated.View>
      </View>

      {/* Safety score bar */}
      <View style={s.scoreWrap}>
        <View style={s.scoreRow}>
          <Text style={[s.scoreLabel, { color: th.textDim }]}>SAFETY SCORE</Text>
          <Text style={[s.scoreValue, { color: areaColor }]}>{area.score}<Text style={s.scoreMax}>/100</Text></Text>
        </View>
        <View style={[s.scoreTrack, { backgroundColor: th.borderMid }]}>
          <View style={[s.scoreFill, { width: barWidth, backgroundColor: areaColor, shadowColor: areaGlow }]} />
        </View>
        <View style={s.scoreFooter}>
          <Text style={[s.scoreFooterText, { color: th.green }]}>SAFE</Text>
          <Text style={[s.scoreFooterText, { color: th.textDim }]}>Crime Index: {area.crimeIndex}</Text>
          <Text style={[s.scoreFooterText, { color: th.pink }]}>DANGER</Text>
        </View>
      </View>

      {/* Warning banner */}
      {area.warning && (
        <View style={[s.warningBanner, { borderColor: areaColor, backgroundColor: `${areaColor}10`, borderLeftColor: areaColor }]}>
          <Text style={[s.warningIcon, { color: areaColor }]}>⚠</Text>
          <Text style={[s.warningText, { color: th.textMuted }]}>{area.warning}</Text>
        </View>
      )}

      {/* Stats row */}
      <View style={[s.statsRow, { borderColor: th.borderMid }]}>
        {[
          { label: "INCIDENTS",    value: `${area.incidents}`, sub: "last 24h",  color: areaColor },
          { label: "CRIME INDEX",  value: `${area.crimeIndex}`, sub: "out of 100", color: areaColor },
          { label: "NEARBY USERS", value: "7",  sub: "SafeYork active", color: th.blue },
        ].map((stat, i) => (
          <View key={stat.label} style={[s.statCell, i < 2 && { borderRightWidth: StyleSheet.hairlineWidth, borderRightColor: th.borderMid }]}>
            <Text style={[s.statValue, { color: stat.color }]}>{stat.value}</Text>
            <Text style={[s.statLabel, { color: th.textDim }]}>{stat.label}</Text>
            <Text style={[s.statSub, { color: th.textDim }]}>{stat.sub}</Text>
          </View>
        ))}
      </View>

      {/* Recent crimes */}
      <View style={s.crimesWrap}>
        <Text style={[s.crimesTitle, { color: th.textDim }]}>RECENT INCIDENTS NEARBY</Text>
        {area.recentCrimes.map((crime, i) => {
          const cc = riskColor(crime.severity);
          return (
            <View key={i} style={[
              s.crimeRow,
              i < area.recentCrimes.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: th.borderMid },
            ]}>
              <View style={[s.crimeDot, { backgroundColor: cc, shadowColor: riskGlow(crime.severity) }]} />
              <View style={{ flex: 1 }}>
                <Text style={[s.crimeType, { color: th.text }]}>{crime.type}</Text>
                <Text style={[s.crimeMeta, { color: th.textDim }]}>{crime.time} · {crime.distance} away</Text>
              </View>
              <View style={[s.crimePill, { borderColor: `${cc}60`, backgroundColor: `${cc}12` }]}>
                <Text style={[s.crimePillText, { color: cc }]}>{crime.severity}</Text>
              </View>
            </View>
          );
        })}
      </View>

    </View>
  );
}

// ─── Styles (layout only — colors applied inline) ─────────────────────────────

const SOS_SIZE = 200;
const RING_SIZE = SOS_SIZE + 90;

const s = StyleSheet.create({
  screen: { flex: 1 },
  scroll: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 48 },
  divider: { height: StyleSheet.hairlineWidth, marginVertical: 28 },

  // Background
  bgOrb:    { position: "absolute", borderRadius: 999 },
  scanLine: { position: "absolute", left: 0, right: 0, height: 1 },
  gridLine: { position: "absolute", top: 0, bottom: 0, width: StyleSheet.hairlineWidth },

  // AI overlay
  aiOverlay: { ...StyleSheet.absoluteFillObject, zIndex: 100, alignItems: "center", justifyContent: "center" },
  aiInner:   { alignItems: "center", gap: 20 },
  aiGlyph:   { fontSize: 72, shadowOpacity: 1, shadowRadius: 20, shadowOffset: { width: 0, height: 0 } },
  aiTitle:   { fontSize: f.xxl, fontWeight: "800", letterSpacing: 6, shadowOpacity: 1, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
  aiSub:     { fontSize: f.xs, letterSpacing: 3 },
  aiMsg:     { fontSize: f.sm, textAlign: "center", paddingHorizontal: 40, letterSpacing: 0.5, lineHeight: 20 },

  // Header
  header:           { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 8, paddingBottom: 24 },
  wordmark:         { fontSize: f.xxl, fontWeight: "900", letterSpacing: 6, shadowOpacity: 1, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
  location:         { fontSize: f.xs, letterSpacing: 2, marginTop: 4 },
  headerRight:      { flexDirection: "row", alignItems: "center", gap: 12 },
  themeToggle:      { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, borderWidth: 1 },
  themeToggleIcon:  { fontSize: 14 },
  themeToggleLabel: { fontSize: f.xs, fontWeight: "700", letterSpacing: 1 },
  statusDot:        { width: 14, height: 14, borderRadius: 7, shadowOpacity: 1, shadowRadius: 10, shadowOffset: { width: 0, height: 0 } },

  // Status strip
  statusStrip: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  statusLeft:  { flexDirection: "row", alignItems: "center", gap: 14 },
  statusBar:   { width: 3, height: 40, borderRadius: 2, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  statusLabel: { fontSize: f.xs, letterSpacing: 3, marginBottom: 4, fontWeight: "600" },
  statusLevel: { fontSize: f.xl, fontWeight: "800", letterSpacing: 4, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  triggerPill: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5 },
  triggerText: { fontSize: f.xs, fontWeight: "700", letterSpacing: 1.5 },

  // SOS
  sosWrap:  { alignItems: "center", justifyContent: "center", height: RING_SIZE + 40, marginVertical: 12 },
  sosRing:  { position: "absolute", width: RING_SIZE, height: RING_SIZE, borderRadius: RING_SIZE / 2, borderWidth: 1, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  sosBtn:   { width: SOS_SIZE, height: SOS_SIZE, borderRadius: SOS_SIZE / 2, borderWidth: 1, alignItems: "center", justifyContent: "center", shadowOpacity: 1, shadowRadius: 40, shadowOffset: { width: 0, height: 0 } },
  tapCount: { position: "absolute", top: 32, fontSize: f.md, fontWeight: "800", letterSpacing: 1 },
  sosLabel: { fontSize: 36, fontWeight: "900", letterSpacing: 8, shadowOpacity: 1, shadowRadius: 16, shadowOffset: { width: 0, height: 0 } },
  sosSub:   { fontSize: f.xs, letterSpacing: 3, marginTop: 8 },

  // Quick biometrics
  bioRow:  { flexDirection: "row" },
  bioCell: { flex: 1, alignItems: "center", paddingVertical: 8 },
  bioValue: { fontSize: f.xl, fontWeight: "700", letterSpacing: 1, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  bioUnit:  { fontSize: f.xs, fontWeight: "400" },
  bioLabel: { fontSize: 9, letterSpacing: 2.5, marginTop: 5, fontWeight: "600" },
  bioOff:   { fontSize: 8, letterSpacing: 1, marginTop: 2 },

  // EQ / HB
  eqWrap: { flexDirection: "row", alignItems: "flex-end", gap: 3, height: 28, marginVertical: 10 },
  eqBar:  { width: 3, height: 28, borderRadius: 2 },
  hbWrap: { flexDirection: "row", alignItems: "center", gap: 2, height: 28, marginVertical: 10 },
  hbBar:  { width: 4, borderRadius: 2 },

  // Guardian AI / sensor cards
  guardianSub:      { fontSize: f.xs, letterSpacing: 1, marginTop: 2 },
  sensorGrid:       { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  sensorCard:       { width: "47%", borderWidth: 1, borderRadius: 10, padding: 14, gap: 4 },
  sensorCardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 6 },
  sensorIconRow:    { flexDirection: "row", alignItems: "center", gap: 6 },
  sensorIcon:       { fontSize: 14 },
  sensorLabel:      { fontSize: 9, letterSpacing: 1.5, fontWeight: "700" },
  togglePill:       { borderWidth: 1, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 },
  toggleText:       { fontSize: 9, fontWeight: "800", letterSpacing: 1.5 },
  sensorValue:      { fontSize: f.xl, fontWeight: "700", letterSpacing: 0.5 },
  sensorUnit:       { fontSize: f.xs, fontWeight: "400" },
  sensorStatus:     { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 4 },
  statusPip:        { width: 5, height: 5, borderRadius: 3 },
  statusPipLabel:   { fontSize: 9, fontWeight: "700", letterSpacing: 1.5 },
  demoWrap:         { paddingTop: 16, borderTopWidth: StyleSheet.hairlineWidth, gap: 12 },
  demoHeading:      { fontSize: f.xs, letterSpacing: 3 },
  demoRow:          { flexDirection: "row", gap: 8 },
  demoBtn:          { flex: 1, paddingVertical: 10, borderRadius: 4, borderWidth: 1, alignItems: "center", shadowOpacity: 0.4, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  demoBtnText:      { fontSize: 9, fontWeight: "700", letterSpacing: 1 },

  // Alert
  alertSection:  { gap: 20 },
  stagePills:    { flexDirection: "row", gap: 10 },
  stagePill:     { flex: 1, borderWidth: 1, borderRadius: 4, paddingVertical: 8, alignItems: "center" },
  stagePillText: { fontSize: f.xs, fontWeight: "700", letterSpacing: 1.5 },
  alertMsg:      { borderLeftWidth: 2, paddingLeft: 16, gap: 4 },
  alertMsgTitle: { fontSize: f.sm, fontWeight: "800", letterSpacing: 1 },
  alertMsgBody:  { fontSize: f.xs, lineHeight: 18 },
  rangeWrap:     { gap: 10 },
  rangeLabel:    { fontSize: f.xs, letterSpacing: 2 },
  rangeRow:      { flexDirection: "row", gap: 8 },
  rangeBtn:      { flex: 1, paddingVertical: 10, borderRadius: 4, borderWidth: 1, alignItems: "center" },
  rangeBtnText:  { fontSize: f.xs, fontWeight: "700" },
  safeBtn:       { borderWidth: 1, borderRadius: 4, paddingVertical: 18, alignItems: "center", shadowOpacity: 0.5, shadowRadius: 16, shadowOffset: { width: 0, height: 0 } },
  safeBtnText:   { fontSize: f.md, fontWeight: "800", letterSpacing: 3 },

  // Section
  section:        { gap: 18 },
  sectionHeader:  { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  sectionTitleRow:{ flexDirection: "row", alignItems: "center", gap: 10 },
  sectionTitle:   { fontSize: f.xs, fontWeight: "700", letterSpacing: 3 },
  sectionCount:   { fontSize: f.xs, letterSpacing: 1 },
  aiGlyphSm:      { fontSize: 16, shadowOpacity: 1, shadowRadius: 8 },
  onlineBadge:    { flexDirection: "row", alignItems: "center", gap: 6 },
  onlineDot:      { width: 6, height: 6, borderRadius: 3, shadowOpacity: 1, shadowRadius: 6 },
  onlineText:     { fontSize: f.xs, fontWeight: "700", letterSpacing: 1.5 },

  // Contacts
  contactRow:       { flexDirection: "row", alignItems: "center", gap: 16, paddingVertical: 14 },
  contactAvatar:    { width: 42, height: 42, borderRadius: 6, borderWidth: 1, alignItems: "center", justifyContent: "center", position: "relative" },
  contactInitial:   { fontSize: f.lg, fontWeight: "800" },
  onlineIndicator:  { position: "absolute", top: -4, right: -4, width: 10, height: 10, borderRadius: 5, borderWidth: 2, shadowOpacity: 1, shadowRadius: 6 },
  contactName:      { fontSize: f.md, fontWeight: "600", letterSpacing: 0.5 },
  contactRole:      { fontSize: f.xs, letterSpacing: 2, marginTop: 2 },
  contactPhone:     { fontSize: f.xs, letterSpacing: 0.5 },

  // Area safety
  riskBadge:      { borderWidth: 1, borderRadius: 4, paddingHorizontal: 10, paddingVertical: 4 },
  riskBadgeText:  { fontSize: f.xs, fontWeight: "800", letterSpacing: 2, shadowOpacity: 1, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  scoreWrap:      { gap: 8 },
  scoreRow:       { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  scoreLabel:     { fontSize: f.xs, letterSpacing: 2 },
  scoreValue:     { fontSize: f.xl, fontWeight: "800", letterSpacing: 1 },
  scoreMax:       { fontSize: f.xs, fontWeight: "400" },
  scoreTrack:     { height: 3, borderRadius: 2, overflow: "hidden" },
  scoreFill:      { height: 3, borderRadius: 2, shadowOpacity: 1, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  scoreFooter:    { flexDirection: "row", justifyContent: "space-between" },
  scoreFooterText:{ fontSize: 9, letterSpacing: 1 },
  warningBanner:  { flexDirection: "row", alignItems: "flex-start", gap: 10, borderWidth: 1, borderLeftWidth: 3, borderRadius: 6, padding: 12 },
  warningIcon:    { fontSize: f.md, marginTop: 1 },
  warningText:    { flex: 1, fontSize: f.xs, lineHeight: 18, letterSpacing: 0.3 },
  statsRow:       { flexDirection: "row", borderWidth: StyleSheet.hairlineWidth, borderRadius: 8, overflow: "hidden" },
  statCell:       { flex: 1, alignItems: "center", paddingVertical: 14, gap: 3 },
  statValue:      { fontSize: f.xl, fontWeight: "800", letterSpacing: 1 },
  statLabel:      { fontSize: 9, letterSpacing: 2, fontWeight: "700" },
  statSub:        { fontSize: 9, letterSpacing: 0.5 },
  crimesWrap:     { gap: 12 },
  crimesTitle:    { fontSize: 9, letterSpacing: 3, fontWeight: "700" },
  crimeRow:       { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12 },
  crimeDot:       { width: 8, height: 8, borderRadius: 4, shadowOpacity: 1, shadowRadius: 6, shadowOffset: { width: 0, height: 0 } },
  crimeType:      { fontSize: f.sm, fontWeight: "600", letterSpacing: 0.3 },
  crimeMeta:      { fontSize: f.xs, letterSpacing: 0.5, marginTop: 2 },
  crimePill:      { borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  crimePillText:  { fontSize: 9, fontWeight: "800", letterSpacing: 1 },

  // Voice SOS
  voiceWrap:    { marginTop: 20 },
  voiceBtn:     { flexDirection: "row", alignItems: "center", gap: 14, borderWidth: 1, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 14 },
  voiceIcon:    { fontSize: 22, shadowOpacity: 1, shadowRadius: 8, shadowOffset: { width: 0, height: 0 } },
  voiceBtnText: { fontSize: f.sm, fontWeight: "700", letterSpacing: 2, marginBottom: 2 },
  voiceBtnSub:  { fontSize: f.xs, letterSpacing: 0.5 },
  voiceBars:    { flexDirection: "row", alignItems: "center", gap: 2 },
  voiceBar:     { width: 3, borderRadius: 2 },

  // Walk Home Journey
  journeyActive:    { gap: 16 },
  journeyTimerWrap: { alignItems: "center", gap: 8, paddingVertical: 16 },
  journeyTimerLabel:{ fontSize: f.xs, letterSpacing: 3 },
  journeyTimer:     { fontSize: 56, fontWeight: "900", letterSpacing: 4, shadowOpacity: 1, shadowRadius: 20, shadowOffset: { width: 0, height: 0 } },
  journeyTimerSub:  { fontSize: f.xs, letterSpacing: 0.8, textAlign: "center", paddingHorizontal: 20, lineHeight: 18 },
  journeyStartBtn:  { borderWidth: 1, borderRadius: 4, paddingVertical: 16, alignItems: "center", shadowOpacity: 0.4, shadowRadius: 12, shadowOffset: { width: 0, height: 0 } },
  journeyStartText: { fontSize: f.sm, fontWeight: "800", letterSpacing: 2 },
  journeyNote:      { fontSize: f.xs, letterSpacing: 0.3, lineHeight: 18, textAlign: "center" },

  // Alert location + notification status
  locationBlock:  { borderWidth: 1, borderRadius: 8, padding: 14 },
  locationRow:    { flexDirection: "row", alignItems: "flex-start", gap: 12 },
  locationIcon:   { fontSize: 16, marginTop: 2, shadowOpacity: 1, shadowRadius: 6 },
  locationLabel:  { fontSize: 9, letterSpacing: 2, fontWeight: "700", marginBottom: 3 },
  locationCoords: { fontSize: f.sm, fontWeight: "700", letterSpacing: 0.5 },
  locationArea:   { fontSize: f.xs, letterSpacing: 0.3, marginTop: 2 },
  locationTime:   { fontSize: 9, letterSpacing: 0.5, alignSelf: "flex-start" },
  notifWrap:      { borderWidth: StyleSheet.hairlineWidth, borderRadius: 8, overflow: "hidden" },
  notifTitle:     { fontSize: 9, letterSpacing: 3, fontWeight: "700", paddingHorizontal: 14, paddingTop: 12, paddingBottom: 8 },
  notifRow:       { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 14, paddingVertical: 10 },
  notifDot:       { width: 6, height: 6, borderRadius: 3 },
  notifName:      { fontSize: f.xs, letterSpacing: 0.3, flex: 1 },
  notifStatus:    { fontSize: 9, fontWeight: "800", letterSpacing: 1.5 },

  // Contacts helper toggle
  helperToggleWrap:  { flexDirection: "row", alignItems: "center", gap: 14, borderWidth: 1, borderRadius: 8, padding: 14, marginTop: 4 },
  helperToggleTitle: { fontSize: f.xs, fontWeight: "800", letterSpacing: 1.5, marginBottom: 4 },
  helperToggleSub:   { fontSize: f.xs, letterSpacing: 0.3, lineHeight: 16 },
});
