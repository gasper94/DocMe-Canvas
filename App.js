import React, { useRef, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  Button,
  PanResponder,
  UIManager,
  Platform,
  ImageBackground,
  Alert,
} from 'react-native';
import { Svg, Rect } from 'react-native-svg';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions';
import { captureRef } from 'react-native-view-shot';

// Enable layout animation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const DrawingBoxes = ({ drawingBoxes }) => {
  const renderDrawing = () => {
    return drawingBoxes.map((box, index) => {
      const { position, size } = box;
      if (!position || !size) {
        return null;
      }

      const { x, y } = position;
      const { width, height } = size;

      if (x === null || y === null) {
        return null;
      }

      const startX = Math.min(x, x + width);
      const startY = Math.min(y, y + height);
      const boxWidth = Math.abs(width);
      const boxHeight = Math.abs(height);

      const dimensionsX = startX - 2;
      const dimensionsY = startY - 10; // Adjust the vertical offset as needed

      return (
        <React.Fragment key={index}>
          <Rect
            x={startX}
            y={startY}
            width={boxWidth}
            height={boxHeight}
            fill="none"
            stroke="blue"
            strokeWidth="2"
          />
          {/* <Text>Hello</Text> */}
          <Text style={[styles.boxDimensions, { left: dimensionsX, top: dimensionsY }]}>
            {boxWidth.toFixed(0)} x {boxHeight.toFixed(0)}
          </Text>
        </React.Fragment>
      );
    });
  };

  return (
    <Svg style={styles.drawingContainer}>
      {renderDrawing()}
    </Svg>
  );
};

export default function App() {
  const { width, height } = Dimensions.get('window');

  const redBoxRef = useRef(null);

  const [drawingBoxes, setDrawingBoxes] = useState([]);
  const [drawMode, setDrawMode] = useState('');

  const handlePanResponderStart = () => {
    setDrawingBoxes(prevBoxes => [...prevBoxes, { position: { x: null, y: null }, size: { width: null, height: null } }]);
  };

  const handlePanResponderMove = (event, gestureState) => {
    const { locationX, locationY } = event.nativeEvent;
    const redBoxWidth = width / 2;
    const redBoxHeight = height / 2;

    setDrawingBoxes(prevBoxes => {
      const updatedBoxes = [...prevBoxes];
      const lastIndex = updatedBoxes.length - 1;
      const { position, size } = updatedBoxes[lastIndex];
      const startX = position.x !== null ? position.x : locationX;
      const startY = position.y !== null ? position.y : locationY;
      let width = Math.abs(locationX - startX);
      let height = Math.abs(locationY - startY);

      // Adjust width and height if they exceed the boundaries
      if (startX + width > redBoxWidth) {
        width = redBoxWidth - startX;
      }
      if (startY + height > redBoxHeight) {
        height = redBoxHeight - startY;
      }

      updatedBoxes[lastIndex] = { position: { x: startX, y: startY }, size: { width, height } };
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

  const captureScreenshot = async () => {
    try {
      const uri = await captureRef(redBoxRef, {
        format: 'png',
        quality: 1,
      });

      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Unable to save screenshot to camera roll.');
        return;
      }

      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Screenshot saved', 'Screenshot saved to camera roll successfully.');
    } catch (error) {
      Alert.alert('Error', 'Failed to capture screenshot.');
      console.error('Failed to capture screenshot:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>
        width:{width/2}
      </Text>
      <Text>
        height: {height/2}
      </Text>
      <View
        ref={redBoxRef}
        style={[styles.box, { height: height / 2, width: width / 2 }]}
        {...panResponder.panHandlers}
      >
        <ImageBackground
          source={require('./assets/icon.png')}
          style={styles.backgroundImage}
        >
          <Text>Image should be here</Text>
        </ImageBackground>
        <DrawingBoxes drawingBoxes={drawingBoxes} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Box" onPress={() => switchDrawMode('box')} disabled={drawMode === 'box'} />
        <Button title="Reset" onPress={clearDrawing} />
        <Button title="Capture Screenshot" onPress={captureScreenshot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxDimensions: {
    position: 'absolute',
    color: 'blue',
    fontSize: 8,
  },
});
