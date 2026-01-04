import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';

const CheckoutScreen = () => {
  const { cart, clearCart } = useContext(CartContext);

  const handleCheckout = () => {
    // For MVP, just show alert
    Alert.alert('Order placed!', `You ordered ${cart.length} items`);
    clearCart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      {cart.map(item => (
        <View key={item.productId} style={styles.item}>
          <Text>{item.name} x {item.quantity}</Text>
          <Text>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      ))}
      <Button title="Place Order" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  item: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
});

export default CheckoutScreen;
