import React, { ChangeEvent, memo, useCallback, useMemo } from 'react'
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
import { ButtonWithMemo } from '../button/ButtonWithMemo'
import { Task } from '../task/Task'


type Props = {
  todolist: TodolistsType
}

export const TodoListWithRedux = memo(({todolist}: Props) =>  {
  // console.log('TodoListWithRedux')

  const {id, title, filter} = todolist

  let tasks = useSelector<RootReducerType, Array<TaskType>>(state => state.tasks[id])
  const dispatch = useDispatch()

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
    // console.log('useMemo')

    if(filter === 'active') {
      tasks = tasks.filter(el => el.isDone === false)
    }
    if(filter === 'completed') {
      tasks = tasks.filter(el => el.isDone === true)
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
