import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  // 2 second por login screen e jabe
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/login");
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />

      <View style={styles.logoContainer}>
        {/* Przycyb Logo */}
        <Image
          source={require("../assets/images/przycyb-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App Name */}
        <Text style={styles.appName}>przycyb</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0064FF",
    justifyContent: "center",
    alignItems: "center",
  },

  logoContainer: {
    alignItems: "center",
    // screenshot অনুযায়ী center position
    transform: [{ translateY: -8 }],
  },

  logo: {
    width: 78,
    height: 78,
    marginBottom: 2,
  },

  appName: {
    color: "#FFFFFF",
    fontSize: 29,
    fontWeight: "700",
    letterSpacing: -1.2,
  },
});
