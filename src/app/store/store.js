import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../../features/tasks/redux/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});
