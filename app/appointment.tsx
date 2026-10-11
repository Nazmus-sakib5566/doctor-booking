import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Figma theke image export kore assets/images/ e rakho, tarpor require boshao
const AVATAR: ImageSourcePropType | undefined = undefined;
const DOCTOR_IMG: ImageSourcePropType | undefined = undefined;

export default function AppointmentConfirmationScreen() {
  const router = useRouter();
  // /appointment?orderNumber=2399 dile order number bodle jabe
  const { orderNumber } = useLocalSearchParams<{ orderNumber?: string }>();

  // TODO: ei data gulo API theke ano
  const doctor = {
    name: "Dr. Fathima Ashraf",
    speciality: "Physician",
    qualification: "MBBS",
    rating: 5,
    ratedBy: 596,
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Appointment Confirmation</Text>
          <View style={styles.avatar}>
            {AVATAR ? (
              <Image source={AVATAR} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={18} color="#fff" />
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* ---------- BODY ---------- */}
      <View style={styles.body}>
        <Ionicons name="checkmark-circle-outline" size={64} color={BLUE} />

        <Text style={styles.confirmed}>Your Appointment is Confirmed</Text>
        <Text style={styles.orderNo}>
          Order Number : {orderNumber ?? "2399"}
        </Text>

        <Text style={styles.connected}>
          You are Now Connected to a Physician
        </Text>

        {/* Doctor card */}
        <View style={styles.doctorCard}>
          {DOCTOR_IMG ? (
            <Image source={DOCTOR_IMG} style={styles.doctorImg} />
          ) : (
            <View style={[styles.doctorImg, styles.imgPlaceholder]}>
              <Ionicons name="person" size={26} color="#fff" />
            </View>
          )}

          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.doctorName}>{doctor.name}</Text>
            <Text style={styles.doctorMeta}>{doctor.speciality}</Text>
            <Text style={styles.doctorMeta}>
              Qualification:{" "}
              <Text style={styles.metaBold}>{doctor.qualification}</Text>
            </Text>

            <View style={styles.ratingRow}>
              {Array.from({ length: 5 }, (_, i) => (
                <Ionicons
                  key={i}
                  name={i < doctor.rating ? "star" : "star-outline"}
                  size={11}
                  color="#FFB347"
                />
              ))}
              <Text style={styles.ratedBy}>
                ({doctor.ratedBy} people rated)
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* ---------- CHAT NOW ---------- */}
      <TouchableOpacity
        style={styles.chatBar}
        activeOpacity={0.9}
        onPress={() => {
          // TODO: chat screen e jao, jemon router.push("/chat")
        }}
      >
        <SafeAreaView edges={["bottom"]}>
          <Text style={styles.chatText}>Chat Now</Text>
        </SafeAreaView>
      </TouchableOpacity>
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
  body: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  confirmed: { fontSize: 12, fontWeight: "700", color: "#111", marginTop: 14 },
  orderNo: { fontSize: 12, fontWeight: "700", color: "#111", marginTop: 8 },
  connected: {
    fontSize: 12,
    fontWeight: "700",
    color: BLUE,
    marginTop: 40,
    marginBottom: 14,
  },

  /* doctor card */
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "stretch",
    borderWidth: 1,
    borderColor: "#BFD3FF",
    backgroundColor: "#F4F8FF",
    borderRadius: 4,
    padding: 8,
  },
  doctorImg: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  imgPlaceholder: { backgroundColor: "#9BB8F5" },
  doctorName: { fontSize: 12, fontWeight: "700", color: BLUE },
  doctorMeta: { fontSize: 9, color: BLUE, marginTop: 2 },
  metaBold: { fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 4 },
  ratedBy: { fontSize: 7, color: "#555", marginLeft: 4 },

  /* chat bar */
  chatBar: {
    backgroundColor: BLUE,
    paddingTop: 16,
    paddingBottom: 4,
  },
  chatText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 12,
  },
});
