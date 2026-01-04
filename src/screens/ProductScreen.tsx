import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { CartContext } from '../context/CartContext';
import { useRoute } from '@react-navigation/native';
import { getProductsByStore } from '../services/api'; // use product fetch

const ProductScreen = () => {
  const route = useRoute<any>();
  const { productId } = route.params;
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // For MVP we can fetch all products and filter by id
    getProductsByStore(1).then(data => {
      const p = data.find((pr: any) => pr.id === productId);
      setProduct(p);
    });
  }, [productId]);

  if (!product) return <ActivityIndicator size="large" style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.stock}>Stock: {product.stock}</Text>
      <TextInput
        style={styles.input}
        value={quantity.toString()}
        keyboardType="numeric"
        onChangeText={t => setQuantity(Number(t))}
      />
      <Button title="Add to Cart" onPress={() => addToCart({ ...product, quantity })} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 18, color: '#007bff', marginBottom: 4 },
  stock: { fontSize: 14, color: '#555', marginBottom: 12 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, width: 80 },
});

export default ProductScreen;
