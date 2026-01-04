import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useCart } from '../context/CartContext'; // ✅ use the hook
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cart = [], removeFromCart } = useCart(); // fallback to [] prevents early crashes
  const navigation = useNavigation();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={item => item.productId.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Qty: {item.quantity}</Text>
                <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                <Button title="Remove" onPress={() => removeFromCart(item.productId)} />
              </View>
            )}
          />
          <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
          <Button title="Checkout" onPress={() => navigation.navigate('Checkout')} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { padding: 12, backgroundColor: '#fff', marginBottom: 8, borderRadius: 8 },
  name: { fontWeight: 'bold', fontSize: 16 },
  total: { fontSize: 18, fontWeight: 'bold', marginVertical: 16 },
  emptyText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#555' },
});

export default CartScreen;
