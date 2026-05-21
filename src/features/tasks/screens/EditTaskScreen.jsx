import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

import useTasks from '../hooks/useTask';

import { useAppTheme } from '../../../theme/useAppTheme';
import Toast from 'react-native-toast-message';

export default function EditTaskScreen({ navigation, route }) {
  const { task } = route.params;

  const { updateTask } = useTasks();

  const [title, setTitle] = useState(task?.title);

  const [description, setDescription] = useState(task?.description);

  const [reminderTime, setReminderTime] = useState(
    task?.reminderTime ? new Date(Number(task?.reminderTime)) : new Date(),
  );

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const theme = useAppTheme();

  const styles = createStyles(theme);
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

        <Text style={styles.label}>Reminder Date</Text>

        <TouchableOpacity
          style={styles.reminderButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.reminderText}>
            {reminderTime.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Reminder Time</Text>

        <TouchableOpacity
          style={styles.reminderButton}
          onPress={() => setShowTimePicker(true)}
        >
          <Text style={styles.reminderText}>
            {reminderTime.toLocaleTimeString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={reminderTime}
            mode="date"
            minimumDate={new Date()}
            display="default"
            onDismiss={() => setShowDatePicker(false)}
            onValueChange={(event, selectedDate) => {
              setShowDatePicker(false);

              if (selectedDate) {
                const updatedDate = new Date(reminderTime);

                updatedDate.setFullYear(selectedDate.getFullYear());

                updatedDate.setMonth(selectedDate.getMonth());

                updatedDate.setDate(selectedDate.getDate());

                setReminderTime(updatedDate);
              }
            }}
          />
        )}
        {showTimePicker && (
          <DateTimePicker
            value={reminderTime}
            mode="time"
            is24Hour={true}
            display="default"
            onDismiss={() => setShowTimePicker(false)}
            onValueChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (event.type === 'dismissed') return;
              if (selectedTime) {
                const updatedTime = new Date(reminderTime);

                updatedTime.setHours(selectedTime.getHours());

                updatedTime.setMinutes(selectedTime.getMinutes());

                setReminderTime(updatedTime);
              }
            }}
          />
        )}

        <TouchableOpacity
          style={styles.updateButton}
          onPress={() => {
            if (!title) {
              Toast.show({
                type: 'error',
                text1: 'Please Add task title',
              });
              return;
            }
            if (reminderTime.getTime() <= Date.now()) {
              Toast.show({
                type: 'error',
                text1: 'Invalid Reminder',
                text2: 'Please select a future date and time',
              });

              return;
            }
            updateTask(task.id, title, description, reminderTime.getTime());
          }}
        >
          <Text style={styles.updateButtonText}>Update Task</Text>
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

    reminderButton: {
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 16,
      marginBottom: 20,
      backgroundColor: theme.background,
    },

    reminderText: {
      color: theme.text,
      fontSize: 16,
    },

    updateButton: {
      backgroundColor: theme.btnBackground,

      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 10,
    },

    updateButtonText: {
      color: theme.btnText,
      fontSize: 16,
      fontWeight: '700',
    },
  });
