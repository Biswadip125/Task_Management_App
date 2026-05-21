import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import TaskListCard from './TaskListCard';
import useTask from '../hooks/useTask';
import { useDispatch } from 'react-redux';
import { fetchTasksThunk } from '../redux/tasksThunk';

const TaskLists = ({ navigation }) => {
  const { tasks, toggleTask, deleteTask } = useTask();
  const dispatch = useDispatch();
  const editTask = async task => {
    navigation.navigate('EditTask', { task });
  };

  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, []);

  const renderItem = ({ item }) => {
    if (item.syncStatus === 'pending_delete') return;
    return (
      <TaskListCard
        title={item.title}
        description={item.description}
        completed={item.completed ? true : false}
        onToggle={() => {
          toggleTask(item.id, item?.completed ? false : true);
        }}
        onEdit={() => editTask(item)}
        onDelete={() => deleteTask(item.id)}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={tasks}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
      />
    </View>
  );
};

export default TaskLists;

const styles = StyleSheet.create({});
