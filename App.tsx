import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/app/navigation/RootNavigation';
import { useEffect } from 'react';
import { createTables } from './src/database/database';
import { Provider } from 'react-redux';
import { store } from './src/app/store/store';
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
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

export default App;
