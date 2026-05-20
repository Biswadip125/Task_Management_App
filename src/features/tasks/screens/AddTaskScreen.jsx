import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useTasks from '../hooks/useTask';

import { useAppTheme } from '../../../theme/useAppTheme';

export default function AddTaskScreen({ navigation }) {
  const [title, setTitle] = useState('');

  const [description, setDescription] = useState('');

  const { addTask } = useTasks();

  const theme = useAppTheme();

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Add New Task</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Task Title</Text>

        <TextInput
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholderTextColor={theme.secondaryText}
        />

        <Text style={styles.label}>Task Description</Text>

        <TextInput
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.descriptionInput]}
          multiline
          placeholderTextColor={theme.secondaryText}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => addTask(title, description)}
        >
          <Text style={styles.addButtonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const createStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,

      paddingHorizontal: 20,
    },

    heading: {
      fontSize: 28,
      fontWeight: '700',
      color: theme.text,
      marginTop: 20,
      marginBottom: 30,
    },

    formContainer: {
      backgroundColor: theme.card,
      borderRadius: 16,
      padding: 20,
      elevation: 3,
      borderWidth: 1,
      borderColor: theme.border,
    },

    label: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 10,
    },

    input: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 14,
      fontSize: 16,
      backgroundColor: theme.background,

      marginBottom: 20,
      color: theme.text,
    },

    descriptionInput: {
      height: 120,
      textAlignVertical: 'top',
    },

    addButton: {
      backgroundColor: theme.btnBackground,

      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },

    addButtonText: {
      color: theme.btnText,
      fontSize: 16,
      fontWeight: '700',
    },
  });
