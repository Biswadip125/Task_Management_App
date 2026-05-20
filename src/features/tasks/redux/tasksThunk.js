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

export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const tasks = await getTasks();
    return tasks;
  },
);

export const addTaskThunk = createAsyncThunk('tasks/addTask', async task => {
  const insertId = await insertTask(task);

  const isConnected = await isInternetAvailable();

  if (isConnected) {
    syncPendingTasks(false);
  }

  return {
    id: insertId,
    title: task.title,
    description: task.description,
    completed: task.completed,
    syncStatus: 'pending',
  };
});

export const updateTaskThunk = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, title, description }) => {
    await updateTask(id, title, description);

    const isConnected = await isInternetAvailable();
    if (isConnected) {
      syncPendingTasks(false);
    }

    return {
      id,
      title,
      description,
      syncStatus: 'pending',
    };
  },
);

export const toggleTaskStatusThunk = createAsyncThunk(
  'tasks/toggleTask',
  async ({ id, completed }) => {
    await toggleTaskStatus(id, completed);

    const isConnected = await isInternetAvailable();

    if (isConnected) {
      syncPendingTasks(false);
    }
    return {
      id,
      completed,
      syncStatus: 'pending',
    };
  },
);

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async id => {
    await markTaskForDeletion(id);

    const isConnected = await isInternetAvailable();

    if (isConnected) {
      syncPendingTasks(false);
    }
    return id;
  },
);
