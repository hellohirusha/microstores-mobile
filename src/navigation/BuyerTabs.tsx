import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreListScreen from '../screens/StoreListScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Tab = createBottomTabNavigator();

const BuyerTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Stores" component={StoreListScreen} />
    <Tab.Screen name="Cart" component={CartScreen} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
  </Tab.Navigator>
);

export default BuyerTabs;
