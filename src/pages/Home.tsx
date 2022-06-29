import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
      setTasks((state) => [...state, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false
      }])
  }

  function handleToggleTaskDone(id: number) {
    const newTasksList = tasks.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          done: !item.done
        }
      } else {
        return item;
      }
    });

    setTasks(newTasksList);
  }

  function handleRemoveTask(id: number) {
    const newFilteredTaskList = tasks.filter((item) => item.id !== id);

    setTasks(newFilteredTaskList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />
      

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})