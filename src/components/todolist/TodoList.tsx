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

  const deleteAllTasksHandler = () => {
    deleteAllTasks()
  }

  const onClickAddTaskHandler = () => {
    addTask(newTaskTitle)
    setNewTaskTitle('')
  }

  const changeFilterHandler = (value: FilterValuesType) => {
    changeFilter(value)
  }

  const removeTaskHandler = (taskId: string) => {
    removeTask(taskId)
  }


  return (
    <div className='todolist'>
      <h3>{title}</h3>
      <div>
        <input value={newTaskTitle} onChange={onChangeSetTaskTitle} onKeyDown={onkeyDownAddTaskHandler} />
        <Button disabled={!ifTaskCanAdded} callBack={onClickAddTaskHandler} title={'+'}/>
        {isTitleTooLong && <div>Stop!!!</div>}
      </div>

      {tasks.length === 0 ? (
        <p>Тасок нет :(</p>
      ) : (
      <ul>

        {tasks.map( (t) => {
          // const removeTaskHandler = () => {
          //   removeTask(t.id)
          // }
          return (
            <li key={t.id}>
              <input type="checkbox" checked={t.isDone} /> 
              <span>{t.title}</span>
              <Button callBack={()=>removeTaskHandler(t.id)} title={'x'}/>
            </li>
          );
        })}

      </ul>
      )}

      <Button callBack={deleteAllTasksHandler} title={'DELETE ALL TASKS'}/>

      <div className='btn'>
        <Button callBack={() => {changeFilterHandler('all')}} title={'All'}/>
        <Button callBack={() => {changeFilterHandler('active')}} title={'Active'}/>
        <Button callBack={() => {changeFilterHandler('completed')}} title={'Completed'}/>
      </div>
      <div>{date}</div> 
    </div>
  )
}

export default TodoList;