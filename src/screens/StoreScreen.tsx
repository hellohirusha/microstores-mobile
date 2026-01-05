import React, { useContext } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { useRoute, useNavigation, NavigationProp } from "@react-navigation/native";
import { ProductContext } from "../context/ProductContext";

type Product = {
  id: number;
  storeId: number;
  name: string;
  price: number;
  stock: number;
  image: any;
};

type RootStackParamList = {
  Product: { productId: number };
  Store: { storeId: number; storeName: string };
};

const StoreScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { storeId, storeName } = route.params;

  const { products } = useContext(ProductContext);

  // Filter products by store
  const storeProducts: Product[] = products.filter(
    (p) => p.storeId === storeId
  );

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("Product", { productId: item.id })}
    >
      <Image source={item.image} style={styles.image} resizeMode="cover" />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      <Text style={styles.stock}>Stock: {item.stock}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{storeName}</Text>
      <FlatList
        data={storeProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f2f2" },
  header: { fontSize: 22, fontWeight: "bold", },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 8 },
  name: { fontSize: 18, fontWeight: "bold", marginBottom: 4 },
  price: { fontSize: 16, color: "#007bff", marginBottom: 2 },
  stock: { fontSize: 14, color: "#555" },
});

export default StoreScreen;
