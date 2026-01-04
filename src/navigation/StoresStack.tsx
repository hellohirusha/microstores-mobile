import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreListScreen from '../screens/StoreListScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

const StoresStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="StoreList" component={StoreListScreen} options={{ title: 'Stores' }} />
      <Stack.Screen name="Store" component={StoreScreen} options={{ title: 'Store Products' }} />
      <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Product Details' }} />
    </Stack.Navigator>
  );
};

export default StoresStack;