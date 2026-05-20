import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  deleteTask,
  getPendingTasks,
  markTaskAsSynced,
} from '../../database/taskRepository';
import Toast from 'react-native-toast-message';

export const syncPendingTasks = async showToast => {
  const userId = auth().currentUser.uid;

  const pendingTasks = await getPendingTasks();
  for (const task of pendingTasks) {
    const firestoreTask = {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
    };
    if (task.syncStatus === 'pending_delete') {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(String(task.id))
        .delete();

      await deleteTask(task.id);
    } else {
      await firestore()
        .collection('users')
        .doc(userId)
        .collection('tasks')
        .doc(String(task.id))
        .set(firestoreTask);

      await markTaskAsSynced(task.id);
    }

    if (showToast) {
      Toast.show({
        type: 'success',
        text1: 'Tasks Sync',
      });
    }
  }
};
