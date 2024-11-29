import { List } from "@mui/material"
import { Task } from "./task/Task"
import { TodoListDomainType } from "../../../bll/todolist-reducer"
import { useAppSelector } from "common/hooks/useAppSelector"
import { selectTasks } from "app/appSelectors"
import { TaskStatuses } from "features/todolistsList/lib/enum"

type Props = {
  todolist: TodoListDomainType
  disabled?: boolean
}

export const Tasks = ({ todolist, disabled }: Props) => {
  // const { id, title, filter, addedDate, order, entityStatus } = todolist;

  let tasks = useAppSelector(selectTasks)
  // let tasks = useAppSelector((state) => state.tasks[id]);

  const allTodolistTasks = tasks[todolist.id]

  let tasksForTodolist = allTodolistTasks

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((el) => el.status === TaskStatuses.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((el) => el.status === TaskStatuses.Completed)
  }

  return (
    <div>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map((el) => (
            <Task key={el.id} task={el} todolistId={todolist.id} disabled={disabled}/>
          ))}
        </List>
      )}
    </div>
  )
}
