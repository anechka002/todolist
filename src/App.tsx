import React, { useState } from 'react';
import './App.css';
import TodoList from './components/todolist/TodoList';
import { v1 } from 'uuid';
import AddItemForm from './components/itemForm/AddItemForm';

//Create +
//Read + (filter, type, sort, search, pagination)
//Update +
//Delete +

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type TaskStateType = {
  [key: string]: TaskType[]
}

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type FilterValuesType = 'all' | 'active' | 'completed' | 'delete'

function App() {
  let todolistID1 = v1()
	let todolistID2 = v1()
  // console.log(todolistID1)
  // console.log(todolistID2)

	let [todolists, setTodolists] = useState<TodolistType[]>([
  { id: todolistID1, title: 'What to learn', filter: 'all' },
  { id: todolistID2, title: 'What to buy', filter: 'all' },
	])

	let [tasks, setTasks] = useState({
  	[todolistID1]: [
			{ id: v1(), title: 'HTML&CSS', isDone: true },
			{ id: v1(), title: 'JS', isDone: true },
			{ id: v1(), title: 'ReactJS', isDone: false },
  	],
  	[todolistID2]: [
			{ id: v1(), title: 'Rest API', isDone: true },
			{ id: v1(), title: 'GraphQL', isDone: false },
  	],
	})

// BLL
  // const todoListTitle = 'What to learn';
  const todoListDate = '25.03.24';
// global state
  // const [tasks, setTasks] = useState<TaskType[]>([
  //   { id: v1(), title: 'HTML&CSS', isDone: true },
  //   { id: v1(), title: 'JS', isDone: true },
  //   { id: v1(), title: 'ReactJS', isDone: false },
  //   { id: v1(), title: 'Redux', isDone: false },
  //   { id: v1(), title: 'Typescript', isDone: true },
  //   { id: v1(), title: 'RTK query', isDone: false },
  // ])
  // console.log(tasks)

// local state
  // const [filter, setFilter] = useState<FilterValuesType>('all')
  const changeFilter = (todolistId: string, value: FilterValuesType) => {
    setTodolists(todolists.map(el=> el.id === todolistId ? {...el, filter: value} : el))
  }

  // const tasks2: Array<TaskType> = [
  //   { id: 1, title: 'Filatov & Karas Feat. Masha', isDone: true },
  //   { id: 2, title: 'Modern Talking', isDone: false },
  //   { id: 3, title: 'Инфинити & D.i.p. Project', isDone: false },
  //   { id: 4, title: 'Dr. Alban', isDone: true },
  // ];
  // const tasks3: Array<TaskType> =[]

// UI
  
  const removeTask = (todolistId: string, taskId: string) => {
    // let filteredTask = {...tasks[todolistId].filter(el=>el.id !== taskId)}
    // setTasks({[todolistId]:filteredTask})
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(el => el.id !== taskId)})
    // let filteredTasks = tasks.filter((t) => (t.id !== taskId))
    // setTasks(filteredTasks)
    // console.log({[todolistId]:filteredTask})
  }
  // console.log(...tasks[todolistID1])

  const deleteAllTasks = () => {
    // setTasks([])
  }

  const addTask = (todolistId: string, title: string) => {
    let newTask: TaskType = { 
      id: v1(), 
      title: title, 
      isDone: false 
    }
    setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    // setTasks([newTask, ...tasks])
    console.log({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
  }

  const changeStatus = (todolistId: string, taskId: string, newIsDone: boolean) => {
    // let task = tasks.find(t => t.id === taskId)
    // if(task) {
    //   task.isDone = newIsDone
    //   setTasks([...tasks])
    // }

    // const newState = tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
    // setTasks(newState)
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(el => el.id === taskId ? {...el, isDone:newIsDone} : el)})
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(el => el.id !== todolistId))
    delete tasks[todolistId]
    setTasks({...tasks})
    console.log(tasks)
  }

  const addTodolist = (title: string) => {
    const newTodolistId = v1();
    const newTodolist: TodolistType = {
      id: newTodolistId,
      title: title,
      filter: 'all'
    }
    setTodolists([newTodolist, ...todolists])
    setTasks({...tasks, [newTodolistId]: []})
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
		setTasks({
			...tasks, [todolistId]:tasks[todolistId].map(el => el.id === taskId 
				? {...el, title}
				: el
			)})
	}
  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists(todolists.map(el => el.id === todolistId
      ? {...el, title: title}
      : el
    ))
  }

  return (
    <div className="App">
      <AddItemForm addItem={addTodolist}/>
      {todolists.map(el => {
        // let tasksForTodoList = tasks[el.id];
        // if(el.filter === 'completed') {
        //   tasksForTodoList = tasks[el.id].filter(t => t.isDone === true)
        // }
        // if(el.filter === 'active') {
        //   tasksForTodoList = tasks[el.id].filter(t => t.isDone === false)
        // }
        return (
          <TodoList 
            key={el.id}
            todolistId={el.id}
            title={el.title} 
            tasks={tasks[el.id]} 
            date={todoListDate} 
            removeTask={removeTask}
            changeFilter={changeFilter}
            deleteAllTasks={deleteAllTasks}
            addTask={addTask}
            changeStatus={changeStatus}
            filter={el.filter}
            removeTodolist={removeTodolist}
            updateTask={updateTask}
            updateTodolist={updateTodolist}
            />
        )
      })}  
    </div>
  );
}

export default App;
