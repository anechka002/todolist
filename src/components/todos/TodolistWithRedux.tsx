import React, { memo, useCallback, useMemo } from 'react'
import { EditableSpan } from '../span/EditableSpan'
import { AddItemForm } from '../itemForm/AddItemForm'
import { IconButton } from '@mui/material'
import { Delete } from '@mui/icons-material'
import { AppRootStateType } from '../../model/state/store'
import { useSelector } from 'react-redux'
import { addTaskAC } from '../../model/task-reducer'
import { changeTodoListFilterAC, removeTodoListAC, TodoListDomainType, updateTodoListAC } from '../../model/todolist-reducer'
import { ButtonWithMemo } from '../button/ButtonWithMemo'
import { Task } from '../task/Task'
import { TaskStatuses, TaskType } from '../../api/todolists-api'
import { useAppDispatch } from '../../hooks/hooks'

type Props = {
  todolist: TodoListDomainType
}

export const TodoListWithRedux = memo(({todolist}: Props) =>  {

  const {id, title, filter, addedDate, order} = todolist

  let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
  const dispatch = useAppDispatch()

  const addTaskHandler = useCallback((newTitle: string) => {
    dispatch(addTaskAC(id, newTitle))
  }, [dispatch])

  const removeTodoListHandler = () => {
    dispatch(removeTodoListAC(id))
  }

  const updateTodoListHandler = (newTitle: string) => {
    dispatch(updateTodoListAC(id, newTitle))
  }

  const onAllClickHandler = useCallback(() => {dispatch(changeTodoListFilterAC(id, 'all'))}, [dispatch]);
  const onActiveClickHandler = useCallback(() => {dispatch(changeTodoListFilterAC(id, 'active'))}, [dispatch]);
  const onCompletedClickHandler = useCallback(() => {dispatch(changeTodoListFilterAC(id, 'completed'))}, [dispatch]);

  tasks = useMemo( () => {

    if(filter === 'active') {
      tasks = tasks.filter(el => el.status === TaskStatuses.New)
    }
    if(filter === 'completed') {
      tasks = tasks.filter(el => el.status === TaskStatuses.Completed)
    }

    return tasks

  }, [tasks, filter])

  
  return (
    <div>
      <h3><EditableSpan oldTitle={title} updateItem={updateTodoListHandler}/>
        <IconButton onClick={removeTodoListHandler}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler}/>
      <div>
        {
        tasks.map(el => <Task key={el.id} taskId={el.id} todolistId={id}/>
        )}
      </div>      
      <div>
        <ButtonWithMemo variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
        >All
        </ButtonWithMemo>
        <ButtonWithMemo variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}
        >Active
        </ButtonWithMemo>
        <ButtonWithMemo variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}
        >Completed
        </ButtonWithMemo>
      </div>
    </div>
  )
})
