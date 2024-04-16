import React, { useState } from 'react';
import './App.css';
import TodoList from './components/todolist/TodoList';
import { v1 } from 'uuid';

//Create +
//Read + (filter, type, sort, search, pagination)
//Update +
//Delete +

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed' | 'delete'

function App() {
// BLL
  const todoListTitle = 'What to learn';
  const todoListDate = '25.03.24';
// global state
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Redux', isDone: false },
    { id: v1(), title: 'Typescript', isDone: true },
    { id: v1(), title: 'RTK query', isDone: false },
  ])
  // console.log(tasks)

// local state
  const [filter, setFilter] = useState<FilterValuesType>('all')
  const changeFilter = (value: FilterValuesType) => {
    setFilter(value)
  }

  // const tasks2: Array<TaskType> = [
  //   { id: 1, title: 'Filatov & Karas Feat. Masha', isDone: true },
  //   { id: 2, title: 'Modern Talking', isDone: false },
  //   { id: 3, title: 'Инфинити & D.i.p. Project', isDone: false },
  //   { id: 4, title: 'Dr. Alban', isDone: true },
  // ];
  // const tasks3: Array<TaskType> =[]

// UI
  let tasksForTodoList = tasks;
  if(filter === 'completed') {
    tasksForTodoList = tasks.filter(t => t.isDone === true)
  }
  if(filter === 'active') {
    tasksForTodoList = tasks.filter(t => t.isDone === false)
  }
  const removeTask = (taskId: string) => {
    let filteredTasks = tasks.filter((t) => (t.id !== taskId))
    setTasks(filteredTasks)
  }

  const deleteAllTasks = () => {
    setTasks([])
  }

  const addTask = (title: string) => {
    let newTask: TaskType = { 
      id: v1(), 
      title: title, 
      isDone: false 
    }
    setTasks([newTask, ...tasks])
  }

  const changeStatus = (taskId: string, newIsDone: boolean) => {
    // let task = tasks.find(t => t.id === taskId)
    // if(task) {
    //   task.isDone = newIsDone
    //   setTasks([...tasks])
    // }
    const newState = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
    setTasks(newState)
  }

  return (
    <div className="App">
      
        <TodoList 
          title={todoListTitle} 
          tasks={tasksForTodoList} 
          date={todoListDate} 
          removeTask={removeTask}
          changeFilter={changeFilter}
          deleteAllTasks={deleteAllTasks}
          addTask={addTask}
          changeStatus={changeStatus}
          filter={filter}
          />
          
        {/* <TodoList title={'Songs'} tasks={tasks2}/>
        <TodoList title={'Bookings'} tasks={tasks3}/> */}
    
    </div>
  );
}

export default App;
