import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getTasks,
  insertTask,
  updateTask,
  toggleTaskStatus,
  deleteTask,
} from '../../../database/taskRepository';

export const fetchTasksThunk = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const tasks = await getTasks();
    return tasks;
  },
);

export const addTaskThunk = createAsyncThunk('tasks/addTask', async task => {
  const insertId = await insertTask(task);
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

    return {
      id,
      title,
      description,
    };
  },
);

export const toggleTaskStatusThunk = createAsyncThunk(
  'tasks/toggleTask',
  async ({ id, completed }) => {
    await toggleTaskStatus(id, completed);
    return {
      id,
      completed,
    };
  },
);

export const deleteTaskThunk = createAsyncThunk(
  'tasks/deleteTask',
  async id => {
    await deleteTask(id);
    return id;
  },
);
