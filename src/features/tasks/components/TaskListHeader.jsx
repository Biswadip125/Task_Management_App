import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const TaskListHeader = ({ navigation }) => {
  const handleAddBtnPress = () => {
    navigation.navigate('AddTask');
  };
  return (
    <View style={styles.tasklistHeader}>
      <Text style={{ fontSize: 16, fontWeight: '600' }}>All Tasks</Text>
      <Pressable style={styles.addBtn} onPress={handleAddBtnPress}>
        <Text style={styles.addBtnText}>Add</Text>
      </Pressable>
    </View>
  );
};

export default TaskListHeader;

const styles = StyleSheet.create({
  tasklistHeader: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#000',
    color: 'white',
    borderRadius: 10,
  },
  addBtnText: {
    color: 'white',
    fontSize: 16,
  },
});
