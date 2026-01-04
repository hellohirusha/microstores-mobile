import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StoreListScreen from './src/screens/StoreListScreen';
import StoreScreen from './src/screens/StoreScreen';
import ProductScreen from './src/screens/ProductScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="StoreList"
          component={StoreListScreen}
          options={{ title: 'Stores' }}
        />

        <Stack.Screen
          name="Store"
          component={StoreScreen}
          options={{ title: 'Store' }}
        />

        <Stack.Screen
          name="Product"
          component={ProductScreen}
          options={{ title: 'Product Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
