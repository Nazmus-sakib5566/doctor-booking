import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Image,
    ImageSourcePropType,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type MenuItemId =
  | "consult"
  | "lifeline"
  | "prescription"
  | "transaction"
  | "about"
  | "terms"
  | "privacy"
  | "help";

const MENU_ITEMS: { id: MenuItemId; label: string }[] = [
  { id: "consult", label: "Consult Now" },
  { id: "lifeline", label: "Lifeline" },
  { id: "prescription", label: "My Prescription" },
  { id: "transaction", label: "My Transaction" },
  { id: "about", label: "About Prescryb" },
  { id: "terms", label: "Terms and Conditions" },
  { id: "privacy", label: "Privacy & Policy" },
  { id: "help", label: "Help" },
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onItemPress?: (id: MenuItemId) => void;
  onEditProfile?: () => void;
  userName?: string;
  avatar?: ImageSourcePropType; // chaile profile photo dao
  version?: string;
};

const DRAWER_WIDTH = Math.min(Dimensions.get("window").width * 0.78, 320);

export default function SideMenu({
  visible,
  onClose,
  onItemPress,
  onEditProfile,
  userName = "Rahul",
  avatar,
  version = "1.0",
}: Props) {
  const slide = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    if (visible) {
      slide.setValue(-DRAWER_WIDTH);
      Animated.timing(slide, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, slide]);

  const close = () => {
    Animated.timing(slide, {
      toValue: -DRAWER_WIDTH,
      duration: 200,
      useNativeDriver: true,
    }).start(() => onClose());
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={close}
    >
      <View style={styles.root}>
        <Animated.View
          style={[
            styles.drawer,
            { width: DRAWER_WIDTH, transform: [{ translateX: slide }] },
          ]}
        >
          <SafeAreaView style={{ flex: 1 }}>
            {/* Profile row */}
            <View style={styles.profile}>
              <View style={styles.avatar}>
                {avatar ? (
                  <Image source={avatar} style={styles.avatarImg} />
                ) : (
                  <Ionicons name="person" size={22} color="#fff" />
                )}
              </View>
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.hello}>You doing</Text>
                <Text style={styles.name}>{userName}</Text>
              </View>
              <TouchableOpacity
                style={styles.editBtn}
                hitSlop={8}
                onPress={onEditProfile}
              >
                <Ionicons name="create-outline" size={18} color="#0066FF" />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Menu items */}
            <View style={{ flex: 1, paddingTop: 8 }}>
              {MENU_ITEMS.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.item}
                  activeOpacity={0.6}
                  onPress={() => {
                    onItemPress?.(item.id);
                    close();
                  }}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
                </TouchableOpacity>
              ))}

              <Ionicons
                name="chevron-down"
                size={18}
                color="#9AA0A6"
                style={styles.chevron}
              />
            </View>

            <View style={styles.divider} />

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.brand}>pryzcryb</Text>
              <Text style={styles.version}>Version {version}</Text>
            </View>
          </SafeAreaView>
        </Animated.View>

        {/* Dim area, tap korle bondho */}
        <Pressable style={styles.dim} onPress={close} />
      </View>
    </Modal>
  );
}

const BLUE = "#0066FF";

const styles = StyleSheet.create({
  root: { flex: 1, flexDirection: "row" },
  drawer: {
    backgroundColor: "#fff",
    height: "100%",
    elevation: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 0 },
  },
  dim: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },

  profile: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 14,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#9BB8F5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImg: { width: 40, height: 40 },
  hello: { fontSize: 11, color: "#555" },
  name: { fontSize: 14, fontWeight: "700", color: "#111" },
  editBtn: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: BLUE,
    alignItems: "center",
    justifyContent: "center",
  },

  divider: { height: 1, backgroundColor: "#ECEEF0" },

  item: { paddingHorizontal: 22, paddingVertical: 13 },
  itemText: { fontSize: 13, color: BLUE, fontWeight: "500" },
  chevron: { alignSelf: "center", marginTop: 10 },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  brand: { fontSize: 14, fontWeight: "800", color: BLUE },
  version: { fontSize: 10, color: "#555" },
});
