import * as Notifications from 'expo-notifications';


export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  // If permission has not been granted, ask the user for permission
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  // If permission is still not granted, exit the function
  if (finalStatus !== 'granted') {
    console.log('Permission to receive push notifications was denied');
    return;
  }

  // Get the user's push token and save it on your server
  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log('Push token:', token);

  // Send the push token to your server to associate it with the user's device
  // Save the token on your server for sending notifications later

  // Add any additional logic you need for handling the push token or registration here
};
