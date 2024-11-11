import React, { useCallback } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { TodolistsList } from '../features/todolistsList/TodolistsList'
import { addTodoListTC } from '../features/todolistsList/bll/todolist-reducer'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { AddItemForm } from 'common/components/itemForm/AddItemForm'

export const Main = () => {

  const dispatch = useAppDispatch();

  const addTodoList = useCallback(
    (title: string) => {
      const thunk = addTodoListTC(title);
      dispatch(thunk);
    },
    [dispatch]
  );

  return (
    <Container fixed>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>

      <TodolistsList />

    </Container>
  )
}
