import React from 'react';
import './App.css';
import TodoList from './components/todolist/TodoList';

export type TaskType = {
  id: number
  title: string
  isDone: boolean
}

function App() {
  const tasks1: Array<TaskType> = [
    { id: 1, title: 'HTML&CSS', isDone: true },
    { id: 2, title: 'JS', isDone: true },
    { id: 3, title: 'ReactJS', isDone: false },
    { id: 4, title: 'Redux', isDone: false },
    { id: 5, title: 'Typescript', isDone: true },
    { id: 6, title: 'RTK query', isDone: false },
  ];
  const tasks2: Array<TaskType> = [
    { id: 1, title: 'Filatov & Karas Feat. Masha', isDone: true },
    { id: 2, title: 'Modern Talking', isDone: false },
    { id: 3, title: 'Инфинити & D.i.p. Project', isDone: false },
    { id: 4, title: 'Dr. Alban', isDone: true },
    
  ];
  const tasks3: Array<TaskType> =[]

  return (
    <div className="App">
      
        <TodoList title={'What to learn'} tasks={tasks1} date={'25.03.24'}/>
        <TodoList title={'Songs'} tasks={tasks2}/>
        <TodoList title={'Bookings'} tasks={tasks3}/>
    
    </div>
  );
}

export default App;
