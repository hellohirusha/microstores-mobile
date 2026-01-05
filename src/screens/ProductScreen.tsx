import React, { useContext, useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { CartContext } from '../context/CartContext';
import { DEMO_PRODUCTS } from '../data/demoProducts';

type Product = {
  id: number;
  storeId: number;
  name: string;
  price: number;
  stock: number;
  image: any;
};

const ProductScreen = () => {
  const route = useRoute<any>();
  const { productId } = route.params;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const product: Product | undefined = useMemo(() => {
    return DEMO_PRODUCTS.find(p => p.id === Number(productId));
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} resizeMode="cover" />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.stock}>Available stock: {product.stock}</Text>

      <View style={styles.qtyRow}>
        <Button
          title="-"
          onPress={() => setQuantity(q => Math.max(1, q - 1))}
        />
        <Text style={styles.qty}>{quantity}</Text>
        <Button
          title="+"
          onPress={() => setQuantity(q => Math.min(product.stock, q + 1))}
        />
      </View>

      <Button
        title="Add to Cart"
        onPress={() =>
          addToCart({
            ...product,
            quantity,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    color: '#007bff',
    marginBottom: 6,
  },
  stock: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  qty: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 16,
    color: 'red',
  },
});

export default ProductScreen;
