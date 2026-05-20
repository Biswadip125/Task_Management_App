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

export default function EditTaskScreen({ navigation, route }) {
  const { task } = route.params;
  const { updateTask } = useTasks();
  const [title, setTitle] = useState(task?.title);
  const [description, setDescription] = useState(task?.description);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Edit Task</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Task Title</Text>

        <TextInput
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <Text style={styles.label}>Task Description</Text>

        <TextInput
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, styles.descriptionInput]}
          multiline
        />

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => updateTask(task.id, title, description)}
        >
          <Text style={styles.updateButtonText}>Update Task</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
    marginTop: 20,
    marginBottom: 30,
  },

  formContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FAFAFA',
    marginBottom: 20,
  },

  descriptionInput: {
    height: 120,
    textAlignVertical: 'top',
  },

  updateButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },

  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
