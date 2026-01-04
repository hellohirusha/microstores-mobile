import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStores } from '../services/api';
import { useNavigation } from '@react-navigation/native';

type Store = {
  id: number;
  name: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap; // demo-only
};

// Demo stores aligned with SQL schema + frontend-only icons
const DEMO_STORES: Store[] = [
  {
    id: 1,
    name: 'Fresh Mart',
    description: 'Daily groceries and fresh produce',
    icon: 'leaf-outline',
  },
  {
    id: 2,
    name: 'Tech Stop',
    description: 'Electronics, gadgets, and accessories',
    icon: 'hardware-chip-outline',
  },
  {
    id: 3,
    name: 'Home Essentials',
    description: 'Everything you need for your home',
    icon: 'home-outline',
  },
];

const StoreListScreen = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getStores();

        if (Array.isArray(data) && data.length > 0) {
          setStores(data);
        } else {
          setStores(DEMO_STORES);
        }
      } catch {
        setStores(DEMO_STORES);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={stores}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate('Store', { storeId: item.id })
            }
          >
            <View style={styles.row}>
              <View style={styles.iconWrapper}>
                <Ionicons
                  name={item.icon || 'storefront-outline'}
                  size={26}
                  color="#4CAF50"
                />
              </View>

              <View style={styles.textWrapper}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    marginTop: 45,
    flex: 1,
    padding: 16,
  },
  card: {
    padding: 16,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textWrapper: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  desc: {
    fontSize: 14,
    color: '#555',
  },
});

export default StoreListScreen;
