import { Checkbox, IconButton } from '@mui/material'
import React, { ChangeEvent, memo } from 'react'
import { useDispatch } from 'react-redux'
import { changeTaskStatusAC, removeTaskAC, updateTaskAC } from '../../model/task-reducer'
import { EditableSpan } from '../span/EditableSpan'
import { Delete } from '@mui/icons-material'
import { useSelector } from 'react-redux'
import { RootReducerType } from '../../model/state/store'
import { TaskStatuses, TaskType } from '../../api/todolists-api'

type Props = {
  todolistId: string
  taskId: string
}

export const Task = memo(({todolistId, taskId}: Props) => {
  const task = useSelector<RootReducerType, TaskType>(state => state.tasks[todolistId].find(el => el.id === taskId) as TaskType)
  const dispatch = useDispatch()

  const onClickHandler = () => dispatch(removeTaskAC(todolistId, task.id))
  const onChangeTaskStatusHandler = ( e:ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    dispatch(changeTaskStatusAC(todolistId, task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New))
  }
  const updateTaskHandler = (newTitle: string) => {
    dispatch(updateTaskAC(todolistId, task.id, newTitle))
  }

  return (
    <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
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
