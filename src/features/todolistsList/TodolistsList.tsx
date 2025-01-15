import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodoList } from "./ui/todolist/TodoList"
import { useGetTodoListsQuery } from "./api/todolists-api"

export const TodolistsList: React.FC = () => {

  const { data: todolists } = useGetTodoListsQuery()

  return (
    <>
      <Grid container spacing={3}>
        {todolists?.map((el) => {
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
