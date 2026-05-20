import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useAppTheme } from '../../../theme/useAppTheme';

const TaskListHeader = ({ navigation }) => {
  const theme = useAppTheme();
  const styles = createStyles(theme);
  const handleAddBtnPress = () => {
    navigation.navigate('AddTask');
  };
  return (
    <View style={styles.tasklistHeader}>
      <Text style={styles.allTaskText}>All Tasks</Text>
      <Pressable style={styles.addBtn} onPress={handleAddBtnPress}>
        <Text style={styles.addBtnText}>Add</Text>
      </Pressable>
    </View>
  );
};

export default TaskListHeader;

const createStyles = theme => {
  return StyleSheet.create({
    tasklistHeader: {
      padding: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    allTaskText: {
      color: theme.text,
      fontSize: 16,
      fontWeight: '600',
    },
    addBtn: {
      paddingVertical: 6,
      paddingHorizontal: 10,
      backgroundColor: theme.btnBackground,

      borderRadius: 10,
    },
    addBtnText: {
      color: theme.btnText,
      fontSize: 16,
    },
  });
};
