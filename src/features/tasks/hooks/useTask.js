import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  fetchTasksThunk,
  deleteTaskThunk,
  toggleTaskStatusThunk,
  updateTaskThunk,
  addTaskThunk,
} from '../redux/tasksThunk';
import { Alert } from 'react-native';

export default function useTasks() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const tasks = useSelector(state => state.tasks.tasks);

  const loading = useSelector(state => state.tasks.loading);

  const deleteTask = id => {
    dispatch(deleteTaskThunk(id));
  };

  const toggleTask = (id, completed) => {
    dispatch(
      toggleTaskStatusThunk({
        id,
        completed,
      }),
    );
  };

  const updateTask = (id, title, description, reminderTime) => {
    dispatch(
      updateTaskThunk({
        id,
        title,
        description,
        reminderTime,
      }),
    );
    Alert.alert('Success', 'Task Updated Successfully');
    navigation.goBack();
  };

  const addTask = async (title, description, reminderTime) => {
    if (!title) {
      Alert.alert('Error', 'Please add the task title');
      return;
    }
    await dispatch(
      addTaskThunk({
        title,
        description,
        completed: false,
        reminderTime,
      }),
    );
    navigation.navigate('Tasks');
  };

  return {
    tasks,
    loading,
    deleteTask,
    toggleTask,
    updateTask,
    addTask,
  };
}
