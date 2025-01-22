import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import { TodoList } from "./ui/todolist/TodoList"
import { useGetTodoListsQuery } from "./api/todolists-api"
import { TodolistSkeleton } from "./ui/skeletons/TodolistSkeleton/TodolistSkeleton"

export const TodolistsList: React.FC = () => {

  const { data: todolists, isLoading } = useGetTodoListsQuery()

  if(isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '32px' }}>
        {Array(3)
          .fill(null)
          .map((_, id) => (
            <TodolistSkeleton key={id} />
          ))}
      </div>
    )
  }

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
