import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
    FlatList,
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

type Prescription = {
  id: string;
  title: string;
  doctor: string;
  department: string;
  date: string;
};

// TODO: ei data API theke ano
const PRESCRIPTIONS: Prescription[] = [
  {
    id: "1",
    title: "Abdominal pain",
    doctor: "Dr. Anwar Rasheed",
    department: "General Care",
    date: "20/07/2020",
  },
  {
    id: "2",
    title: "Thyroid Consultation",
    doctor: "Dr. Dileep Nair",
    department: "Pediatric Care",
    date: "11/06/2020",
  },
  {
    id: "3",
    title: "Fever",
    doctor: "Dr. Mahesh Bhat",
    department: "General Care",
    date: "11/03/2020",
  },
];

export default function PrescriptionsScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: Prescription }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>

      <View style={styles.cardBody}>
        <View>
          <Text style={styles.doctor}>{item.doctor}</Text>
          <Text style={styles.department}>{item.department}</Text>
          <TouchableOpacity
            style={styles.viewBtn}
            activeOpacity={0.85}
            onPress={() => {
              // TODO: prescription detail / PDF dekhao
              console.log("View prescription", item.id);
            }}
          >
            <Text style={styles.viewText}>View</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.date}>
          Date : <Text style={styles.dateBold}>{item.date}</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Prescriptions</Text>
          <View style={styles.avatar}>
            {AVATAR ? (
              <Image source={AVATAR} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={18} color="#fff" />
            )}
          </View>
        </View>
      </SafeAreaView>

      {/* ---------- LIST ---------- */}
      <FlatList
        data={PRESCRIPTIONS}
        keyExtractor={(p) => p.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No prescriptions yet</Text>
        }
      />

      {/* niche blue curve decoration */}
      <View pointerEvents="none" style={styles.bottomCurve} />
    </View>
  );
}

const BLUE = "#0A5CFF";
const TEAL = "#19C9C0";

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

  /* list */
  list: { padding: 16, paddingTop: 22, paddingBottom: 90, gap: 14 },
  empty: { textAlign: "center", color: "#888", fontSize: 12, marginTop: 40 },

  card: {
    borderWidth: 1,
    borderColor: TEAL,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#fff",
  },
  cardTitle: { fontSize: 11, fontWeight: "700", color: BLUE },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginTop: 8,
  },
  doctor: { fontSize: 9, fontWeight: "700", color: "#111" },
  department: { fontSize: 8, color: TEAL, marginTop: 2 },
  viewBtn: {
    alignSelf: "flex-start",
    backgroundColor: BLUE,
    borderRadius: 2,
    paddingHorizontal: 14,
    paddingVertical: 3,
    marginTop: 6,
  },
  viewText: { color: "#fff", fontSize: 8, fontWeight: "600" },
  date: { fontSize: 8, color: "#333" },
  dateBold: { fontWeight: "700", color: "#111" },

  /* bottom curve */
  bottomCurve: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 90,
    height: 40,
    backgroundColor: BLUE,
    borderTopLeftRadius: 40,
  },
});
