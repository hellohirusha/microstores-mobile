import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreListScreen from '../screens/StoreListScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

const StoresStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="StoreList" component={StoreListScreen} />
    <Stack.Screen name="Store" component={StoreScreen} />
    <Stack.Screen name="Product" component={ProductScreen} />
  </Stack.Navigator>
);

export default StoresStack;
