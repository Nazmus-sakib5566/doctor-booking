import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    Linking,
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
const FAMILY_BANNER: ImageSourcePropType | undefined = undefined;

// TODO: nijer asol text/link dao
const WHY_US =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.";

const MISSION =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.";

const SOCIALS: {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  url: string;
}[] = [
  { id: "fb", icon: "logo-facebook", url: "https://facebook.com" },
  { id: "ig", icon: "logo-instagram", url: "https://instagram.com" },
  { id: "tw", icon: "logo-twitter", url: "https://twitter.com" },
  { id: "wa", icon: "logo-whatsapp", url: "https://wa.me/" },
];

export default function AboutScreen() {
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About Us</Text>
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
        <Text style={styles.heading}>Why us</Text>
        <Text style={styles.paragraph}>{WHY_US}</Text>

        {/* Family banner */}
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

        <Text style={styles.heading}>Mission</Text>
        <Text style={styles.paragraph}>{MISSION}</Text>

        {/* Social */}
        <View style={styles.followRow}>
          <Text style={styles.followText}>Follow us on:</Text>
          {SOCIALS.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={styles.socialBtn}
              activeOpacity={0.8}
              onPress={() => Linking.openURL(s.url)}
            >
              <Ionicons name={s.icon} size={14} color="#fff" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* niche blue curve decoration */}
      <View pointerEvents="none" style={styles.bottomCurve} />
    </View>
  );
}

const BLUE = "#0A5CFF";

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
    fontSize: 15,
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

  /* body */
  body: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 100 },
  heading: {
    fontSize: 11,
    fontWeight: "700",
    color: "#111",
    marginBottom: 6,
    marginTop: 6,
  },
  paragraph: { fontSize: 8, color: "#555", lineHeight: 13, marginBottom: 12 },

  banner: { width: "100%", height: 80, borderRadius: 3, marginVertical: 8 },
  bannerPlaceholder: {
    backgroundColor: "#2BC8C8",
    alignItems: "center",
    justifyContent: "center",
  },
  bannerText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  /* social */
  followRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 8,
  },
  followText: { fontSize: 9, fontWeight: "700", color: "#111", marginRight: 4 },
  socialBtn: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  /* bottom curve */
  bottomCurve: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 130,
    height: 44,
    backgroundColor: BLUE,
    borderTopLeftRadius: 44,
  },
});
