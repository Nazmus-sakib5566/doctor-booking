import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MethodId = "card" | "netbanking" | "wallet" | "upi" | "paylater";

type Method = {
  id: MethodId;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const METHODS: Method[] = [
  {
    id: "card",
    title: "Card",
    subtitle: "Visa, Master Card, Rs-Pay & More",
    icon: "card-outline",
  },
  {
    id: "netbanking",
    title: "Netbanking",
    subtitle: "All Indian banks",
    icon: "business-outline",
  },
  {
    id: "wallet",
    title: "Wallet",
    subtitle: "Mobikwik & More",
    icon: "wallet-outline",
  },
  {
    id: "upi",
    title: "UPI",
    subtitle: "Instant payment using UPI App",
    icon: "phone-portrait-outline",
  },
  {
    id: "paylater",
    title: "Pay Later",
    subtitle: "Pay later using ICICI Bank PayLater",
    icon: "time-outline",
  },
];

export default function PaymentMethodScreen() {
  const router = useRouter();
  // /payment-method?amount=159.20&orderNumber=2399&phone=+91...&email=...
  const { amount, orderNumber, phone, email } = useLocalSearchParams<{
    amount?: string;
    orderNumber?: string;
    phone?: string;
    email?: string;
  }>();

  const amt = Number(amount ?? 159.2).toFixed(2);
  const order = orderNumber ?? "2399";
  const [selected, setSelected] = useState<MethodId | null>(null);

  const handleProceed = () => {
    if (!selected) {
      Alert.alert("Select payment method", "Please choose a payment method");
      return;
    }
    if (selected === "upi") {
      router.push({
        pathname: "/upi",
        params: {
          amount: amt,
          orderNumber: order,
          phone: phone ?? "+918129962325",
        },
      });
      return;
    }
    // TODO: baki method gulor screen (card, netbanking, wallet, paylater)
    Alert.alert("Coming soon", `${selected} payment ekhono toiri hoy nai`);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment</Text>
            <Text style={styles.headerAmount}>₹ {amt}</Text>
          </View>
          <Text style={styles.orderText}>Your Order Number : {order}</Text>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* contact row */}
        <View style={styles.contactRow}>
          <Ionicons name="call-outline" size={16} color="#444" />
          <Text style={styles.contactText} numberOfLines={1}>
            {phone ?? "+918129962325"}
            {"  |  "}
            {email ?? "wecreativeives@gmail.com"}
          </Text>
          <TouchableOpacity
            style={styles.editBtn}
            hitSlop={8}
            onPress={() => router.push({ pathname: "/payment-contact" } as never)}
          >
            <Text style={styles.editText}>Edit</Text>
            <Ionicons name="chevron-down" size={12} color={BLUE} />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionLabel}>CARDS, NETBANKING & MORE</Text>

        {METHODS.map((m) => {
          const active = selected === m.id;
          return (
            <TouchableOpacity
              key={m.id}
              activeOpacity={0.7}
              style={[styles.methodRow, active && styles.methodRowActive]}
              onPress={() => setSelected(m.id)}
            >
              <View style={styles.iconBox}>
                <Ionicons name={m.icon} size={18} color={BLUE} />
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.methodTitle}>{m.title}</Text>
                <Text style={styles.methodSub}>{m.subtitle}</Text>
              </View>
              <Ionicons
                name={active ? "checkmark-circle" : "chevron-forward"}
                size={active ? 18 : 14}
                color={active ? BLUE : "#9AA0A6"}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* ---------- PROCEED ---------- */}
      <TouchableOpacity
        style={styles.proceedBar}
        activeOpacity={0.9}
        onPress={handleProceed}
      >
        <SafeAreaView edges={["bottom"]}>
          <Text style={styles.proceedText}>Proceed</Text>
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
  header: { paddingHorizontal: 16, paddingTop: 10, paddingBottom: 24 },
  headerRow: { flexDirection: "row", alignItems: "center" },
  headerTitle: {
    flex: 1,
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    marginLeft: 6,
  },
  headerAmount: { color: "#fff", fontSize: 15, fontWeight: "700" },
  orderText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 8,
    marginLeft: 28,
  },

  /* contact */
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F2",
  },
  contactText: { flex: 1, fontSize: 9, color: "#444", marginLeft: 8 },
  editBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
  editText: { fontSize: 10, color: BLUE, fontWeight: "600" },

  sectionLabel: {
    fontSize: 8,
    fontWeight: "600",
    color: "#777",
    letterSpacing: 0.3,
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 6,
  },

  /* methods */
  methodRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F1F3",
  },
  methodRowActive: { backgroundColor: "#EAF1FF" },
  iconBox: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  methodTitle: { fontSize: 11, fontWeight: "700", color: "#222" },
  methodSub: { fontSize: 8, color: "#666", marginTop: 2 },

  /* proceed */
  proceedBar: { backgroundColor: BLUE, paddingTop: 16, paddingBottom: 4 },
  proceedText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 12,
  },
});
