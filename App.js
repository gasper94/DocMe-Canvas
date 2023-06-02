// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NameProvider } from './NameContext';

// Custom components
import HomeScreen from './components/pages/HomeScreen/HomeScreen';
import DetailsScreen from './components/pages/DetailsScreen/DetailsScreen';

// Stack Navigator
const Stack = createStackNavigator();

const App = () => (
  <NameProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </NameProvider>
);

export default App;
