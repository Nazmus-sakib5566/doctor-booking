import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    ImageSourcePropType,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Figma theke image export kore assets/images/ e rakho, tarpor require boshao
const AVATAR: ImageSourcePropType | undefined = undefined; // header e user er photo
const USER_PHOTO: ImageSourcePropType | undefined = undefined; // chat e user er photo
const DOCTOR_PHOTO: ImageSourcePropType | undefined = undefined; // chat e doctor er photo

type Message = {
  id: string;
  text: string;
  from: "me" | "doctor";
  time: string;
};

const INITIAL: Message[] = [
  {
    id: "1",
    from: "me",
    time: "10:40am",
    text: "doctor I feel much pain on my neck, and swellings on the thyroid gland.",
  },
  {
    id: "2",
    from: "doctor",
    time: "10:41am",
    text: "Hi rahul,\ndo u have red mark on your neck,\ndo u have fever and vomitation?",
  },
  {
    id: "3",
    from: "me",
    time: "10:42am",
    text: "doctor I feel much pain on my neck, and swellings on the thyroid gland.",
  },
];

const nowTime = () => {
  const d = new Date();
  let h = d.getHours();
  const m = d.getMinutes().toString().padStart(2, "0");
  const ap = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${h}:${m}${ap}`;
};

export default function ChatScreen() {
  const router = useRouter();
  // /chat?topic=Fever dile subtitle "Fever consultation" hobe
  const { topic } = useLocalSearchParams<{ topic?: string }>();

  const [messages, setMessages] = useState<Message[]>(INITIAL);
  const [text, setText] = useState("");
  const listRef = useRef<FlatList<Message>>(null);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    // TODO: message server e pathao (socket/API)
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), text: t, from: "me", time: nowTime() },
    ]);
    setText("");
    setTimeout(() => listRef.current?.scrollToEnd({ animated: true }), 50);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const mine = item.from === "me";
    const photo = mine ? USER_PHOTO : DOCTOR_PHOTO;
    const avatar = (
      <View style={styles.msgAvatar}>
        {photo ? (
          <Image source={photo} style={styles.msgAvatarImg} />
        ) : (
          <Ionicons name="person" size={12} color="#fff" />
        )}
      </View>
    );

    return (
      <View style={[styles.msgRow, mine ? styles.rowMine : styles.rowDoctor]}>
        {!mine && avatar}
        <View style={{ maxWidth: "72%", marginHorizontal: 6 }}>
          <View
            style={[
              styles.bubble,
              mine ? styles.bubbleMine : styles.bubbleDoctor,
            ]}
          >
            <Text style={styles.msgText}>{item.text}</Text>
          </View>
          <Text style={[styles.time, mine ? { textAlign: "right" } : null]}>
            {item.time}
          </Text>
        </View>
        {mine && avatar}
      </View>
    );
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
          <View style={{ flex: 1, marginLeft: 6 }}>
            <Text style={styles.headerTitle}>Chat</Text>
            <Text style={styles.headerSub}>
              {topic ?? "Thyroid"} consultation
            </Text>
          </View>
          <View style={styles.avatar}>
            {AVATAR ? (
              <Image source={AVATAR} style={styles.avatarImg} />
            ) : (
              <Ionicons name="person" size={18} color="#fff" />
            )}
          </View>
        </View>

        {/* request buttons */}
        <View style={styles.requestRow}>
          <TouchableOpacity
            style={styles.requestBtn}
            onPress={() =>
              Alert.alert("Request Phonecall", "TODO: phone call request API")
            }
          >
            <Text style={styles.requestText}>Request Phonecall</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.requestBtn}
            onPress={() =>
              Alert.alert("Request Videocall", "TODO: video call request API")
            }
          >
            <Text style={styles.requestText}>Request Videocall</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {/* ---------- MESSAGES + INPUT ---------- */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(m) => m.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          onContentSizeChange={() =>
            listRef.current?.scrollToEnd({ animated: false })
          }
          showsVerticalScrollIndicator={false}
        />

        <SafeAreaView edges={["bottom"]} style={styles.inputWrap}>
          <View style={styles.inputBar}>
            <TouchableOpacity style={styles.plusBtn} hitSlop={6}>
              <Ionicons name="add" size={14} color="#fff" />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Type your message.."
              placeholderTextColor="#9AA0A6"
              value={text}
              onChangeText={setText}
              onSubmitEditing={send}
              returnKeyType="send"
            />
            <TouchableOpacity hitSlop={6} style={styles.iconBtn}>
              <Ionicons name="camera" size={16} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={6} style={styles.iconBtn}>
              <Ionicons name="mic" size={16} color="#333" />
            </TouchableOpacity>
            <TouchableOpacity hitSlop={6} style={styles.iconBtn} onPress={send}>
              <Ionicons name="arrow-forward-circle" size={20} color="#111" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
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
  },
  headerTitle: { color: "#fff", fontSize: 15, fontWeight: "700" },
  headerSub: { color: "#fff", fontSize: 10, marginTop: 1 },
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
  requestRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    paddingTop: 10,
    paddingBottom: 14,
  },
  requestBtn: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  requestText: { color: "#fff", fontSize: 8, fontWeight: "600" },

  /* messages */
  list: { paddingHorizontal: 12, paddingTop: 20, paddingBottom: 12, gap: 16 },
  msgRow: { flexDirection: "row", alignItems: "flex-start" },
  rowMine: { justifyContent: "flex-end" },
  rowDoctor: { justifyContent: "flex-start" },
  msgAvatar: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#9BB8F5",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  msgAvatarImg: { width: 20, height: 20 },
  bubble: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12 },
  bubbleMine: { backgroundColor: "#E4E4E4" },
  bubbleDoctor: { backgroundColor: "#E4E4E4" },
  msgText: { fontSize: 9, color: "#222", lineHeight: 14 },
  time: { fontSize: 6, color: "#888", marginTop: 3 },

  /* input */
  inputWrap: { backgroundColor: "#fff" },
  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 18,
    marginHorizontal: 12,
    marginBottom: 12,
    paddingHorizontal: 8,
    height: 36,
  },
  plusBtn: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#111",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 9,
    color: "#111",
    marginHorizontal: 8,
    paddingVertical: 0,
  },
  iconBtn: { marginLeft: 8 },
});
