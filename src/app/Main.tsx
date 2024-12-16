import React, { useCallback, useEffect } from "react"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { TodolistsList } from "../features/todolistsList/TodolistsList"
import { addTodoListTC } from "../features/todolistsList/bll/todolistsSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { AddItemForm } from "common/components/itemForm/AddItemForm"
import { useNavigate } from "react-router"
import { useAppSelector } from "common/hooks"
import { Path } from "common/routing/Routing"

export const Main = () => {
  const dispatch = useAppDispatch()

  // const navigate = useNavigate()
  // const isLoggedIn = useAppSelector(selectIsLoggedIn)
  // useEffect(() => {
  //   // debugger
  //   if(!isLoggedIn) {
  //     navigate(Path.Login)
  //   }
  // }, [isLoggedIn])

  const addTodoList = useCallback(
    (title: string) => {
      const thunk = addTodoListTC(title)
      dispatch(thunk)
    },
    [dispatch]
  )

  return (
    <Container fixed>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>

      <TodolistsList />
    </Container>
  )
}
