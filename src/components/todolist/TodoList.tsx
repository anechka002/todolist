import React, { useState } from 'react'
import { FilterValuesType, TaskType } from '../../App'
import Button from '../Button'

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (taskId: number) => void
  changeFilter: (value: FilterValuesType) => void
  deleteAllTasks: () => void
}

function TodoList(props: TodoListPropsType) {
  return (
    <div className='todolist'>
      <h3>{props.title}</h3>
      <div>
        <input />
        <Button title={'+'}/>
      </div>

      {props.tasks.length === 0 ? (
        <p>Тасок нет :(</p>
      ) : (
      <ul>

        {props.tasks.map( (t) => {
          const removeTaskHandler = () => {
            props.removeTask(t.id)
          }
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} /> 
              <span>{t.title}</span>
              <button onClick={removeTaskHandler}>x</button>
            </li>
          );
        })}

      </ul>
      )}

      <Button deleteAllTasks={props.deleteAllTasks} title={'DELETE ALL TASKS'}/>

      <div className='btn'>
        <Button changeFilter={() => {props.changeFilter('all')}} title={'All'}/>
        <Button changeFilter={() => {props.changeFilter('active')}} title={'Active'}/>
        <Button changeFilter={() => {props.changeFilter('completed')}} title={'Completed'}/>
      </div>
      <div>{props.date}</div> 
    </div>
  )
}

export default TodoList