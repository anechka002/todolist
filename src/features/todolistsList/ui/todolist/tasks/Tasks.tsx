import { List } from "@mui/material"
import { Task } from "./task/Task"
import { TaskStatuses } from "features/todolistsList/lib/enum"
import { useGetTasksQuery } from "features/todolistsList/api/tasks-api"
import { TasksSkeleton } from "../../skeletons/TasksSkeleton/TasksSkeleton"
import { useAppDispatch } from "common/hooks"
import { setAppError } from "app/bll/appSlice"
import { useEffect } from "react"
import { TodoListDomainType } from "features/todolistsList/lib/types/types"

type Props = {
  todolist: TodoListDomainType
  disabled?: boolean
}

export const Tasks = ({ todolist, disabled }: Props) => {
  // const { id, title, filter, addedDate, order, entityStatus } = todolist;

  const {data, isLoading, isError, error} = useGetTasksQuery(todolist.id)

  const dispatch = useAppDispatch()

  // console.log({isError, error})

  //! такой способ обработки ошибок придется писать во всех компонентах, но мы напишем один для всех в baseApi
  // useEffect(() => {
  //   if(error) {
  //     if('data' in error) {
  //       const dataError = error.data as {message: string}
  //       dispatch(setAppError({error: dataError.message}))
  //     }
  //   }
  // }, [error])

  let tasksForTodolist = data?.items

  if (todolist.filter === "active") {
    tasksForTodolist = tasksForTodolist?.filter((el) => el.status === TaskStatuses.New)
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasksForTodolist?.filter((el) => el.status === TaskStatuses.Completed)
  }

  if(isLoading) {
    return <TasksSkeleton/>
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
