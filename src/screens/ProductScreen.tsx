import React, { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput, Image } from 'react-native';
import { CartContext } from '../context/CartContext';
import { useRoute } from '@react-navigation/native';
import { DEMO_PRODUCTS } from '../data/demoProducts';

const ProductScreen = () => {
  const route = useRoute<any>();
  const { productId, storeId } = route.params;
  const { addToCart } = useContext(CartContext);

  const product = DEMO_PRODUCTS[storeId]?.find(p => p.id === productId);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <Text style={{ padding: 16 }}>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.stock}>Stock: {product.stock}</Text>

      <TextInput
        style={styles.input}
        value={quantity.toString()}
        keyboardType="numeric"
        onChangeText={t => setQuantity(Number(t) || 1)}
      />

      <Button
        title="Add to Cart"
        onPress={() => addToCart({ ...product, quantity })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  price: { fontSize: 20, color: '#4CAF50', marginBottom: 4 },
  stock: { fontSize: 14, color: '#555', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 12,
    width: 80,
    borderRadius: 6,
  },
});

export default ProductScreen;
