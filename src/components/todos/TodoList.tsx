import React, { ChangeEvent } from 'react'
import { EditableSpan } from '../span/EditableSpan'
import { AddItemForm } from '../itemForm/AddItemForm'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {Button, Checkbox} from "@mui/material";
import { useDispatch } from 'react-redux'
import { AppRootStateType } from '../../model/state/store'
import { useSelector } from 'react-redux'
import { addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC } from '../../model/task-reducer'
import { FilterValuesType, TaskType } from '../../type/type'

type Props = {
  todolistId: string
  title: string
  filter: FilterValuesType
  changeFilter: (todolistId: string, filter: FilterValuesType) => void
  removeTodoList: (todolistId: string) => void
  updateTodoList: (todolistId: string, title: string) => void
}

export function TodoList({todolistId, title, filter, changeFilter, removeTodoList, updateTodoList}: Props) {

  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
  const dispatch = useDispatch()
  // console.log(tasks)

  let currentFilter = tasks;
  if(filter === 'active') {
    currentFilter = tasks.filter(el => el.isDone === false)
  }
  if(filter === 'completed') {
    currentFilter = tasks.filter(el => el.isDone === true)
  }

  const addTaskHandler = (newTitle: string) => {
    dispatch(addTaskAC(todolistId, newTitle))
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
          const onClickHandler = () => dispatch(removeTaskAC(todolistId, el.id))
          const onChangeTaskStatusHandler = ( e:ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(todolistId, el.id, e.currentTarget.checked))
          }
          const updateTaskHandler = (newTitle: string) => {
            dispatch(updateTaskAC(todolistId, el.id, newTitle))
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
