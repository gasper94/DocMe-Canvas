import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button, PanResponder, UIManager, Platform } from 'react-native';
import { Svg, Polyline } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;

// Enable layout animation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const [drawingPaths, setDrawingPaths] = useState([]);
  const [drawMode, setDrawMode] = useState('');

  const handlePanResponderStart = () => {
    setDrawingPaths(prevPaths => [...prevPaths, []]);
  };

  const handlePanResponderMove = (event, gestureState) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = { x: locationX, y: locationY };
    setDrawingPaths(prevPaths => {
      const updatedPaths = [...prevPaths];
      updatedPaths[updatedPaths.length - 1].push(point);
      return updatedPaths;
    });
  };

  const switchDrawMode = (mode) => {
    setDrawMode(mode);
  };

  const clearDrawing = () => {
    setDrawMode('');
    setDrawingPaths([]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderStart: handlePanResponderStart,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: () => {
        // Finger released, you can perform any necessary actions here
      },
    })
  ).current;

  const renderDrawing = () => {
    return drawingPaths.map((path, index) => {
      if (path.length < 2) {
        return null;
      }

      const points = path.map(point => `${point.x},${point.y}`).join(' ');

      return <Polyline key={index} points={points} fill="none" stroke="blue" strokeWidth="2" />;
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.box, { height: windowHeight / 2, width: '90%' }]} {...panResponder.panHandlers}>
        <Text>Image should be here</Text>
        <Svg style={styles.drawingContainer}>
          {renderDrawing()}
        </Svg>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Line" onPress={() => switchDrawMode('line')} disabled={drawMode === 'line'} />
        <Button title="Reset" onPress={clearDrawing} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    alignSelf: 'center',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
