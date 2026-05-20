import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskListHeader from '../components/TaskListHeader';
import TaskLists from '../components/TaskLists';
import { useAppTheme } from '../../../theme/useAppTheme';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../theme/redux/themeSlice';
import auth from '@react-native-firebase/auth';
export default function TaskListScreen({ navigation }) {
  const theme = useAppTheme();
  const dispatch = useDispatch();
  const styles = createStyles(theme);
  const mode = useSelector(store => store.theme.mode);

  const handleChangeMode = () => {
    dispatch(toggleTheme());
  };

  const handleLogout = async () => {
    await auth().signOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Task List</Text>
        <View style={styles.headerBtns}>
          <TouchableOpacity style={styles.modeBtn} onPress={handleChangeMode}>
            <Text style={styles.modeText}>
              {mode === 'light' ? 'Dark' : 'Light'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TaskListHeader navigation={navigation} />
      <TaskLists navigation={navigation} />
    </SafeAreaView>
  );
}

const createStyles = theme => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomColor: theme.border,
      borderBottomWidth: 1,
      padding: 10,
    },
    headerText: {
      fontSize: 18,
      fontWeight: '700',
      color: theme.text,
    },
    headerBtns: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    logoutBtn: {
      padding: 4,
    },
    logoutText: {
      fontSize: 16,
      fontWeight: '900',
      color: theme.text,
    },
    modeBtn: {
      padding: 4,
    },
    modeText: {
      fontSize: 16,
      fontWeight: '900',
      color: theme.text,
    },
  });
};
