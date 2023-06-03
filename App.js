// App.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NameProvider } from './NameContext';

// Custom components
import HomeScreen from './components/pages/HomeScreen/HomeScreen';
import DetailsScreen from './components/pages/DetailsScreen/DetailsScreen';
import FoodInTake from './components/pages/FoodInTake/FoodInTake';
import Profile from './components/pages/Profile/Profile';

// Stack Navigator
const Stack = createStackNavigator();

const App = () => (
  <NameProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="FoodInTake" component={FoodInTake} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  </NameProvider>
);

export default App;
