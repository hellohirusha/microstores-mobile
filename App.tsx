import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ProductProvider } from "./src/context/ProductContext";
import { CartProvider } from "./src/context/CartContext";
import { OrdersProvider } from "./src/context/OrdersContext";

import AuthStack from "./src/navigation/AuthStack"; // your existing Login/Register stack
import BuyerStack from "./src/navigation/BuyerStack"; // your main app stack

import { View, ActivityIndicator } from "react-native";

const AppContent = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <BuyerStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <OrdersProvider>
            <AppContent />
          </OrdersProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}
