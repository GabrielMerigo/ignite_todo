import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, StyleSheet, TextInput } from 'react-native';
import trashIcon from '../assets/icons/trash/trash.png'
import penEditIcon from '../assets/icons/pen-edit.png'
import XIcon from '../assets/icons/x.png'
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';

type TaskItem = {
  task: Task,
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, taskNewTitle: string) => void;
  index: number
}

export function TaskItem({ task, removeTask, toggleTaskDone, editTask, index }: TaskItem) {
  const [isEditing, setIsEditing] = useState(false);
  const [newValueTask, setNewValueTask] = useState(task.title);
  const textInputRef = useRef<TextInput>(null)


  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setNewValueTask(task.title)
  }

  function handleSubmitEditing() {
    editTask(task.id, newValueTask)
    setIsEditing(false);
  }

  useEffect(() => {
    isEditing ? textInputRef.current?.focus() : textInputRef.current?.blur();
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={newValueTask}
            onChangeText={setNewValueTask}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Image source={XIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={penEditIcon} />
          </TouchableOpacity>
        )}

        <View style={{ width: 1, height: 24, marginLeft: 24, backgroundColor: 'rgba(196, 196, 196, 0.24)' }}></View>

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingHorizontal: 24 }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1}} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})