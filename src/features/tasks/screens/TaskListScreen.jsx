import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TaskListHeader from '../components/TaskListHeader';
import TaskLists from '../components/TaskLists';

export default function TaskListScreen({ navigation }) {
  const handleLogout = async () => {
    await auth().signOut();
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Task List</Text>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <TaskListHeader navigation={navigation} />
      <TaskLists navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#2A2A2A',
    borderBottomWidth: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '700',
  },
  logoutBtn: {
    padding: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '900',
  },
});
