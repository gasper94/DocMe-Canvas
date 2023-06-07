// HomeScreen.js
import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { NameContext } from '../../../NameContext';

// Custom components
import NotificationsScheduler from '../Notifications';

const Notifications = () => {
  const { name } = useContext(NameContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello, {name}!</Text>
        <NotificationsScheduler />
    </View>
  );
};

export default Notifications;
