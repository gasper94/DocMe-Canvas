// App.js
import { Provider } from 'react-redux';
import store from './Redux/store';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { NameProvider } from './NameContext';

// Custom components
import HomeScreen from './components/pages/HomeScreen/HomeScreen';
import DetailsScreen from './components/pages/DetailsScreen/DetailsScreen';
import FoodInTake from './components/pages/FoodInTake/FoodInTake';
import Profile from './components/pages/Profile/Profile';
import ActivityMap from './components/pages/HashMap/HashMap';
import HistoricDataList from './components/pages/HistoricDataList.js/HistoricDataList';
import Basic from './components/pages/HistoricDataList.js/Basic';

// Stack Navigator
const Stack = createStackNavigator();

  const contributionData = [
    [
      { date: '2023-01-01', eventOccurrence: 0 },
      { date: '2023-01-02', eventOccurrence: 3 },
      { date: '2023-01-03', eventOccurrence: 2 },
      { date: '2023-01-04', eventOccurrence: 1 },
      { date: '2023-01-05', eventOccurrence: 0 },
      { date: '2023-01-06', eventOccurrence: 0 },
      { date: '2023-01-07', eventOccurrence: 0 },
    ],
    [
      { date: '2023-01-08', eventOccurrence: 0 },
      { date: '2023-01-09', eventOccurrence: 0 },
      { date: '2023-01-10', eventOccurrence: 0 },
      { date: '2023-01-11', eventOccurrence: 2 },
      { date: '2023-01-12', eventOccurrence: 10 },
      { date: '2023-01-13', eventOccurrence: 0 },
      { date: '2023-01-14', eventOccurrence: 0 },
    ],
  ];

  const contributionDataWithDateId = contributionData.map((week) => {
    return week.map((day) => {
      return {
        ...day,
        dateid: Date.parse(day.date)
      }
    });
  });

const App = () => (
  <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen name="FoodInTake" component={FoodInTake} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen
              name="HashMap"
              component={ActivityMap}
              initialParams={{
                data: contributionDataWithDateId
              }}
            />
            <Stack.Screen name="History" component={HistoricDataList} />
              <Stack.Screen name="Basic" component={Basic} />
          </Stack.Navigator>
        </NavigationContainer>
  </Provider>
);

export default App;
