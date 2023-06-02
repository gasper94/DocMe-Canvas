// HomeScreen.js
import React, { useContext } from 'react';
import { View, Button, Text } from 'react-native';
import { NameContext } from '../../../NameContext';

// Custom components
import ImageAnnotation from '../../ImageAnnotation/ImageAnnotation';

const DetailsScreen = () => {
  const { name } = useContext(NameContext);

  return (
    <ImageAnnotation />
    // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //   <Text>Hello, {name}!</Text>
    //   <View style={{ marginTop: 20 }}>
    //     <Button title="Button 1" onPress={() => console.log('Button 1 pressed')} />
    //   </View>
    //   <View style={{ marginTop: 10 }}>
    //     <Button title="Button 2" onPress={() => console.log('Button 2 pressed')} />
    //   </View>
    //   <View style={{ marginTop: 10 }}>
    //     <Button title="Button 3" onPress={() => console.log('Button 3 pressed')} />
    //   </View>
    // </View>
  );
};

export default DetailsScreen;
