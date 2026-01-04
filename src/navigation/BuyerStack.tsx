import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BuyerTabs from './BuyerTabs';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';

export type BuyerStackParamList = {
  BuyerTabs: undefined;
  Store: { storeId: string };
  Product: { productId: string };
};

const Stack = createNativeStackNavigator<BuyerStackParamList>();

const BuyerStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BuyerTabs" component={BuyerTabs} />
      <Stack.Screen name="Store" component={StoreScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default BuyerStack;
