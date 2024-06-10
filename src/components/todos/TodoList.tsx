import React, { ChangeEvent } from 'react'
import { FilterValuesType, TasksStateType } from '../../App'
import { EditableSpan } from '../span/EditableSpan'
import { AddItemForm } from '../itemForm/AddItemForm'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {Button, Checkbox} from "@mui/material";

type Props = {
  todolistId: string
  tasks: TasksStateType
  title: string
  filter: FilterValuesType
  changeFilter: (todolistId: string, filter: FilterValuesType) => void
  removeTask:(todolistId: string, id: string) => void
  changeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
  addTask: (todolistId: string, title: string) => void
  removeTodoList: (todolistId: string) => void
  updateTask: (todolistId: string, id: string, title: string) => void
  updateTodoList: (todolistId: string, title: string) => void
}

export function TodoList({todolistId, tasks, title, filter, changeFilter, removeTask, changeTaskStatus, addTask, removeTodoList, updateTask, updateTodoList}: Props) {

  let currentFilter = tasks[todolistId];
  if(filter === 'active') {
    currentFilter = tasks[todolistId].filter(el => el.isDone === false)
  }
  if(filter === 'completed') {
    currentFilter = tasks[todolistId].filter(el => el.isDone === true)
  }

  const addTaskHandler = (newTitle: string) => {
    addTask(todolistId, newTitle)
  }

  const removeTodoListHandler = () => {
    removeTodoList(todolistId)
  }

  const updateTodoListHandler = (newTitle: string) => {
    updateTodoList(todolistId, newTitle)
  }

  const onAllClickHandler = () => changeFilter(todolistId, 'all');
  const onActiveClickHandler = () => changeFilter(todolistId, 'active');
  const onCompletedClickHandler = () => changeFilter(todolistId, 'completed');
  
  return (
    <div>
      <h3><EditableSpan oldTitle={title} updateItem={updateTodoListHandler}/>
        <IconButton onClick={removeTodoListHandler}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler}/>
      <div>
        {currentFilter.map(el => {
          const onClickHandler = () => removeTask(todolistId, el.id)
          const onChangeTaskStatusHandler = ( e:ChangeEvent<HTMLInputElement>) => {
            changeTaskStatus(todolistId, el.id, e.currentTarget.checked)
          }
          const updateTaskHandler = (newTitle: string) => {
            updateTask(todolistId, el.id, newTitle)
          }
          return (
            <div key={el.id} className={el.isDone ? 'is-done' : ''}>
              <Checkbox
                checked={el.isDone}
                onChange={onChangeTaskStatusHandler}
                color='primary'
              />
              <EditableSpan oldTitle={el.title} updateItem={updateTaskHandler}/>
              <IconButton onClick={onClickHandler}>
                <Delete/>
              </IconButton>
            </div>
          )
        })}
      </div>      
      <div>
        <Button variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
        >All
        </Button>
        <Button variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}
        >Active
        </Button>
        <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
        >Completed
        </Button>
      </div>
    </div>
  )
}
