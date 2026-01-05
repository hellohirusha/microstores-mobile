import React, { useContext, useMemo, useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import { DEMO_PRODUCTS } from "../data/demoProducts";

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
  const { products } = useContext(ProductContext);

  const [quantity, setQuantity] = useState(1);

  // Get product from context for real-time stock sync
  const product: Product | undefined = useMemo(() => {
    return products.find((p) => p.id === Number(productId));
  }, [products, productId]);

  useEffect(() => {
    if (product) {
      setQuantity(Math.min(quantity, product.stock));
    }
  }, [product?.stock]);

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Product not found</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    if (quantity > 0 && product.stock >= quantity) {
      addToCart({
        ...product,
        quantity,
      });

      setQuantity(1);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={product.image} style={styles.image} resizeMode="cover" />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.stock}>Available stock: {product.stock}</Text>

      <View style={styles.qtyRow}>
        <TouchableOpacity style={styles.minus} onPress={() => setQuantity((q) => Math.max(1, q - 1))}>
          <Text style={styles.minusText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{quantity}</Text>
        <TouchableOpacity style={styles.plus} onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}>
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.addToCart} onPress={handleAddToCart}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  addToCart: {
    width: '100%',
    height: 50,
    backgroundColor: '#085dcdff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  plus: {
    backgroundColor: '#085dcdff',
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minus: {
    backgroundColor: '#085dcdff',
    borderRadius: 8,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  minusText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToCartText:{
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 6,
  },
  price: {
    fontSize: 20,
    color: "#007bff",
    marginBottom: 6,
  },
  stock: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 20,
  },
  qty: {
    fontSize: 20,
    fontWeight: "bold",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 16,
    color: "red",
  },
});

export default ProductScreen;
