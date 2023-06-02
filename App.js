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
  const [drawingPath, setDrawingPath] = useState([]);
  const [drawMode, setDrawMode] = useState('line');

  const handlePanResponderMove = (event, gestureState) => {
    const { locationX, locationY } = event.nativeEvent;
    const point = { x: locationX, y: locationY };
    setDrawingPath(prevPath => [...prevPath, point]);
  };

  const switchDrawMode = (mode) => {
    setDrawMode(mode);
  };

  const clearDrawing = () => {
    setDrawingPath([]);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: handlePanResponderMove,
      onPanResponderRelease: () => {
        // Finger released, you can perform any necessary actions here
      },
    })
  ).current;

  const renderDrawing = () => {
    if (drawMode === 'line') {
      return renderDrawingLine();
    } else if (drawMode === 'box') {
      return renderDrawingBoxes();
    }
    return null;
  };

  const renderDrawingLine = () => {
    if (drawingPath.length < 2) {
      return null;
    }

    const path = drawingPath.map(point => `${point.x},${point.y}`).join(' ');

    return <Polyline points={path} fill="none" stroke="blue" strokeWidth="2" />;
  };

  const renderDrawingBoxes = () => {
    return drawingPath.map((point, index) => (
      <View
        key={index}
        style={{
          position: 'absolute',
          backgroundColor: 'blue',
          width: 20,
          height: 20,
          left: point.x - 10,
          top: point.y - 10,
        }}
      />
    ));
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
        <Button title="Line" onPress={() => switchDrawMode('line')} />
        <Button title="Box" onPress={() => switchDrawMode('box')} />
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
