import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { DEMO_PRODUCTS } from '../data/demoProducts';

const StoreScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { storeId } = route.params;

  const products = DEMO_PRODUCTS[storeId] || [];

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Product', { productId: item.id, storeId })
            }
          >
            <Image source={item.image} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 12,
    padding: 10,
    elevation: 2,
  },
  image: { width: 70, height: 70, borderRadius: 8 },
  info: { marginLeft: 12, justifyContent: 'center' },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#4CAF50' },
});

export default StoreScreen;
