import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useProduct } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();   // ✅ Get real logged-in user
  const { products } = useProduct();
  const { cart } = React.useContext(CartContext);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No user data found</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>First Name</Text>
        <Text style={styles.value}>{user.firstName}</Text>

        <Text style={styles.label}>Last Name</Text>
        <Text style={styles.value}>{user.lastName}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.stat}>Products in stock: {products.length}</Text>
        <Text style={styles.stat}>Items in cart: {cart.length}</Text>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={logout}>
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    backgroundColor: '#ddd',
  },
  detailsContainer: {
    width: '85%',
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#888',
    marginTop: 12,
  },
  value: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginTop: 2,
  },
  statsContainer: {
    width: '85%',
    marginBottom: 36,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  stat: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  signOutButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#FF5252',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 14,
  },
  signOutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
