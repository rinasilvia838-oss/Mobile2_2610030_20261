import { tabStyles } from "@/styles/tabsStyles";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, Text, View } from "react-native";

// Data Produk Sementara
const DUMMY_PRODUK = [
  {
    id: "1",
    nama: "Minyak Goreng 2L",
    stok: "45 pcs",
    harga: "Rp 38.000",
  },
  {
    id: "2",
    nama: "Beras Premium 5kg",
    stok: "18 karung",
    harga: "Rp 72.500",
  },
  {
    id: "3",
    nama: "Gula Pasir 1kg",
    stok: "30 pcs",
    harga: "Rp 17.500",
  },
];

export default function ProdukScreen() {
  return (
    <ScrollView
      style={tabStyles.screenContainer}
      contentContainerStyle={tabStyles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Produk */}
      <View style={tabStyles.card}>
        <View style={tabStyles.badgeBlue}>
          <Ionicons name="cube" size={14} color="#2563EB" />

          <Text style={tabStyles.badgeBlueText}>
            Inventaris Barang
          </Text>
        </View>

        <Text
          style={[
            tabStyles.sectionTitle,
            { marginTop: 10 },
          ]}
        >
          Daftar Produk
        </Text>
      </View>

      {/* Daftar Produk */}
      {DUMMY_PRODUK.map((item) => (
        <View
          key={item.id}
          style={tabStyles.listItemCard}
        >
          <View style={tabStyles.listItemLeft}>
            <View style={tabStyles.iconBox}>
              <Ionicons
                name="cube-outline"
                size={20}
                color="#2563EB"
              />
            </View>

            <View>
              <Text style={tabStyles.listItemTitle}>
                {item.nama}
              </Text>

              <Text style={tabStyles.listItemMeta}>
                Stok: {item.stok}
              </Text>
            </View>
          </View>

          <Text style={tabStyles.listItemPrice}>
            {item.harga}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}