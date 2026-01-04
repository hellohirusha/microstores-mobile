import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { DEMO_PRODUCTS } from '../data/demoProducts';

type RootStackParamList = {
  Product: { productId: number };
  Store: { storeId: number };
};

const StoreScreen = () => {
  const route = useRoute<any>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { storeId } = route.params;

  const products = Object.values(DEMO_PRODUCTS).flat().filter(product => product.storeId === storeId);

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
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  price: { fontSize: 14, color: '#555' },
});

export default StoreScreen;
