import React, { KeyboardEvent, ChangeEvent, useState } from 'react'
import { FilterValuesType, TaskStateType, TaskType, TodolistType } from '../../App'
import Button from '../button/Button'
import s from '../button/Button.module.css'

type TodoListPropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (todolistId: string, taskId: string) => void
  changeFilter: (todolistId: string, value: FilterValuesType) => void
  deleteAllTasks: (value: FilterValuesType) => void
  addTask: (todolistId: string, title: string) => void
  changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  filter: FilterValuesType
  removeTodolist: (todolistId: string) => void
}

function TodoList({
  todolistId,
  title, 
  tasks, 
  date, 
  removeTask, 
  changeFilter, 
  deleteAllTasks, 
  addTask,
  changeStatus,
  filter, 
  removeTodolist
}: TodoListPropsType) {

  let tasksForTodolist = tasks
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(task => !task.isDone)
  }

  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(task => task.isDone)
    console.log(tasksForTodolist)
  }

  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [taskInputError, setTaskInputError] = useState<string | null>(null)

  const isTitleTooLong = newTaskTitle.length > 15
  const ifTaskCanAdded = newTaskTitle && !isTitleTooLong

  const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    // console.log(e.currentTarget.value)
    setNewTaskTitle(e.currentTarget.value)
  }

  const onkeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setTaskInputError(null)
    if(e.key === 'Enter' && ifTaskCanAdded) {
      onClickAddTaskHandler()
    }
  }

  // const deleteAllTasksHandler = (value: FilterValuesType) => {
  //   changeFilter('delete')
  //   deleteAllTasks(value)
  // }

  const onClickAddTaskHandler = () => {
    const trimmedTaskTitle = newTaskTitle.trim()
    if(trimmedTaskTitle) {
      addTask(todolistId,trimmedTaskTitle)     
    } else {
      setTaskInputError('Title is required')
    }
    setNewTaskTitle('')
  }

  const changeFilterHandler = (todolistId: string, value: FilterValuesType) => {
    changeFilter(todolistId, value)
  }

  const removeTaskHandler = (taskId: string) => {
    removeTask(todolistId,taskId)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  return (
    <div className='todolist'>
      <h3>
        {title}
        <button onClick={removeTodolistHandler}>x</button>
      </h3>
      <div>
        <input 
          className={taskInputError ? 'task-input-error' : ''} 
          value={newTaskTitle} 
          onChange={onChangeSetTaskTitle} 
          onKeyDown={onkeyDownAddTaskHandler} 
        />
        <Button disabled={!ifTaskCanAdded} callBack={onClickAddTaskHandler} title={'+'}/>
        {isTitleTooLong && <div>Your task title is too long.</div>}
        {taskInputError && <div className='task-input-error-message'>{taskInputError}</div>}
      </div>

      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет :(</p>
      ) : (
      <ul>

        {tasksForTodolist.map( (t) => {
          // const removeTaskHandler = () => {
          //   removeTask(t.id)
          // }

          const changeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            // console.log(e.currentTarget.checked)
            changeStatus(todolistId, t.id, e.currentTarget.checked)
          }
        
          return (
            <li key={t.id}>
              <input onChange={changeStatusHandler} type="checkbox" checked={t.isDone} /> 
              <span className={t.isDone ? s.taskDone : s.task}>{t.title}</span>
              <Button callBack={()=>removeTaskHandler(t.id)} title={'x'}/>
            </li>
          );
        })}

      </ul>
      )}

      {/* <Button className={filter === 'delete' ? s.filterBtnActive : ''} callBack={() => {deleteAllTasksHandler('delete')}} title={'DELETE ALL TASKS'}/> */}

      <div className='btn'>
        <Button className={filter === 'all' ? s.filterBtnActive : ''} callBack={() => {changeFilterHandler(todolistId, 'all')}} title={'All'}/>
        <Button className={filter === 'active' ? s.filterBtnActive : ''} callBack={() => {changeFilterHandler(todolistId, 'active')}} title={'Active'}/>
        <Button className={filter === 'completed' ? s.filterBtnActive : ''} callBack={() => {changeFilterHandler(todolistId, 'completed')}} title={'Completed'}/>
      </div>
      <div>{date}</div> 
    </div>
  )
}

export default TodoList;