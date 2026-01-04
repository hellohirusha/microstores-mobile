import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, AuthContext } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import AuthStack from './src/navigation/AuthStack';
import BuyerTabs from './src/navigation/BuyerTabs';
import SellerTabs from './src/navigation/SellerTabs';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { View, ActivityIndicator } from 'react-native';

SplashScreen.preventAutoHideAsync(); // Keep splash until fonts load

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // Load fonts and hide splash when ready
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
      });
      setFontsLoaded(true);
      await SplashScreen.hideAsync();
    }
    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <AuthContext.Consumer>
          {({ token }) => (
            <NavigationContainer>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!token ? (
                  <Stack.Screen name="AuthStack" component={AuthStack} />
                ) : (
                  <>
                    <Stack.Screen name="BuyerTabs" component={BuyerTabs} />
                    <Stack.Screen name="SellerTabs" component={SellerTabs} />
                  </>
                )}
              </Stack.Navigator>
            </NavigationContainer>
          )}
        </AuthContext.Consumer>
      </CartProvider>
    </AuthProvider>
  );
}
