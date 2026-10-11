import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ImageSourcePropType,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Figma theke image export kore assets/images/ e rakho, tarpor require boshao
const AVATAR: ImageSourcePropType | undefined = undefined;
const PHYSICIAN_IMG: ImageSourcePropType | undefined = undefined;

const CONSULTATION_FEE = 199.2;
const TAX = 39.8;

const money = (n: number) => `₹ ${n.toFixed(2)}`;

export default function PaymentScreen() {
  const router = useRouter();
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(39.8);

  const total = CONSULTATION_FEE - discount + TAX;

  const handleApply = () => {
    if (!promo.trim()) {
      Alert.alert("Promo code", "Please enter a promo code");
      return;
    }
    // TODO: API call kore promo code verify koro, tarpor setDiscount(...)
    setDiscount(39.8);
  };

  const handleCheckout = () => {
    // TODO: payment gateway / API call
    router.push("/appointment");
  };

  const Row = ({
    label,
    value,
    bold,
  }: {
    label: string;
    value: string;
    bold?: boolean;
  }) => (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.bold]}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Details</Text>
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
        {/* ---------- SERVICE CARD ---------- */}
        <View style={styles.serviceCard}>
          {PHYSICIAN_IMG ? (
            <Image source={PHYSICIAN_IMG} style={styles.serviceImg} />
          ) : (
            <View style={[styles.serviceImg, styles.imgPlaceholder]} />
          )}
          <View style={{ marginLeft: 14 }}>
            <Text style={styles.serviceTitle}>Consult Physician</Text>
            <Text style={styles.serviceFee}>
              Consultation Fee{"  "}
              <Text style={styles.serviceFeeAmt}>
                {money(CONSULTATION_FEE)}
              </Text>
            </Text>
          </View>
        </View>

        {/* ---------- PROMO ---------- */}
        <View style={styles.promoRow}>
          <View style={styles.promoInputWrap}>
            <Ionicons name="pricetag-outline" size={16} color="#9AA0A6" />
            <TextInput
              style={styles.promoInput}
              placeholder="Add Promo Code"
              placeholderTextColor="#9AA0A6"
              autoCapitalize="characters"
              value={promo}
              onChangeText={setPromo}
            />
          </View>
          <TouchableOpacity
            style={styles.applyBtn}
            activeOpacity={0.85}
            onPress={handleApply}
          >
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>

        {/* ---------- SUMMARY ---------- */}
        <View style={styles.summary}>
          <Row label="Consultation Fee" value={money(CONSULTATION_FEE)} />
          <Row label="Discount" value={money(discount)} />
          <Row label="Tax" value={money(TAX)} />
          <View style={styles.divider} />
          <Row label="Total" value={money(total)} bold />
        </View>
      </ScrollView>

      {/* ---------- CHECKOUT ---------- */}
      <TouchableOpacity
        style={styles.checkout}
        activeOpacity={0.9}
        onPress={handleCheckout}
      >
        <SafeAreaView edges={["bottom"]}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  );
}

const BLUE = "#0A5CFF";

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#fff" },

  /* header */
  headerWrap: {
    backgroundColor: BLUE,
    borderBottomRightRadius: 36,
  },
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

  body: { padding: 16, paddingBottom: 30 },

  /* service */
  serviceCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E3E6EA",
    borderRadius: 4,
    padding: 8,
  },
  serviceImg: { width: 56, height: 56, borderRadius: 4 },
  imgPlaceholder: { backgroundColor: "#D9E4F7" },
  serviceTitle: { fontSize: 14, fontWeight: "700", color: "#111" },
  serviceFee: { fontSize: 11, color: "#333", marginTop: 4 },
  serviceFeeAmt: { fontSize: 13, fontWeight: "700", color: "#111" },

  /* promo */
  promoRow: { flexDirection: "row", alignItems: "center", marginTop: 14 },
  promoInputWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderWidth: 1,
    borderColor: "#D5D8DC",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  promoInput: { flex: 1, marginLeft: 8, fontSize: 12, color: "#111" },
  applyBtn: {
    height: 40,
    backgroundColor: BLUE,
    borderRadius: 4,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  applyText: { color: "#fff", fontSize: 13, fontWeight: "700" },

  /* summary */
  summary: {
    borderWidth: 1,
    borderColor: "#E3E6EA",
    borderRadius: 4,
    padding: 12,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  rowLabel: { fontSize: 11, color: "#222" },
  rowValue: { fontSize: 11, color: "#222" },
  bold: { fontWeight: "700", color: "#111" },
  divider: { height: 1, backgroundColor: "#E3E6EA", marginVertical: 6 },

  /* checkout */
  checkout: {
    backgroundColor: BLUE,
    borderTopRightRadius: 24,
    paddingTop: 18,
    paddingBottom: 6,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 12,
  },
});
