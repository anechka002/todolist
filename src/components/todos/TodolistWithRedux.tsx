import React, { ChangeEvent } from 'react'
import { EditableSpan } from '../span/EditableSpan'
import { AddItemForm } from '../itemForm/AddItemForm'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import {Button, Checkbox} from "@mui/material";
import { useDispatch } from 'react-redux'
import { RootReducerType } from '../../model/state/store'
import { useSelector } from 'react-redux'
import { addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC } from '../../model/task-reducer'
import { TaskType, TodolistsType } from '../../type/type'
import { changeTodoListFilterAC, removeTodoListAC, updateTodoListAC } from '../../model/todolist-reducer'

type Props = {
  todolist: TodolistsType
}

export function TodoListWithRedux({todolist}: Props) {

  const {id, title, filter} = todolist

  let tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[id])
  const dispatch = useDispatch()
  // console.log(tasks)

  if(filter === 'active') {
    tasks = tasks.filter(el => el.isDone === false)
  }
  if(filter === 'completed') {
    tasks = tasks.filter(el => el.isDone === true)
  }

  const addTaskHandler = (newTitle: string) => {
    dispatch(addTaskAC(id, newTitle))
  }

  const removeTodoListHandler = () => {
    dispatch(removeTodoListAC(id))
  }

  const updateTodoListHandler = (newTitle: string) => {
    dispatch(updateTodoListAC(id, newTitle))
  }

  const onAllClickHandler = () => dispatch(changeTodoListFilterAC(id, 'all'));
  const onActiveClickHandler = () => dispatch(changeTodoListFilterAC(id, 'active'));
  const onCompletedClickHandler = () => dispatch(changeTodoListFilterAC(id, 'completed'));
  
  return (
    <div>
      <h3><EditableSpan oldTitle={title} updateItem={updateTodoListHandler}/>
        <IconButton onClick={removeTodoListHandler}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler}/>
      <div>
        {tasks.map(el => {
          const onClickHandler = () => dispatch(removeTaskAC(id, el.id))
          const onChangeTaskStatusHandler = ( e:ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(id, el.id, e.currentTarget.checked))
          }
          const updateTaskHandler = (newTitle: string) => {
            dispatch(updateTaskAC(id, el.id, newTitle))
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
