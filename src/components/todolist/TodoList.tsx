import React, { KeyboardEvent, ChangeEvent, useState } from 'react'
import { FilterValuesType, TaskType } from '../../App'
import Button from '../Button'

type TodoListPropsType = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (taskId: string) => void
  changeFilter: (value: FilterValuesType) => void
  deleteAllTasks: () => void
  addTask: (title: string) => void
}

function TodoList({
  title, 
  tasks, 
  date, 
  removeTask, 
  changeFilter, 
  deleteAllTasks, 
  addTask
}: TodoListPropsType) {

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const onClickAddTaskHandler = () => {
    addTask(newTaskTitle)
    setNewTaskTitle('')
  }

  const isTitleTooLong = newTaskTitle.length > 15
  const ifTaskCanAdded = newTaskTitle && !isTitleTooLong

  const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value)
    setNewTaskTitle(e.currentTarget.value)
  }

  const onkeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter' && ifTaskCanAdded) {
      onClickAddTaskHandler()
    }
  }

  return (
    <div className='todolist'>
      <h3>{title}</h3>
      <div>
        <input value={newTaskTitle} onChange={onChangeSetTaskTitle} onKeyDown={onkeyDownAddTaskHandler} />
        <Button disabled={!ifTaskCanAdded} addTask={onClickAddTaskHandler} title={'+'}/>
        {isTitleTooLong && <div>Stop!!!</div>}
      </div>

      {tasks.length === 0 ? (
        <p>Тасок нет :(</p>
      ) : (
      <ul>

        {tasks.map( (t) => {
          const removeTaskHandler = () => {
            removeTask(t.id)
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

      <Button deleteAllTasks={deleteAllTasks} title={'DELETE ALL TASKS'}/>

      <div className='btn'>
        <Button changeFilter={() => {changeFilter('all')}} title={'All'}/>
        <Button changeFilter={() => {changeFilter('active')}} title={'Active'}/>
        <Button changeFilter={() => {changeFilter('completed')}} title={'Completed'}/>
      </div>
      <div>{date}</div> 
    </div>
  )
}

export default TodoList