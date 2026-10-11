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
const DOCTOR_IMG: ImageSourcePropType | undefined = undefined;

// Figma te 3-4 ta question hubohu same chhilo (placeholder), tomar nijer question dao
const QUESTIONS = [
  "All your Questions were answered?",
  "Communication is proper",
  "All your Questions were answered?",
  "All your Questions were answered?",
  "All your Questions were answered?",
];

export default function RateConsultationScreen() {
  const router = useRouter();
  // /rate-us?consultationNumber=1164
  const { consultationNumber } = useLocalSearchParams<{
    consultationNumber?: string;
  }>();

  // TODO: ei data gulo API theke ano
  const doctor = {
    name: "Dr. Fathima Ashraf",
    speciality: "Physician",
    qualification: "MBBS",
    rating: 5,
    ratedBy: 596,
  };

  const [answers, setAnswers] = useState<string[]>(QUESTIONS.map(() => ""));
  const [rating, setRating] = useState(0);

  const setAnswer = (text: string, i: number) =>
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? text : a)));

  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Rate the Doctor", "Please select a star rating");
      return;
    }
    // TODO: API call: { consultationNumber, answers, rating }
    Alert.alert("Thank you!", "Your feedback has been submitted", [
      { text: "OK", onPress: () => router.replace("/home") },
    ]);
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
          <Text style={styles.headerTitle}>Rate Us</Text>
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
          <View style={{ alignItems: "center" }}>
            <Ionicons name="checkmark-circle-outline" size={56} color={BLUE} />
            <Text style={styles.completed}>Your Consultation is Completed</Text>
            <Text style={styles.number}>
              Consultation Number : {consultationNumber ?? "1164"}
            </Text>
            <Text style={styles.tell}>Tell us what you think</Text>
          </View>

          {/* Doctor card */}
          <View style={styles.doctorCard}>
            {DOCTOR_IMG ? (
              <Image source={DOCTOR_IMG} style={styles.doctorImg} />
            ) : (
              <View style={[styles.doctorImg, styles.imgPlaceholder]}>
                <Ionicons name="person" size={22} color="#fff" />
              </View>
            )}
            <View style={{ marginLeft: 10, flex: 1 }}>
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
                    size={10}
                    color="#FFB347"
                  />
                ))}
                <Text style={styles.ratedBy}>
                  ({doctor.ratedBy} people rated)
                </Text>
              </View>
            </View>
          </View>

          {/* Questions */}
          <View style={{ marginTop: 18 }}>
            {QUESTIONS.map((q, i) => (
              <View key={i} style={{ marginTop: 14 }}>
                <Text style={styles.question}>{q}</Text>
                <TextInput
                  style={styles.answer}
                  value={answers[i]}
                  onChangeText={(t) => setAnswer(t, i)}
                />
              </View>
            ))}
          </View>

          {/* Star rating */}
          <View style={styles.starsRow}>
            {Array.from({ length: 5 }, (_, i) => (
              <TouchableOpacity
                key={i}
                hitSlop={6}
                onPress={() => setRating(i + 1)}
              >
                <Ionicons
                  name={i < rating ? "star" : "star-outline"}
                  size={30}
                  color={i < rating ? "#FFB347" : "#C9CDD2"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.rateLabel}>Rate the Doctor</Text>

          <TouchableOpacity
            style={styles.submit}
            activeOpacity={0.85}
            onPress={handleSubmit}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* niche blue curve decoration */}
      <View pointerEvents="none" style={styles.bottomCurve} />
    </View>
  );
}

const BLUE = "#0A5CFF";
const TEAL = "#19D3C8";

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
  body: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 90 },
  completed: { fontSize: 11, fontWeight: "700", color: "#111", marginTop: 12 },
  number: { fontSize: 11, fontWeight: "700", color: "#111", marginTop: 6 },
  tell: {
    fontSize: 11,
    fontWeight: "700",
    color: BLUE,
    marginTop: 14,
    marginBottom: 12,
  },

  /* doctor card */
  doctorCard: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#BFD3FF",
    backgroundColor: "#F4F8FF",
    borderRadius: 4,
    padding: 8,
  },
  doctorImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  imgPlaceholder: { backgroundColor: "#9BB8F5" },
  doctorName: { fontSize: 11, fontWeight: "700", color: BLUE },
  doctorMeta: { fontSize: 8, color: BLUE, marginTop: 1 },
  metaBold: { fontWeight: "700" },
  ratingRow: { flexDirection: "row", alignItems: "center", marginTop: 3 },
  ratedBy: { fontSize: 6, color: "#555", marginLeft: 4 },

  /* questions */
  question: { fontSize: 8, color: "#555" },
  answer: {
    height: 26,
    fontSize: 10,
    color: "#111",
    paddingHorizontal: 0,
    paddingVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#D5D8DC",
  },

  /* stars */
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: 26,
  },
  rateLabel: {
    fontSize: 9,
    color: "#444",
    textAlign: "center",
    marginTop: 6,
  },
  submit: {
    height: 34,
    backgroundColor: TEAL,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  submitText: { color: "#fff", fontSize: 11, fontWeight: "700" },

  /* bottom curve */
  bottomCurve: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 90,
    height: 40,
    backgroundColor: BLUE,
    borderTopRightRadius: 40,
  },
});
