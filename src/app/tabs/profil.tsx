import {
  clearAuthSession,
  getAuthSession,
  logoutApi,
  UserData,
} from "@/services/authService"; // [+] tambahan baru[cite: 25]
import { tabStyles } from "@/styles/tabStyles";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react"; // [+] tambahan baru[cite: 25]
import {
  ActivityIndicator, // [+] tambahan baru[cite: 25]
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfilScreen() {
  const [user, setUser] = useState<UserData | null>(null); // [+] tambahan baru[cite: 25]
  const [loadingLogout, setLoadingLogout] = useState(false); // [+] tambahan baru[cite: 25]

  useEffect(() => {
    getAuthSession().then((session) => {
      if (session) setUser(session.user);
    });
  }, []); // [+] tambahan baru[cite: 25]

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      const session = await getAuthSession();
      if (session?.token) {
        await logoutApi(session.token);
      }
      await clearAuthSession();
      router.replace("/login");
    } finally {
      setLoadingLogout(false);
    }
  }; // [+] tambahan baru[cite: 25, 26]

  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={tabStyles.card}>
        <View style={tabStyles.profileAvatar}>
          <Ionicons name="people" size={30} color="#2563EB" />
        </View>
        {/* [~] dimodifikasi[cite: 26] */}
        <Text style={tabStyles.sectionTitle}>
          {user?.name || "Profil Pengguna"}
        </Text>
        {/* [~] dimodifikasi[cite: 26] */}
        <Text style={tabStyles.sectionSubtitle}>
          Email: {user?.email || "-"}{"\n"}
          Nomor HP: {user?.no_hp || "Belum diisi"}
        </Text>
      </View>

      <TouchableOpacity
        style={tabStyles.logoutButton}
        activeOpacity={0.8}
        disabled={loadingLogout} // [+] tambahan baru[cite: 26]
        onPress={handleLogout}
      >
        {/* [+] tambahan baru[cite: 26] */}
        {loadingLogout ? (
          <ActivityIndicator color="#DC2626" />
        ) : (
          <>
            <Ionicons name="log-out-outline" size={20} color="#DC2626" />
            <Text style={tabStyles.logoutButtonText}>Keluar dari Akun</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}