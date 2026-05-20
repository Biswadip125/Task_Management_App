import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TaskListCard from './TaskListCard';
import useTask from '../hooks/useTask';

const TaskLists = ({ navigation }) => {
  const { tasks, toggleTask, deleteTask } = useTask();

  const editTask = async task => {
    navigation.navigate('EditTask', { task });
  };

  const renderItem = ({ item }) => (
    <TaskListCard
      title={item.title}
      description={item.description}
      completed={item.completed}
      onToggle={() => toggleTask(item.id, true)}
      onEdit={() => editTask(item)}
      onDelete={() => deleteTask(item.id)}
    />
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
};

export default TaskLists;

const styles = StyleSheet.create({});
