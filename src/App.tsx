import React, { useState } from 'react';
import './App.css';
import TodoList from './components/todolist/TodoList';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {
// BLL
  const todoListTitle = 'What to learn';
  const todoListDate = '25.03.24';
// state
  const [tasks1, setTasks1] = useState<TaskType[]>([
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: true },
    { id: 6, title: 'RTK query', isDone: false },
  ])

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
  let tasksForTodoList = tasks1;
  if(filter === 'completed') {
    tasksForTodoList = tasks1.filter(t => t.isDone === true)
  }
  if(filter === 'active') {
    tasksForTodoList = tasks1.filter(t => t.isDone === false)
  }
  const removeTask = (taskId: number) => {
    let filteredTasks = tasks1.filter((t) => (t.id !== taskId))
    setTasks1(filteredTasks)
  }

  const deleteAllTasks = () => {
    setTasks1([])
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
          />
        {/* <TodoList title={'Songs'} tasks={tasks2}/>
        <TodoList title={'Bookings'} tasks={tasks3}/> */}
    
    </div>
  );
}

export default App;
