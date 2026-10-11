import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ImageSourcePropType,
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

// Figma theke image export kore assets/images/ e rakho, tarpor require boshao
const AVATAR: ImageSourcePropType | undefined = undefined;

export default function PaymentContactScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    amount?: string;
    orderNumber?: string;
    phone?: string;
    email?: string;
  }>();

  const [phone, setPhone] = useState(params.phone ?? "+91");
  const [email, setEmail] = useState(params.email ?? "");

  const handleProceed = () => {
    if (phone.replace(/\D/g, "").length < 12) {
      Alert.alert(
        "Invalid phone",
        "Please enter phone number with country code",
      );
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      Alert.alert("Invalid email", "Please enter a valid email address");
      return;
    }
    // payment-method screen e ferot jao, notun phone/email shoho
    router.navigate({
      pathname: "/paymentmethod",
      params: {
        amount: params.amount,
        orderNumber: params.orderNumber,
        phone: phone.trim(),
        email: email.trim(),
      },
    });
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.avatar}>
            {AVATAR ? (
              <Image source={AVATAR} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={18} color="#fff" />
            )}
          </View>
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
          {/* Phone */}
          <Text style={styles.label}>Phone with Country Code</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={15}
            />
            <Ionicons name="call-outline" size={16} color="#666" />
          </View>

          {/* Email */}
          <Text style={[styles.label, { marginTop: 26 }]}>Email</Text>
          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="you@example.com"
              placeholderTextColor="#B0B5BA"
            />
            <Ionicons name="mail-outline" size={16} color="#666" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* secure note */}
      <View style={styles.secureRow}>
        <Ionicons name="lock-closed" size={11} color="#888" />
        <Text style={styles.secureText}>
          This payment is secured by Razorpay
        </Text>
      </View>

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

  /* form */
  body: { paddingHorizontal: 22, paddingTop: 28 },
  label: { fontSize: 9, color: "#777" },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EA",
  },
  input: {
    flex: 1,
    fontSize: 11,
    color: "#222",
    paddingVertical: 8,
    paddingHorizontal: 0,
  },

  /* secure + proceed */
  secureRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 6,
  },
  secureText: { fontSize: 8, color: "#888" },
  proceedBar: { backgroundColor: BLUE, paddingTop: 16, paddingBottom: 4 },
  proceedText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 12,
  },
});
