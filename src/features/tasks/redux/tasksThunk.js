import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getTasks,
  insertTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
  markTaskForDeletion,
} from '../../../database/taskRepository';
import { isInternetAvailable } from '../../../services/network/networkService';
import { syncPendingTasks } from '../../../services/sync/syncService';
import {
  cancelNotification,
  scheduleNotification,
} from '../../../services/notification/notificationService';

export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const tasks = await getTasks();
    return tasks;
  },
);

export const addTaskThunk = createAsyncThunk('tasks/addTask', async task => {
  const insertId = await insertTask(task);
  console.log(task);
  await scheduleNotification({ ...task, id: insertId });

  const isConnected = await isInternetAvailable();
  if (isConnected) {
    syncPendingTasks(false);
  }

  return {
    id: insertId,
    title: task.title,
    description: task.description,
    completed: task.completed,
    syncStatus: isConnected ? 'synced' : 'pending',
    reminderTime: task.reminderTime,
  };
});

export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, title, description, reminderTime }) => {
    await updateTask(id, title, description, reminderTime);

    //cancel old notification
    await cancelNotification(id);

    //create new Notification
    await scheduleNotification({ id, title, reminderTime });

    const isConnected = await isInternetAvailable();
    if (isConnected) {
      syncPendingTasks(false);
    }

    return {
      id,
      title,
      description,
      syncStatus: isConnected ? 'synced' : 'pending',
      reminderTime,
    };
  },
);

export const toggleTaskStatusThunk = createAsyncThunk(
  'tasks/toggleTask',
  async ({ id, completed }) => {
    await toggleTaskStatus(id, completed);

    //cancel the notification
    await cancelNotification(id);

    const isConnected = await isInternetAvailable();

    if (isConnected) {
      syncPendingTasks(false);
    }

    return {
      id,
      completed,
      syncStatus: isConnected ? 'synced' : 'pending',
    };
  },
);

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async id => {
    await markTaskForDeletion(id);

    //cancel the notification
    await cancelNotification(id);

    const isConnected = await isInternetAvailable();

    if (isConnected) {
      syncPendingTasks(false);
    }
    return id;
  },
);
