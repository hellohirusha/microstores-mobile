import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getStores } from '../services/api';
import { useNavigation } from '@react-navigation/native';

type Store = {
  id: number;
  name: string;
  description: string;
  icon?: keyof typeof Ionicons.glyphMap;
};

// Frontend-only demo stores (aligned with SQL IDs)
const DEMO_STORES: Store[] = [
  { id: 1, name: 'Fresh Mart', description: 'Daily groceries and fresh produce', icon: 'leaf-outline' },
  { id: 2, name: 'Tech Stop', description: 'Electronics, gadgets, and accessories', icon: 'hardware-chip-outline' },
  { id: 3, name: 'Home Essentials', description: 'Everything you need for your home', icon: 'home-outline' },
  { id: 4, name: 'Book Heaven', description: 'Books, stationery, and study materials', icon: 'book-outline' },
  { id: 5, name: 'Fitness Hub', description: 'Fitness gear and wellness products', icon: 'barbell-outline' },
];

const StoreListScreen = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [search, setSearch] = useState('');
  
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  useEffect(() => {
    const loadStores = async () => {
      try {
        const data = await getStores();
        setStores(Array.isArray(data) && data.length > 0 ? data : DEMO_STORES);
      } catch {
        setStores(DEMO_STORES);
      } finally {
        setLoading(false);
      }
    };

    loadStores();
  }, []);

  // Derived filtered list (efficient and predictable)
  const filteredStores = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return stores;

    return stores.filter(store =>
      store.name.toLowerCase().includes(query)
    );
  }, [search, stores]);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color="#777" />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search stores..."
          placeholderTextColor="#888"
          style={styles.searchInput}
          returnKeyType="search"
          autoCorrect={false}
          autoCapitalize="none"
          clearButtonMode="while-editing"
          onSubmitEditing={Keyboard.dismiss}
        />
      </View>

      {/* Store List */}
      <FlatList
        data={filteredStores}
        keyExtractor={item => item.id.toString()}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No stores found.</Text>
          </View>
        }
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
    marginTop: 8,
    flex: 1,
    padding: 16,
    marginBottom: 2,
  },

  /* Search */
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F2',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#000',
  },

  /* Cards */
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

  /* Empty */
  emptyState: {
    marginTop: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777',
  },
});

export default StoreListScreen;
