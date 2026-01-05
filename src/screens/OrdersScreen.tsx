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
import { OrdersContext } from '../context/OrdersContext';
import { Ionicons } from '@expo/vector-icons';

const OrdersScreen = () => {
  const { orders, cancelOrder } = useContext(OrdersContext);

  if (orders.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No orders yet.</Text>
      </View>
    );
  }

  const handleCancel = (orderId: string) => {
    cancelOrder(orderId);
    Alert.alert('Order Cancelled', 'You have successfully cancelled the order');
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={item => item.orderId}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>Qty: {item.quantity}</Text>
              <Text>${(item.price * item.quantity).toFixed(2)}</Text>
              <Text style={styles.date}>{item.purchasedAt}</Text>
            </View>
            <TouchableOpacity onPress={() => handleCancel(item.orderId)}>
              <Ionicons name="close-circle-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { fontSize: 16, color: '#555' },

  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
  name: { fontWeight: 'bold', fontSize: 16 },
  date: { fontSize: 12, color: '#777', marginTop: 4 },
});

export default OrdersScreen;
