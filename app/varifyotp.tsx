import React, { useEffect, useRef, useState } from "react";
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

const logo = require("./assets/logo.png");
const illustration = require("./assets/illustration.png");

const OTP_LENGTH = 4;
const RESEND_SECONDS = 30;

type VerifyOtpScreenProps = {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
  route?: {
    params?: {
      phone?: string;
    };
  };
};

export default function VerifyOtpScreen({
  navigation,
  route,
}: VerifyOtpScreenProps) {
  const phone = route?.params?.phone;
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [seconds, setSeconds] = useState(RESEND_SECONDS);
  const inputs = useRef<Array<TextInput | null>>([]);

  // Resend countdown
  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const handleChange = (text: string, index: number) => {
    const digit = text.replace(/[^0-9]/g, "").slice(-1);
    const next = [...otp];
    next[index] = digit;
    setOtp(next);
    if (digit && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const handleKeyPress = (
    { nativeEvent }: { nativeEvent: { key: string } },
    index: number,
  ) => {
    if (nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      const next = [...otp];
      next[index - 1] = "";
      setOtp(next);
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      Alert.alert("Incomplete", "Please enter the 4 digit code");
      return;
    }
    // TODO: API call kore OTP verify koro
    navigation?.navigate("Login");
  };

  const handleResend = () => {
    if (seconds > 0) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    inputs.current[0]?.focus();
    setSeconds(RESEND_SECONDS);
    // TODO: API call kore notun OTP pathao
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
          <View style={styles.logoWrap}>
            <Image source={logo} style={styles.logo} resizeMode="contain" />
          </View>

          <Image
            source={illustration}
            style={styles.illustration}
            resizeMode="contain"
          />

          <View style={styles.form}>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Please enter the one time password
            </Text>

            <View style={styles.otpRow}>
              {otp.map((value, i) => (
                <TextInput
                  key={i}
                  ref={(r) => {
                    inputs.current[i] = r;
                  }}
                  style={[styles.otpBox, value && styles.otpBoxFilled]}
                  value={value}
                  onChangeText={(t) => handleChange(t, i)}
                  onKeyPress={(e) => handleKeyPress(e, i)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  autoFocus={i === 0}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={handleVerify}
            >
              <Text style={styles.buttonText}>Verify</Text>
            </TouchableOpacity>

            <View style={styles.resendRow}>
              <Text style={styles.resendText}>Didn't get OTP? </Text>
              <TouchableOpacity onPress={handleResend} disabled={seconds > 0}>
                <Text style={[styles.link, seconds > 0 && styles.linkDisabled]}>
                  {seconds > 0 ? `Resend OTP (${seconds}s)` : "Resend OTP"}
                </Text>
              </TouchableOpacity>
            </View>
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
  subtitle: { fontSize: 12, color: "#333", marginTop: 8, marginBottom: 16 },
  otpRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 18,
  },
  otpBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#C9CDD2",
    borderRadius: 4,
    marginHorizontal: 8,
    fontSize: 18,
    color: "#111",
    backgroundColor: "#fff",
  },
  otpBoxFilled: { borderColor: BLUE },
  button: {
    height: 40,
    backgroundColor: BLUE,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 8,
  },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
  },
  resendText: { fontSize: 11, color: "#333" },
  link: { color: BLUE, fontSize: 11, fontWeight: "600" },
  linkDisabled: { color: "#9AA0A6" },
});
