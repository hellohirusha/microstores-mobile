import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StoreListScreen from '../screens/StoreListScreen';
import StoreScreen from '../screens/StoreScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createNativeStackNavigator();

export default function StoresStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoreList"
        component={StoreListScreen}
        options={{ title: 'Stores' }}
      />
      <Stack.Screen
        name="Store"
        component={StoreScreen}
        options={({ route }) => ({
          title: route.params?.storeName || 'Store',
        })}
      />
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}
