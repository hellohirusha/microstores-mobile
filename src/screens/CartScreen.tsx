import React, { useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { CartContext } from '../context/CartContext';
import { OrdersContext } from '../context/OrdersContext';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { addOrders } = useContext(OrdersContext);

  const handlePurchase = () => {
    const purchasedItems = cart.map(item => ({
      orderId: `${Date.now()}-${item.id}`,
      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      purchasedAt: new Date().toLocaleString(),
    }));

    addOrders(purchasedItems);
    clearCart();

    Alert.alert(
      'Purchase Successful',
      'You have purchased your product/s. Check Order page for more info.'
    );
  };

  if (cart.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>Your cart is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Remove all */}
      <TouchableOpacity style={styles.removeAll} onPress={clearCart}>
        <Text style={styles.removeAllText}>Remove All</Text>
      </TouchableOpacity>

      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Qty: {item.quantity}</Text>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item.id)}>
              <Ionicons name="trash-outline" size={22} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.purchaseBtn} onPress={handlePurchase}>
        <Text style={styles.purchaseText}>Purchase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 45, flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { fontSize: 16, color: '#555' },

  removeAll: { alignSelf: 'flex-end', marginBottom: 10 },
  removeAllText: { color: 'red', fontWeight: 'bold' },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontWeight: 'bold', fontSize: 16 },

  purchaseBtn: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  purchaseText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default CartScreen;
