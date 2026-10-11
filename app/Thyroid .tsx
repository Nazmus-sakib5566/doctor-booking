import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Figma theke image export kore assets/images/ e rakho, tarpor require boshao
const AVATAR: ImageSourcePropType | undefined = undefined;
const ONLINE_IMG: ImageSourcePropType | undefined = undefined; // "Consult Physicians Online" er doctor
const PACK_DOCTOR: ImageSourcePropType | undefined = undefined; // General Health Pack er doctor
const FAMILY_BANNER: ImageSourcePropType | undefined = undefined; // teal family banner

type Symptom = {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const SYMPTOMS: Symptom[] = [
  { id: "1", label: "fever", icon: "thermometer-outline" },
  { id: "2", label: "Cough", icon: "medkit-outline" },
  { id: "3", label: "Dry Cough", icon: "mic-outline" },
  { id: "4", label: "Throat pain", icon: "body-outline" },
  { id: "5", label: "Swelling", icon: "water-outline" },
  { id: "6", label: "Vomitation", icon: "sad-outline" },
];

const WHY_CHOOSE = [
  "Consult dermatologist and Cosmetologist",
  "Free followup",
  "All your health record stored in one convenient place",
  "Quick doctor Support",
];

export default function ConditionScreen() {
  const router = useRouter();
  // /thyroid?condition=Fever dile title bodle jabe
  const { condition } = useLocalSearchParams<{ condition?: string }>();
  const title = condition || "Thyroid";

  const goConsult = () => router.push("/payment");

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
          <View style={styles.avatar}>
            {AVATAR ? (
              <Image source={AVATAR} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={18} color="#fff" />
            )}
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.body}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- CONSULT ONLINE ---------- */}
        <View style={styles.onlineCard}>
          {ONLINE_IMG ? (
            <Image source={ONLINE_IMG} style={styles.onlineImg} />
          ) : (
            <View style={[styles.onlineImg, styles.imgPlaceholder]} />
          )}
          <View style={styles.onlineTextWrap}>
            <Text style={styles.onlineTitle}>Consult Physicians Online</Text>
            <Text style={styles.onlineSub}>
              Consult physicians online by video or by phone
            </Text>
            <TouchableOpacity
              style={styles.tealBtn}
              activeOpacity={0.85}
              onPress={goConsult}
            >
              <Text style={styles.tealBtnText}>Consult Now</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------- KNOW ABOUT ---------- */}
        <Text style={styles.heading}>
          Know about <Text style={styles.headingBold}>{title}</Text>
        </Text>
        <Text style={styles.paragraph}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>

        {/* ---------- SYMPTOMS ---------- */}
        <Text style={[styles.heading, { marginTop: 14 }]}>Symptoms</Text>
        <View style={styles.chipsWrap}>
          {SYMPTOMS.map((s) => (
            <View key={s.id} style={styles.chip}>
              <Ionicons name={s.icon} size={12} color="#0A5CFF" />
              <Text style={styles.chipText}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ---------- GENERAL HEALTH PACK ---------- */}
        <View style={styles.packCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.packTitle}>General Health Pack</Text>
            <Text style={styles.packLine}>
              Medical Condition: <Text style={styles.packBold}>{title}</Text>
            </Text>
            <Text style={styles.packLine}>
              Department: <Text style={styles.packBold}>Physician</Text>
            </Text>
            <TouchableOpacity
              style={[styles.tealBtn, { marginTop: 8 }]}
              activeOpacity={0.85}
              onPress={goConsult}
            >
              <Text style={styles.tealBtnText}>Consult</Text>
            </TouchableOpacity>
          </View>
          {PACK_DOCTOR ? (
            <Image
              source={PACK_DOCTOR}
              style={styles.packImg}
              resizeMode="contain"
            />
          ) : (
            <View style={[styles.packImg, styles.imgPlaceholder]} />
          )}
        </View>

        {/* ---------- FAMILY BANNER ---------- */}
        {FAMILY_BANNER ? (
          <Image
            source={FAMILY_BANNER}
            style={styles.familyBanner}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.familyBanner, styles.familyPlaceholder]}>
            <Text style={styles.familyText}>
              Keep your FAMILY safe{"\n"}CONSULT ONLINE
            </Text>
          </View>
        )}

        {/* ---------- WHY CHOOSE US ---------- */}
        <Text style={[styles.heading, { marginTop: 16 }]}>Why Choose Us ?</Text>
        {WHY_CHOOSE.map((t, i) => (
          <View key={i} style={styles.whyRow}>
            <View style={styles.radio} />
            <Text style={styles.whyText}>{t}</Text>
          </View>
        ))}
      </ScrollView>

      {/* niche blue curve decoration */}
      <View pointerEvents="none" style={styles.bottomCurve} />
    </View>
  );
}

const BLUE = "#0A5CFF";
const TEAL = "#19E3D3";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  /* header */
  headerWrap: { backgroundColor: BLUE, borderBottomRightRadius: 36 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 26,
  },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 6,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#4A83FF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: { width: 32, height: 32 },

  body: { padding: 16, paddingBottom: 90 },
  imgPlaceholder: { backgroundColor: "#D9E4F7" },

  /* online card */
  onlineCard: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E3E6EA",
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
  },
  onlineImg: { width: 80, height: 90, borderRadius: 4 },
  onlineTextWrap: { flex: 1, marginLeft: 10, alignItems: "center" },
  onlineTitle: { fontSize: 11, fontWeight: "700", color: BLUE },
  onlineSub: {
    fontSize: 8,
    color: "#444",
    textAlign: "center",
    marginTop: 4,
  },
  tealBtn: {
    backgroundColor: TEAL,
    borderRadius: 3,
    paddingHorizontal: 18,
    paddingVertical: 5,
    marginTop: 8,
    alignSelf: "center",
  },
  tealBtnText: { color: "#fff", fontSize: 10, fontWeight: "700" },

  /* text */
  heading: { fontSize: 12, color: "#222", marginTop: 14 },
  headingBold: { fontWeight: "700" },
  paragraph: {
    fontSize: 9,
    color: "#555",
    lineHeight: 14,
    marginTop: 6,
  },

  /* symptoms */
  chipsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
  chip: {
    width: "31%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFD3FF",
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  chipText: { fontSize: 9, color: "#444", marginLeft: 6 },

  /* health pack */
  packCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EAF1FF",
    borderWidth: 1,
    borderColor: "#BFD3FF",
    borderRadius: 4,
    padding: 10,
    marginTop: 16,
  },
  packTitle: { fontSize: 12, fontWeight: "700", color: BLUE },
  packLine: { fontSize: 8, color: "#666", marginTop: 3 },
  packBold: { fontWeight: "700", color: "#222" },
  packImg: { width: 90, height: 80, borderRadius: 4 },

  /* family banner */
  familyBanner: { width: "100%", height: 110, borderRadius: 4, marginTop: 14 },
  familyPlaceholder: {
    backgroundColor: "#2BC8C8",
    alignItems: "center",
    justifyContent: "center",
  },
  familyText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  /* why choose */
  whyRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  radio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#999",
    marginRight: 10,
  },
  whyText: { fontSize: 9, color: "#333" },

  /* bottom curve */
  bottomCurve: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 90,
    height: 40,
    backgroundColor: BLUE,
    borderTopRightRadius: 40,
  },
});
