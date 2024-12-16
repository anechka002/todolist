import { useEffect } from "react"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { getTodosTC, selectTodolists } from "./bll/todolistsSlice"
import { TodoList } from "./ui/todolist/TodoList"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector(selectTodolists)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTodosTC())
  }, [])

  return (
    <>
      <Grid container spacing={3}>
        {todolists.map((el) => {
          return (
            <Grid key={el.id} item>
              <Paper style={{ padding: "10px" }}>
                <TodoList todolist={el} />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
