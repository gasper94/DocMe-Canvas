import React from 'react';
import { View, StyleSheet, TouchableHighlight, Text } from 'react-native';
import DraggableFlatList from 'react-native-draggable-flatlist';

const HistoricDataList = () => {
  const [data, setData] = React.useState([
    { key: 'item1', label: 'Item 1' },
    { key: 'item2', label: 'Item 2' },
    { key: 'item3', label: 'Item 3' },
    { key: 'item4', label: 'Item 1' },
    { key: 'item5', label: 'Item 2' },
    { key: 'item6', label: 'Item 3' },
    // Add more items as needed
  ]);

  const Item = ({ label }) => (
    <TouchableHighlight>
      <View style={styles.itemContainer}>
        <Text>{label}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderItem = ({ item }) => (
    <Item label={item.label} />
  );

  const handleOrderChange = ({ data }) => {
    setData(data);
  };

  return (
    <View style={styles.container}>
      <DraggableFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        onDragEnd={handleOrderChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default HistoricDataList;
