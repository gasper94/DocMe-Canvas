import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';

const BodySvg = () => {
  return (
    <Svg width="200" height="400" viewBox="0 0 200 400" style={styles.bodySvg}>
      {/* Head */}
      <Circle cx="100" cy="80" r="40" fill="yellow" />

      {/* Body */}
      <Rect x="80" y="120" width="40" height="160" fill="blue" />

      {/* Arms */}
      <Rect x="40" y="120" width="40" height="160" fill="blue" />
      <Rect x="120" y="120" width="40" height="160" fill="blue" />

      {/* Legs */}
      <Rect x="80" y="280" width="40" height="120" fill="blue" />
      <Rect x="120" y="280" width="40" height="120" fill="blue" />
    </Svg>
  );
};

const FoodInTake = () => {
  const name = "John"; // Replace with the actual name

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Hello, {name}!</Text>
      <BodySvg />
      <View style={{ marginTop: 20 }}>
        <Button title="Button 1" onPress={() => console.log('Button 1 pressed')} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Button 2" onPress={() => console.log('Button 2 pressed')} />
      </View>
      <View style={{ marginTop: 10 }}>
        <Button title="Button 3" onPress={() => console.log('Button 3 pressed')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bodySvg: {
    marginBottom: 20,
  },
});

export default FoodInTake;
