import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SellerDashboard from '../screens/SellerDashboard';
import OrdersScreen from '../screens/OrdersScreen';

const Tab = createBottomTabNavigator();

const SellerTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="Dashboard" component={SellerDashboard} />
    <Tab.Screen name="Orders" component={OrdersScreen} />
  </Tab.Navigator>
);

export default SellerTabs;
