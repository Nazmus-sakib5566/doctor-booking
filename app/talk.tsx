import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Alert,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const BLUE = "#0866F5";

const doctors = [
  {
    id: "male",
    name: "Male Doctor",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "female",
    name: "Female Doctor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function ConsultationScreen() {
  const [patientType, setPatientType] = useState("Myself");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("female");

  const patientTypes = ["Myself", "Child", "Husband", "Father"];

  const handleConsult = () => {
    if (!name.trim()) {
      Alert.alert("Required", "Please enter the patient's name.");
      return;
    }

    if (!age.trim()) {
      Alert.alert("Required", "Please enter the patient's age.");
      return;
    }

    const numericAge = Number(age);

    if (!Number.isInteger(numericAge) || numericAge < 0 || numericAge > 120) {
      Alert.alert("Invalid age", "Please enter a valid age between 0 and 120.");
      return;
    }

    const doctor = doctors.find((item) => item.id === selectedDoctor);

    Alert.alert(
      "Consultation Details",
      `Patient: ${name.trim()}\nAge: ${age}\nPatient type: ${patientType}\nPreferred doctor: ${doctor?.name}\n\nConnect your booking API to confirm an appointment.`,
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.hero}>
          <ImageBackground
            source={{
              uri: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1000&q=85",
            }}
            resizeMode="cover"
            style={styles.heroImage}
            imageStyle={styles.heroImageStyle}
          >
            <View style={styles.heroOverlay} />

            <TouchableOpacity
              style={styles.backButton}
              onPress={() => {
                Alert.alert(
                  "Navigation",
                  "Connect this button to your previous screen.",
                );
              }}
            >
              <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.heroBadge}>
              <Ionicons name="medical" size={15} color="#FFFFFF" />
              <Text style={styles.heroBadgeText}>HEALTHCARE</Text>
            </View>

            <View style={styles.heroTextContainer}>
              <Text style={styles.heroTitle}>
                Your Health,{"\n"}Our Priority
              </Text>
              <Text style={styles.heroSubtitle}>
                Connect with trusted specialists
              </Text>
            </View>

            <View style={styles.heroDots}>
              <View style={styles.dotActive} />
              <View style={styles.dot} />
              <View style={styles.dot} />
            </View>
          </ImageBackground>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <View style={styles.headingRow}>
            <View style={styles.headingIcon}>
              <Ionicons name="calendar" size={22} color={BLUE} />
            </View>

            <View style={styles.headingText}>
              <Text style={styles.title}>Talk to the Specialists</Text>
              <Text style={styles.subtitle}>
                Book your consultation in a few steps
              </Text>
            </View>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.formContent}
            keyboardShouldPersistTaps="handled"
          >
            {/* Patient type */}
            <Text style={styles.label}>Who is the Patient?</Text>

            <View style={styles.patientTypes}>
              {patientTypes.map((type) => {
                const active = patientType === type;

                return (
                  <TouchableOpacity
                    key={type}
                    activeOpacity={0.75}
                    onPress={() => setPatientType(type)}
                    style={[
                      styles.patientChip,
                      active && styles.patientChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.patientChipText,
                        active && styles.patientChipTextActive,
                      ]}
                    >
                      {type}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Patient name */}
            <Text style={styles.label}>Patient Name</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="person-outline" size={20} color="#8995A8" />

              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Enter full name"
                placeholderTextColor="#A5AFBE"
                style={styles.input}
                autoCapitalize="words"
                returnKeyType="next"
              />
            </View>

            {/* Age */}
            <Text style={styles.label}>Patient Age</Text>

            <View style={styles.inputContainer}>
              <Ionicons name="calendar-outline" size={20} color="#8995A8" />

              <TextInput
                value={age}
                onChangeText={(value) => setAge(value.replace(/[^0-9]/g, ""))}
                placeholder="Enter age"
                placeholderTextColor="#A5AFBE"
                keyboardType="number-pad"
                maxLength={3}
                style={styles.input}
              />

              <Text style={styles.ageSuffix}>Years</Text>
            </View>

            {/* Doctor selection */}
            <View style={styles.doctorTitleRow}>
              <Text style={styles.label}>Preferred Doctor</Text>

              <Text style={styles.optional}>Choose one</Text>
            </View>

            <View style={styles.doctorRow}>
              {doctors.map((doctor) => {
                const active = selectedDoctor === doctor.id;

                return (
                  <TouchableOpacity
                    key={doctor.id}
                    activeOpacity={0.8}
                    onPress={() => setSelectedDoctor(doctor.id)}
                    style={[
                      styles.doctorCard,
                      active && styles.doctorCardActive,
                    ]}
                  >
                    <View style={styles.doctorImageWrapper}>
                      <Image
                        source={{ uri: doctor.image }}
                        style={styles.doctorImage}
                      />

                      {active && (
                        <View style={styles.checkBadge}>
                          <Ionicons
                            name="checkmark"
                            size={12}
                            color="#FFFFFF"
                          />
                        </View>
                      )}
                    </View>

                    <Text
                      style={[
                        styles.doctorName,
                        active && styles.doctorNameActive,
                      ]}
                    >
                      {doctor.name}
                    </Text>

                    <Text style={styles.doctorRole}>Specialist</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Info */}
            <View style={styles.infoBox}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color={BLUE}
              />

              <Text style={styles.infoText}>
                Your personal information will be handled securely.
              </Text>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={styles.consultButton}
              activeOpacity={0.85}
              onPress={handleConsult}
            >
              <Text style={styles.consultButtonText}>Consult Now</Text>

              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.footerText}>
              Quality healthcare, just a step away.
            </Text>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BLUE,
  },

  container: {
    flex: 1,
    backgroundColor: "#F4F7FC",
  },

  hero: {
    height: 285,
    backgroundColor: BLUE,
  },

  heroImage: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 55,
  },

  heroImageStyle: {
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 55, 160, 0.58)",
    borderBottomLeftRadius: 38,
    borderBottomRightRadius: 38,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.18)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  heroBadge: {
    position: "absolute",
    right: 22,
    top: 25,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.18)",
  },

  heroBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 1,
  },

  heroTextContainer: {
    marginTop: 15,
  },

  heroTitle: {
    fontSize: 30,
    lineHeight: 37,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },

  heroSubtitle: {
    fontSize: 13,
    color: "#E6EEFF",
    marginTop: 8,
  },

  heroDots: {
    position: "absolute",
    bottom: 28,
    left: 24,
    flexDirection: "row",
    gap: 6,
  },

  dotActive: {
    width: 23,
    height: 6,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: "rgba(255,255,255,0.55)",
  },

  formCard: {
    flex: 1,
    marginTop: -35,
    marginHorizontal: 13,
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 8,
    elevation: 8,
    shadowColor: "#153B70",
    shadowOpacity: 0.1,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 17,
  },

  headingIcon: {
    width: 47,
    height: 47,
    borderRadius: 16,
    backgroundColor: "#EAF2FF",
    alignItems: "center",
    justifyContent: "center",
  },

  headingText: {
    flex: 1,
  },

  title: {
    fontSize: 19,
    fontWeight: "800",
    color: "#17253D",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: "#8995A8",
  },

  formContent: {
    paddingBottom: 15,
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#29364D",
    marginBottom: 10,
    marginTop: 5,
  },

  patientTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 17,
  },

  patientChip: {
    paddingHorizontal: 13,
    paddingVertical: 10,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#DFE5EF",
    backgroundColor: "#FFFFFF",
  },

  patientChipActive: {
    backgroundColor: BLUE,
    borderColor: BLUE,
  },

  patientChipText: {
    fontSize: 12,
    color: "#68758A",
    fontWeight: "600",
  },

  patientChipTextActive: {
    color: "#FFFFFF",
  },

  inputContainer: {
    height: 51,
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: "#FBFCFF",
    marginBottom: 15,
  },

  input: {
    flex: 1,
    height: "100%",
    fontSize: 13,
    color: "#243149",
  },

  ageSuffix: {
    fontSize: 12,
    color: "#8995A8",
  },

  doctorTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optional: {
    fontSize: 11,
    color: "#9AA5B5",
    marginBottom: 10,
  },

  doctorRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  doctorCard: {
    flex: 1,
    minHeight: 130,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#E5EAF2",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
  },

  doctorCardActive: {
    borderColor: BLUE,
    backgroundColor: "#F2F7FF",
  },

  doctorImageWrapper: {
    position: "relative",
    marginBottom: 8,
  },

  doctorImage: {
    width: 57,
    height: 57,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: "#E5EEFF",
  },

  checkBadge: {
    position: "absolute",
    bottom: -2,
    right: -3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: BLUE,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  doctorName: {
    fontSize: 12,
    fontWeight: "700",
    color: "#3C4960",
  },

  doctorNameActive: {
    color: BLUE,
  },

  doctorRole: {
    marginTop: 4,
    fontSize: 10,
    color: "#9AA5B5",
  },

  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#F0F6FF",
    borderRadius: 13,
    padding: 12,
    marginBottom: 16,
  },

  infoText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
    color: "#536783",
  },

  consultButton: {
    height: 54,
    backgroundColor: BLUE,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    elevation: 4,
    shadowColor: BLUE,
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  consultButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  footerText: {
    textAlign: "center",
    marginTop: 12,
    fontSize: 10,
    color: "#9AA5B5",
  },
});
