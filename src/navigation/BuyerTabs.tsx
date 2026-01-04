import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoresStack from './StoresStack'; // <- changed
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { View, Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const BuyerTabs = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#4CAF50',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'alert-circle-outline';

          if (route.name === 'Stores') iconName = 'storefront-outline';
          else if (route.name === 'Cart') iconName = 'cart-outline';
          else if (route.name === 'Orders') iconName = 'receipt-outline';

          if (route.name === 'Cart' && cartItems.length > 0) {
            return (
              <View>
                <Ionicons name={iconName} size={size} color={color} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartItems.length}</Text>
                </View>
              </View>
            );
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Stores" component={StoresStack} /> {/* <- changed */}
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 8,
    minWidth: 16,
    paddingHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BuyerTabs;
