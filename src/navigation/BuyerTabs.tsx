import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreListScreen from '../screens/StoreListScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const BuyerTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#4CAF50',
      tabBarInactiveTintColor: '#888',
      tabBarIcon: ({ color, size }) => {
        let iconName: string = '';

        if (route.name === 'Stores') iconName = 'storefront-outline';
        else if (route.name === 'Cart') iconName = 'cart-outline';
        else if (route.name === 'Orders') iconName = 'receipt-outline';

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}
  >
    <Tab.Screen name="Stores" component={StoreListScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
  </Tab.Navigator>
);

export default BuyerTabs;
