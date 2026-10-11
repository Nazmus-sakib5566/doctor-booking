import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ImageSourcePropType,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    useWindowDimensions,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SideMenu from "./sidemenu";

/**
 * IMAGE GUIDE
 * Figma theke export kore assets/images/ e rakho, tarpor niche
 * `undefined` er jaygay require("../assets/images/xxx.png") boshao.
 * Image na dile pastel placeholder dekhabe, app crash korbe na.
 */
const AVATAR: ImageSourcePropType | undefined = undefined;
const FAMILY_BANNER: ImageSourcePropType | undefined = undefined;

type Symptom = {
  id: string;
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
};

const SYMPTOMS: Symptom[] = [
  { id: "1", label: "fever", icon: "thermometer" },
  { id: "2", label: "Periods Issue", icon: "water-outline" },
  { id: "3", label: "Skin care", icon: "face-woman-outline" },
  { id: "4", label: "Pregnancy", icon: "human-pregnant" },
  { id: "5", label: "Anxiety", icon: "account-alert-outline" },
  { id: "6", label: "Sexual problem", icon: "human-male-female" },
  { id: "7", label: "Hair Fall", icon: "face-man-outline" },
  { id: "8", label: "Depression", icon: "brain" },
];

type DoctorTile = {
  id: string;
  label: string;
  color: string;
  image?: ImageSourcePropType;
};

const DOCTOR_TILES: DoctorTile[] = [
  { id: "1", label: "Dental Care", color: "#D9E9F7" },
  { id: "2", label: "Leg Pain", color: "#DCE8F5" },
  { id: "3", label: "Pregnancy Care", color: "#E3EAF3" },
  { id: "4", label: "General Care", color: "#E1E3F5" },
  { id: "5", label: "Pediatrician", color: "#DDE9F4" },
  { id: "6", label: "Nephrology", color: "#E6E6F0" },
  { id: "7", label: "Dermatology", color: "#F3E4E4" },
  { id: "8", label: "Orthopaedics", color: "#DDE6F3" },
  { id: "9", label: "Gynaecologist", color: "#E3E8F2" },
];

export default function HomeScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [showMenu, setShowMenu] = useState(false);

  const PAD = 16;
  const symptomSize = (width - PAD * 2 - 10 * 3) / 4;
  const tileSize = (width - PAD * 2 - 12 * 2) / 3;

  const openCondition = (name: string) =>
    router.push({ pathname: "/thyroid", params: { condition: name } });

  const renderTiles = () => (
    <View style={[styles.grid, { paddingHorizontal: PAD, gap: 12 }]}>
      {DOCTOR_TILES.map((d) => (
        <TouchableOpacity
          key={d.id}
          activeOpacity={0.85}
          style={{ width: tileSize }}
          onPress={() => openCondition(d.label)}
        >
          {d.image ? (
            <Image
              source={d.image}
              style={[styles.tileImg, { width: tileSize, height: tileSize }]}
            />
          ) : (
            <View
              style={[
                styles.tileImg,
                { width: tileSize, height: tileSize, backgroundColor: d.color },
              ]}
            />
          )}
          <Text style={styles.tileLabel}>{d.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* ---------- HEADER ---------- */}
        <SafeAreaView edges={["top"]} style={styles.headerWrap}>
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <TouchableOpacity hitSlop={10} onPress={() => setShowMenu(true)}>
                <Ionicons name="menu" size={32} color="#fff" />
              </TouchableOpacity>
              <View style={styles.avatar}>
                {AVATAR ? (
                  <Image source={AVATAR} style={styles.avatarImg} />
                ) : (
                  <Ionicons name="person" size={20} color="#fff" />
                )}
              </View>
            </View>
            <Text style={styles.greet}>How you doing</Text>
            <Text style={styles.name}>Rahul</Text>
          </View>
        </SafeAreaView>

        {/* ---------- SEARCH ---------- */}
        <View style={styles.searchCard}>
          <TextInput
            placeholder="Search the specialist.."
            placeholderTextColor="#9AA0A6"
            style={styles.searchInput}
          />
          <Ionicons name="search-outline" size={20} color="#B0B5BA" />
        </View>

        {/* ---------- COMMON SYMPTOMS ---------- */}
        <View style={[styles.sectionHead, { paddingHorizontal: PAD + 4 }]}>
          <Text style={styles.sectionTitle}>Common Symptoms</Text>
          <TouchableOpacity hitSlop={8}>
            <Text style={styles.more}>more...</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.grid, { paddingHorizontal: PAD, gap: 10 }]}>
          {SYMPTOMS.map((s) => (
            <TouchableOpacity
              key={s.id}
              activeOpacity={0.8}
              style={{
                width: symptomSize,
                alignItems: "center",
                marginBottom: 12,
              }}
              onPress={() => openCondition(s.label)}
            >
              <View
                style={[
                  styles.symptomBox,
                  { width: symptomSize * 0.85, height: symptomSize * 0.85 },
                ]}
              >
                <MaterialCommunityIcons
                  name={s.icon}
                  size={30}
                  color="#7B3FE4"
                />
              </View>
              <Text style={styles.symptomLabel} numberOfLines={1}>
                {s.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ---------- FAMILY BANNER ---------- */}
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.bannerWrap}
          onPress={() => router.push({ pathname: "/appointment" })}
        >
          {FAMILY_BANNER ? (
            <Image
              source={FAMILY_BANNER}
              style={styles.banner}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.banner, styles.bannerPlaceholder]}>
              <Text style={styles.bannerText}>
                Keep your FAMILY safe{"\n"}CONSULT ONLINE
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {/* ---------- SPECIALIZED DOCTORS ---------- */}
        <Text style={[styles.groupTitle, { marginHorizontal: PAD + 4 }]}>
          Specialized Doctors
        </Text>
        {renderTiles()}

        {/* ---------- SUPER SPECIALITY ---------- */}
        <Text
          style={[
            styles.groupTitle,
            { marginHorizontal: PAD + 4, marginTop: 22 },
          ]}
        >
          Super Speciality
        </Text>
        {renderTiles()}
      </ScrollView>

      {/* niche blue curve decoration */}
      <View pointerEvents="none" style={styles.bottomCurve} />

      {/* ---------- SIDE MENU ---------- */}
      <SideMenu
        visible={showMenu}
        onClose={() => setShowMenu(false)}
        userName="Rahul"
        onItemPress={(id) => {
          if (id === "consult") router.push("/appointment" as any);
          if (id === "prescription") router.push("/prescriptions" as any);
          if (id === "transaction") router.push("/transactions" as any);
          if (id === "about") router.push("/about" as any);
          // TODO: lifeline, terms, privacy, help er screen
        }}
      />
    </View>
  );
}

const BLUE = "#0A5CFF";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  /* header */
  headerWrap: { backgroundColor: BLUE, borderBottomRightRadius: 44 },
  header: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 46 },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  greet: { color: "#fff", fontSize: 14, marginTop: 14 },
  name: { color: "#fff", fontSize: 24, fontWeight: "700", marginTop: 2 },

  /* search */
  searchCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: -22,
    paddingHorizontal: 14,
    height: 42,
    borderRadius: 8,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  searchInput: { flex: 1, fontSize: 12, color: "#111" },

  /* sections */
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 12, fontWeight: "600", color: "#222" },
  more: { fontSize: 10, color: BLUE, fontWeight: "600" },
  grid: { flexDirection: "row", flexWrap: "wrap" },

  /* symptoms */
  symptomBox: {
    borderWidth: 1,
    borderColor: "#DADDE1",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FAFAFC",
  },
  symptomLabel: { fontSize: 9, color: "#333", marginTop: 6 },

  /* banner */
  bannerWrap: { marginHorizontal: 18, marginTop: 4 },
  banner: { width: "100%", height: 96, borderRadius: 4 },
  bannerPlaceholder: {
    backgroundColor: "#2BC8C8",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  /* doctor tiles */
  groupTitle: {
    fontSize: 11,
    fontWeight: "700",
    color: "#222",
    marginTop: 22,
    marginBottom: 12,
  },
  tileImg: { borderRadius: 4 },
  tileLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
    marginTop: 6,
    marginBottom: 6,
  },

  /* bottom curve */
  bottomCurve: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 110,
    height: 40,
    backgroundColor: BLUE,
    borderTopRightRadius: 44,
  },
});
