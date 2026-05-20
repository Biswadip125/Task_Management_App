import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/navigation/RootNavigation';
import { useEffect } from 'react';
import { createTables } from './src/database/database';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';
import { listenToNetwork } from './src/services/network/networkService';
import { syncPendingTasks } from './src/services/sync/syncService.js';
import Toast from 'react-native-toast-message';
function App() {
  useEffect(() => {
    const initDb = async () => {
      try {
        await createTables();
        console.log('Database initialized');
      } catch (err) {
        console.log('DB error', err);
      }
    };
    initDb();
  }, []);

  useEffect(() => {
    const unsubscribe = listenToNetwork((isConnected: boolean) => {
      if (!isConnected) {
        Toast.show({
          type: 'error',
          text1: 'You are offline',
        });
      }
      if (isConnected) {
        syncPendingTasks(true);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </Provider>
      <Toast />
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

export default App;
