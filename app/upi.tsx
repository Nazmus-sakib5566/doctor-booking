import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Method = "gpay" | "upiid";

export default function UpiPaymentScreen() {
  const router = useRouter();
  // /upi?amount=159.20&orderNumber=2399&phone=+918129962325
  const { amount, orderNumber, phone } = useLocalSearchParams<{
    amount?: string;
    orderNumber?: string;
    phone?: string;
  }>();

  const amt = Number(amount ?? 159.2).toFixed(2);
  const [method, setMethod] = useState<Method>("upiid");
  const [upiId, setUpiId] = useState("");

  const handlePay = () => {
    if (
      method === "upiid" &&
      !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(upiId.trim())
    ) {
      Alert.alert(
        "Invalid UPI ID",
        "Please enter a valid UPI ID (e.g. name@bank)",
      );
      return;
    }
    // TODO: payment API call (method + upiId)
    router.replace({
      pathname: "/appointment",
      params: { orderNumber: orderNumber ?? "2399" },
    });
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
          <Text style={styles.orderText}>
            Your Order Number : {orderNumber ?? "2399"}
          </Text>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.body}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* UPI top row */}
          <View style={styles.topRow}>
            <TouchableOpacity
              style={{ flexDirection: "row", alignItems: "center" }}
              onPress={() => router.back()}
            >
              <Ionicons name="chevron-back" size={14} color="#555" />
              <Text style={styles.topRowTitle}>UPI</Text>
            </TouchableOpacity>
            <Text style={styles.topRowPhone}>- {phone ?? "+918129962325"}</Text>
          </View>

          {/* GPay */}
          <Text style={styles.sectionLabel}>PAY USING GPAY APP</Text>
          <TouchableOpacity
            style={styles.optionRow}
            activeOpacity={0.8}
            onPress={() => setMethod("gpay")}
          >
            <View style={styles.gpayLogo}>
              <Text style={styles.gpayG}>G</Text>
            </View>
            <Text style={styles.optionTitle}>Google Pay</Text>
            <View style={{ flex: 1 }} />
            <Radio selected={method === "gpay"} />
          </TouchableOpacity>

          {/* UPI ID */}
          <Text style={styles.sectionLabel}>PAY USING UPI ID</Text>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setMethod("upiid")}
            style={[styles.upiCard, method === "upiid" && styles.upiCardActive]}
          >
            <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
              <View style={{ flex: 1 }}>
                <Text style={styles.upiTitle}>UPI ID</Text>
                <Text style={styles.upiSub}>
                  Google Pay, BHIM, PhonePe & more
                </Text>
              </View>
              <Radio selected={method === "upiid"} filled />
            </View>

            {method === "upiid" && (
              <TextInput
                style={styles.upiInput}
                placeholder="Enter your UPI ID"
                placeholderTextColor="#9AA0A6"
                autoCapitalize="none"
                autoCorrect={false}
                value={upiId}
                onChangeText={setUpiId}
              />
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ---------- PAY BAR ---------- */}
      <TouchableOpacity
        style={styles.payBar}
        activeOpacity={0.9}
        onPress={handlePay}
      >
        <SafeAreaView edges={["bottom"]}>
          <Text style={styles.payText}>PAY ₹ {amt}</Text>
        </SafeAreaView>
      </TouchableOpacity>
    </View>
  );
}

function Radio({ selected, filled }: { selected: boolean; filled?: boolean }) {
  if (selected && filled) {
    return (
      <View style={[styles.radio, styles.radioFilled]}>
        <Ionicons name="checkmark" size={11} color="#fff" />
      </View>
    );
  }
  return (
    <View style={[styles.radio, selected && { borderColor: BLUE }]}>
      {selected && <View style={styles.radioDot} />}
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

  body: { paddingTop: 20, paddingBottom: 30 },

  /* top row */
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEF0F2",
  },
  topRowTitle: { fontSize: 11, color: "#555", marginLeft: 2 },
  topRowPhone: { fontSize: 10, color: "#999", marginLeft: 10 },

  sectionLabel: {
    fontSize: 9,
    fontWeight: "600",
    color: "#666",
    letterSpacing: 0.3,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  /* options */
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  gpayLogo: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E3E6EA",
    alignItems: "center",
    justifyContent: "center",
  },
  gpayG: { fontSize: 12, fontWeight: "800", color: "#4285F4" },
  optionTitle: {
    fontSize: 11,
    fontWeight: "600",
    color: "#222",
    marginLeft: 10,
  },

  upiCard: {
    marginHorizontal: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "transparent",
  },
  upiCardActive: { backgroundColor: "#EAF1FF", borderColor: "#BFD3FF" },
  upiTitle: { fontSize: 11, fontWeight: "700", color: "#222" },
  upiSub: { fontSize: 9, color: "#555", marginTop: 3 },
  upiInput: {
    marginTop: 10,
    height: 34,
    paddingHorizontal: 0,
    fontSize: 11,
    color: "#111",
    borderBottomWidth: 1,
    borderBottomColor: "#BFD3FF",
  },

  /* radio */
  radio: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#C9CDD2",
    alignItems: "center",
    justifyContent: "center",
  },
  radioFilled: { backgroundColor: BLUE, borderColor: BLUE },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: BLUE },

  /* pay bar */
  payBar: { backgroundColor: BLUE, paddingTop: 16, paddingBottom: 4 },
  payText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 12,
  },
});
