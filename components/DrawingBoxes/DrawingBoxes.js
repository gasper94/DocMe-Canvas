import React from 'react';
import { Svg, Rect, Text } from 'react-native-svg';
import { StyleSheet } from 'react-native';

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
          <Rect
            x={startX}
            y={startY}
            width={boxWidth}
            height={boxHeight}
            fill="none"
            stroke="blue"
            strokeWidth="2"
            key={index}
          >
          <Text style={[styles.boxDimensions, { left: dimensionsX, top: dimensionsY }]}>
            {boxWidth.toFixed(0)} x {boxHeight.toFixed(0)}
          </Text>
          </Rect>
      );
    });
  };

  return (
    <Svg style={styles.drawingContainer}>
      {renderDrawing()}
      <Text>Hello</Text>
      {/* <Text style={[styles.boxDimensions, { left: 0, top: 1 }]}>{drawingBoxes.length}</Text> */}
    </Svg>
  );
};

const styles = StyleSheet.create({
  drawingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  boxDimensions: {
    position: 'absolute',
    color: 'blue',
  },
  
});

export default DrawingBoxes;
