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
      {isNameSaved && (
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      )}
    </View>
  );
};

export default HomeScreen;
