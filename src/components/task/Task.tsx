import { Checkbox, IconButton } from '@mui/material'
import React, { ChangeEvent, memo } from 'react'
import { TaskType } from '../../type/type'
import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, removeTaskAC, updateTaskAC } from '../../model/task-reducer'
import { EditableSpan } from '../span/EditableSpan'
import { Delete } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../model/state/store'

type Props = {
  todolistId: string
  taskId: string
}

export const Task = memo(({todolistId, taskId}: Props) => {
  const task = useSelector<RootReducerType, TaskType>(state => state.tasks[todolistId].find(el => el.id === taskId) as TaskType)
  const dispatch = useDispatch()

  const onClickHandler = () => dispatch(removeTaskAC(todolistId, task.id))
  const onChangeTaskStatusHandler = ( e:ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked))
  }
  const updateTaskHandler = (newTitle: string) => {
    dispatch(updateTaskAC(todolistId, task.id, newTitle))
  }

  return (
    <div className={task.isDone ? 'is-done' : ''}>
      <Checkbox
        checked={task.isDone}
        onChange={onChangeTaskStatusHandler}
        color='primary'
      />
      <EditableSpan oldTitle={task.title} updateItem={updateTaskHandler}/>
      <IconButton onClick={onClickHandler}>
        <Delete/>
      </IconButton>
    </div>
  )
})
