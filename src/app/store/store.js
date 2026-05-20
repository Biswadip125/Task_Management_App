import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../../features/tasks/redux/tasksSlice';
import themeReducer from '../../features/theme/redux/themeSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
    theme: themeReducer,
  },
});
