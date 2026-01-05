import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './src/context/CartContext';
import BuyerStack from './src/navigation/BuyerStack';
import { OrdersProvider } from './src/context/OrdersContext';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <OrdersProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="BuyerRoot" component={BuyerStack} />
        </RootStack.Navigator>
      </NavigationContainer>
      </OrdersProvider>
    </CartProvider>
  );
}
