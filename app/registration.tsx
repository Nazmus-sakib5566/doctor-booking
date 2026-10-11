import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// assets/images/ folder-e ei duita image rakho (Figma theke export koro)
const logo = require("../assets/images/logo.png");
const illustration = require("../assets/images/illustration.png");

export default function RegistrationScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState("");

  const handleSendOtp = () => {
    if (phone.length < 11) {
      Alert.alert("Invalid number", "Please enter a valid phone number");
      return;
    }
    // TODO: API call kore OTP pathao
    router.push({ pathname: "/varifyotp", params: { phone } });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoWrap}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>

          {/* Illustration */}
          <Image
            source={illustration}
            style={styles.illustration}
            resizeMode="contain"
          />

          {/* Form */}
          <View style={styles.form}>
            <Text style={styles.title}>Registration</Text>
            <Text style={styles.subtitle}>Please enter your mobile number</Text>

            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#9AA0A6"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              maxLength={14}
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={handleSendOtp}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/login")}>
              <Text style={styles.link}>Already Registered ? Login Here</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const BLUE = "#0066FF";

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  container: { flexGrow: 1, paddingHorizontal: 16, paddingBottom: 24 },
  logoWrap: { alignItems: "center", marginTop: 24 },
  logo: { width: 120, height: 60 },
  illustration: { width: "100%", height: 220, marginTop: 16 },
  form: { marginTop: 24 },
  title: { fontSize: 18, fontWeight: "700", color: "#111" },
  subtitle: { fontSize: 12, color: "#333", marginTop: 8, marginBottom: 14 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#C9CDD2",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#111",
    backgroundColor: "#fff",
  },
  button: {
    height: 44,
    backgroundColor: BLUE,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  link: {
    color: BLUE,
    fontSize: 11,
    fontWeight: "600",
    marginTop: 14,
  },
});
