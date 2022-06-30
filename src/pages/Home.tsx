
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)) return  Alert.alert("Atenção!", "Você não pode criar tarefas com o mesmo nome...")

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks([...tasks, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const tasksUpdated = tasks.map(task => ({ ...task }))
    const currentTask = tasksUpdated.find(task => task.id === id)
    currentTask!.done = !currentTask!.done
    setTasks(tasksUpdated)
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Atenção!", "Você deseja mesmo excluir esse item?", [
      {
        text: "Sim",
        onPress: () => {
          const tasksFiltered = tasks.filter(task => task.id !== id);
          setTasks(tasksFiltered)
        }
      },
      {
        text: "Não"
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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