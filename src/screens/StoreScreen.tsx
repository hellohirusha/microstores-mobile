import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { getProductsByStore } from '../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
};

const StoreScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation();
  const { storeId } = route.params;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductsByStore(storeId)
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }, [storeId]);

  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Product', { productId: item.id })}
          >
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={styles.stock}>Stock: {item.stock}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 16, marginBottom: 12, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 4, elevation: 2 },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { marginTop: 4, fontSize: 14, color: '#007bff' },
  stock: { marginTop: 2, fontSize: 12, color: '#555' },
});

export default StoreScreen;
