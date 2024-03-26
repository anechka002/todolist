import React from 'react'
import { TaskType } from '../../App'
import Button from '../Button'

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  date?: string
}

function TodoList({title, tasks, date}: TodoListPropsType) {
  return (
    <div className='todolist'>
    <h3>{title}</h3>
    <div>
      <input />
      <Button title={'+'}/>
    </div>

    {tasks.length === 0 ? (
      <p>Тасок нет</p>
    ) : (
    <ul>

      {tasks.map( (t) => {
        return (
          <li key={t.id}>
            <input type="checkbox" checked={t.isDone} /> <span>{t.title}</span>
          </li>
        );
      })}

    </ul>
    )}

    <div>
      <Button title={'All'}/>
      <Button title={'Active'}/>
      <Button title={'Completed'}/>
    </div>
    <div>{date}</div>
  </div>
  )
}

export default TodoList