import { TodoListDomainType } from "../../bll/todolistsSlice"
import { TodoListTitle } from "./todoListTitle/TodoListTitle"
import { FilterTasksButton } from "./filterTasksButton/FilterTasksButton"
import { Tasks } from "./tasks/Tasks"
import { AddItemForm } from "common/components/itemForm/AddItemForm"
import { useCreateTaskMutation } from "features/todolistsList/api/tasks-api"

type Props = {
  todolist: TodoListDomainType
}

export const TodoList = ({ todolist }: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist

  const [addTask, {isLoading, isError}] = useCreateTaskMutation()
  // console.log(isLoading, isError)

  const addTaskHandler = (newTitle: string) => {
    addTask({ todoListId: id, title: newTitle })
  }

  return (
    <div>
      <TodoListTitle todolist={todolist} />
      <AddItemForm addItem={addTaskHandler} disabled={entityStatus === "loading"} />
      <Tasks todolist={todolist} disabled={entityStatus === "loading"} />
      <FilterTasksButton todolist={todolist} />
    </div>
  )
}
