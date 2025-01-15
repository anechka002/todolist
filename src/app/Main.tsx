import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import { TodolistsList } from "../features/todolistsList/TodolistsList"
import { AddItemForm } from "common/components/itemForm/AddItemForm"
import { useCreateTodolistMutation } from "features/todolistsList/api/todolists-api"

export const Main = () => {

  const [createTodoList] = useCreateTodolistMutation()

  const addTodoList = (title: string) => {
    createTodoList(title)
  }

  return (
    <Container fixed>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>

      <TodolistsList />
    </Container>
  )
}
