import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskListCard({
  title,
  description,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) {
  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.topSection}>
        {/* Checkbox */}
        <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
          <View style={[styles.checkbox, completed && styles.checkboxChecked]}>
            {completed && <Text style={styles.checkmark}>✓</Text>}
          </View>
        </TouchableOpacity>

        {/* Task Content */}
        <View style={styles.contentContainer}>
          <Text style={[styles.title, completed && styles.completedText]}>
            {title}
          </Text>

          <Text style={[styles.description, completed && styles.completedText]}>
            {description}
          </Text>
        </View>
      </View>

      {/* Buttons */}
      <View style={styles.actionContainer}>
        {!completed && (
          <TouchableOpacity style={styles.editButton} onPress={onEdit}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    elevation: 3,
  },

  topSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  checkboxContainer: {
    marginRight: 14,
    marginTop: 2,
  },

  checkbox: {
    width: 26,
    height: 26,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  checkboxChecked: {
    backgroundColor: '#000',
  },

  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  contentContainer: {
    flex: 1,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
  },

  description: {
    marginTop: 6,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },

  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },

  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
  },

  editButton: {
    backgroundColor: '#000',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  editText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  deleteButton: {
    borderWidth: 1,
    borderColor: '#ff3b30',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 10,
  },

  deleteText: {
    color: '#ff3b30',
    fontWeight: '600',
    fontSize: 14,
  },
});
