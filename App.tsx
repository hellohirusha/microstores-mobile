import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';

import AuthStack from './src/navigation/AuthStack';
import BuyerTabs from './src/navigation/BuyerTabs';
import SellerTabs from './src/navigation/SellerTabs';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { token, role, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!token ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : role === 'seller' ? (
        <Stack.Screen name="Seller" component={SellerTabs} />
      ) : (
        <Stack.Screen name="Buyer" component={BuyerTabs} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
}
