import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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

// TODO: expo-location diye GPS theke ei address ano
const CURRENT_ADDRESS =
  "GI, Thamarakullam Lane,\nSasthamangalam,\nTrivandrum-695010";

export default function OrderSummaryScreen() {
  const router = useRouter();

  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  const handleContinue = () => {
    if (!house.trim() || !street.trim() || !city.trim() || !state.trim()) {
      Alert.alert("Incomplete address", "Please fill in all address fields");
      return;
    }
    if (!/^\d{6}$/.test(pincode)) {
      Alert.alert("Invalid pincode", "Please enter a valid 6 digit pincode");
      return;
    }
    // TODO: address API/state e save koro
    router.push("/payment");
  };

  const fields = [
    { placeholder: "House/Flat/Block No.", value: house, set: setHouse },
    { placeholder: "Street/Landmark", value: street, set: setStreet },
    { placeholder: "City/Town", value: city, set: setCity },
    { placeholder: "State", value: state, set: setState },
  ];

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* ---------- HEADER ---------- */}
      <SafeAreaView edges={["top"]} style={styles.headerWrap}>
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Summary</Text>
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
          {/* Current location */}
          <View style={styles.locRow}>
            <View style={styles.locIcon}>
              <Ionicons name="location-outline" size={16} color={BLUE} />
            </View>
            <View style={{ marginLeft: 8 }}>
              <Text style={styles.locTitle}>Current Location</Text>
              <Text style={styles.locSub}>Using GPS</Text>
            </View>
          </View>

          <View style={styles.addressBox}>
            <Text style={styles.addressText}>{CURRENT_ADDRESS}</Text>
          </View>

          {/* Manual address */}
          <Text style={styles.enterTitle}>Enter Your Address</Text>

          {fields.map((f) => (
            <TextInput
              key={f.placeholder}
              style={styles.input}
              placeholder={f.placeholder}
              placeholderTextColor="#9AA0A6"
              value={f.value}
              onChangeText={f.set}
            />
          ))}

          <TextInput
            style={styles.input}
            placeholder="Pincode"
            placeholderTextColor="#9AA0A6"
            keyboardType="number-pad"
            maxLength={6}
            value={pincode}
            onChangeText={setPincode}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ---------- CONTINUE ---------- */}
      <TouchableOpacity
        style={styles.continueBar}
        activeOpacity={0.9}
        onPress={handleContinue}
      >
        <SafeAreaView edges={["bottom"]}>
          <Text style={styles.continueText}>Continue</Text>
        </SafeAreaView>
      </TouchableOpacity>
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

  /* body */
  body: { paddingHorizontal: 18, paddingTop: 22, paddingBottom: 20 },

  locRow: { flexDirection: "row", alignItems: "center" },
  locIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B9A8F5",
    alignItems: "center",
    justifyContent: "center",
  },
  locTitle: { fontSize: 11, fontWeight: "600", color: BLUE },
  locSub: { fontSize: 7, color: "#777", marginTop: 1 },

  addressBox: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: TEAL,
    backgroundColor: "#F6FFFE",
    borderRadius: 2,
    padding: 10,
  },
  addressText: { fontSize: 11, color: "#222", lineHeight: 17 },

  enterTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: BLUE,
    marginTop: 26,
    marginBottom: 6,
  },
  input: {
    height: 44,
    fontSize: 11,
    color: "#222",
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E6EA",
  },

  /* continue */
  continueBar: { backgroundColor: BLUE, paddingTop: 16, paddingBottom: 4 },
  continueText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    paddingBottom: 12,
  },
});
