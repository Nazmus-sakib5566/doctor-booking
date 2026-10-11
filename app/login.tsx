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

const logo = require("./assets/logo.png");
const illustration = require("./assets/illustration.png");

type LoginScreenProps = {
  navigation: {
    replace: (screen: string) => void;
    navigate: (screen: string) => void;
  };
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username.trim() || !password) {
      Alert.alert("Missing details", "Please enter user name and password");
      return;
    }
    // TODO: API call kore login koro
    navigation?.replace("Home");
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
            <TextInput
              style={styles.input}
              placeholder="User Name"
              placeholderTextColor="#9AA0A6"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
            />

            <TextInput
              style={[styles.input, { marginTop: 12 }]}
              placeholder="Password"
              placeholderTextColor="#9AA0A6"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation?.navigate("ForgotPassword")}
            >
              <Text style={[styles.link, { marginTop: 14 }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            <View style={styles.registerRow}>
              <Text style={styles.registerText}>No account? </Text>
              <TouchableOpacity
                onPress={() => navigation?.navigate("Registration")}
              >
                <Text style={styles.link}>Register</Text>
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
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#C9CDD2",
    borderRadius: 4,
    paddingHorizontal: 12,
    fontSize: 13,
    color: "#111",
    backgroundColor: "#fff",
  },
  button: {
    height: 40,
    backgroundColor: BLUE,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  buttonText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  link: { color: BLUE, fontSize: 11, fontWeight: "600" },
  registerRow: { flexDirection: "row", marginTop: 10 },
  registerText: { fontSize: 11, color: "#333", fontWeight: "600" },
});
