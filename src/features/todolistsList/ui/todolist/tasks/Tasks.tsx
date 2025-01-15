import { List } from "@mui/material"
import { Task } from "./task/Task"
import { TodoListDomainType } from "../../../bll/todolistsSlice"
import { TaskStatuses } from "features/todolistsList/lib/enum"
import { useGetTasksQuery } from "features/todolistsList/api/tasks-api"

type Props = {
  todolist: TodoListDomainType
  disabled?: boolean
}

export const Tasks = ({ todolist, disabled }: Props) => {
  // const { id, title, filter, addedDate, order, entityStatus } = todolist;

  const {data} = useGetTasksQuery(todolist.id)

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((el) => el.status === TaskStatuses.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((el) => el.status === TaskStatuses.Completed)
  }

  return (
    <div>
      {tasksForTodolist?.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist?.map((el) => (
            <Task key={el.id} task={el} todolistId={todolist.id} disabled={disabled} />
          ))}
        </List>
      )}
    </div>
  )
}
