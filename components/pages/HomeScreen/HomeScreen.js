import React, { useContext } from 'react';
import { View, TextInput, Button, Keyboard } from 'react-native';
import { NameContext } from '../../../NameContext';

const HomeScreen = ({ navigation }) => {
  const { name, setName } = useContext(NameContext);
  const [isNameSaved, setIsNameSaved] = React.useState(false);

  const saveName = () => {
    if (name.trim() !== '') {
      Keyboard.dismiss(); // Close the keyboard
      setIsNameSaved(true);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
        />
        <Button title="Save Name" onPress={saveName} />
        <Button
            title="Uploading Image"
            onPress={() => navigation.navigate('Details')}
        />
        <Button
            title="Body Svg"
            onPress={() => navigation.navigate('FoodInTake')}
        />
        <Button
            title="Input Multi-step form Profile"
            onPress={() => navigation.navigate('Profile')}
        />
        <Button
            title="HashMap"
            onPress={() => navigation.navigate('HashMap')}
        />
         <Button
            title="History"
            onPress={() => navigation.navigate('History')}
        />
        <Button
            title="Basic"
            onPress={() => navigation.navigate('Basic')}
        />
    </View>
  );
};

export default HomeScreen;
