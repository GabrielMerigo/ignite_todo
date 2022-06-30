
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showAlert, setShowAlert] = useState(false)

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle)) return setShowAlert(true)

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
    const tasksFiltered = tasks.filter(task => task.id !== id);
    setTasks(tasksFiltered)
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

      <AwesomeAlert
        show={showAlert}
        showProgress={false}
        title="Atenção!"
        message="Você não pode adicionar tasks com o mesmo nome"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="OK"
        cancelButtonColor='#8257E5'
        onCancelPressed={() => { setShowAlert(false) }}
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