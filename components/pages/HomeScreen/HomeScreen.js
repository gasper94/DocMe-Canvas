import React from 'react';
import { View, TextInput, Button, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { setName } from '../../../Redux/reducers/userReducer'; // Import the action creator to set the name

const HomeScreen = ({ name, setName, navigation }) => {
  const saveName = () => {
    if (name.trim() !== '') {
      Keyboard.dismiss(); // Close the keyboard
      // Dispatch the action to set the name in Redux state
      setName(name);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <TextInput
            placeholder="Enter your name"
            value={name}
            onChangeText={setName} // Update Redux state when the text changes
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

const mapStateToProps = (state) => {
  return {
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setName: (name) => dispatch(setName(name)), // Dispatch the action creator
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
