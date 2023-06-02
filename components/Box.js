import React, { useRef, useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Button, PanResponder, UIManager, Platform } from 'react-native';
import { Svg, Rect } from 'react-native-svg';

const windowHeight = Dimensions.get('window').height;

// Enable layout animation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export default function App() {
  const [drawingBoxes, setDrawingBoxes] = useState([]);
  const [drawMode, setDrawMode] = useState('');

  const handlePanResponderStart = () => {
    setDrawingBoxes(prevBoxes => [...prevBoxes, []]);
  };

  const handlePanResponderMove = (event, gestureState) => {
    const { locationX, locationY } = event.nativeEvent;
    const box = { x: locationX, y: locationY };
    setDrawingBoxes(prevBoxes => {
      const updatedBoxes = [...prevBoxes];
      updatedBoxes[updatedBoxes.length - 1].push(box);
      return updatedBoxes;
    });
  };

  const switchDrawMode = (mode) => {
    setDrawMode(mode);
  };

  const clearDrawing = () => {
    setDrawMode('');
    setDrawingBoxes([]);
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
    return drawingBoxes.map((box, index) => {
      if (box.length < 2) {
        return null;
      }

      const startPoint = box[0];
      const endPoint = box[box.length - 1];
      const x = Math.min(startPoint.x, endPoint.x);
      const y = Math.min(startPoint.y, endPoint.y);
      const width = Math.abs(startPoint.x - endPoint.x);
      const height = Math.abs(startPoint.y - endPoint.y);

      return <Rect key={index} x={x} y={y} width={width} height={height} fill="none" stroke="blue" strokeWidth="2" />;
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
        <Button title="Box" onPress={() => switchDrawMode('box')} disabled={drawMode === 'box'} />
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
