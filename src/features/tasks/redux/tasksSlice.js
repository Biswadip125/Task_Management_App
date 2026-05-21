import { createSlice } from '@reduxjs/toolkit';

import {
  fetchTasksThunk,
  addTaskThunk,
  updateTaskThunk,
  toggleTaskStatusThunk,
  deleteTaskThunk,
} from './tasksThunk';

const initialState = {
  tasks: [],
  loading: false,
};

const taskSlice = createSlice({
  name: 'tasks',

  initialState,

  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTasksThunk.pending, state => {
        state.loading = true;
      })
      .addCase(fetchTasksThunk.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(addTaskThunk.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskThunk.fulfilled, (state, action) => {
        const { id, title, description, syncStatus, reminderTime } =
          action.payload;
        state.tasks = state.tasks.map(task =>
          task.id === id
            ? { ...task, title, description, syncStatus, reminderTime }
            : task,
        );
      })
      .addCase(toggleTaskStatusThunk.fulfilled, (state, action) => {
        const { id, completed, syncStatus } = action.payload;
        state.tasks = state.tasks.map(task =>
          task.id === id ? { ...task, completed: completed, syncStatus } : task,
        );
      })
      .addCase(deleteTaskThunk.fulfilled, (state, action) => {
        const id = action.payload;
        state.tasks = state.tasks.filter(task => task.id !== id);
      });
  },
});

export default taskSlice.reducer;
