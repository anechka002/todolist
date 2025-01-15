import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import { TodoListDomainType } from "../../../bll/todolistsSlice"
import { EditableSpan } from "common/components/span/EditableSpan"
import { useDeleteTodoListMutation, useUpdateTodoListMutation } from "features/todolistsList/api/todolists-api"

type Props = {
  todolist: TodoListDomainType
}

export const TodoListTitle = ({ todolist }: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist

  const [deleteTodoList] = useDeleteTodoListMutation()
  const [updateTodoList] = useUpdateTodoListMutation()

  const removeTodoListHandler = () => {
    deleteTodoList(id)
  }

  const updateTodoListHandler = (title: string) => {
    if (title) {
      updateTodoList({todoListId: id, title: title})
    }
  }

  return (
    <div>
      <h3>
        <EditableSpan oldTitle={title} updateItem={updateTodoListHandler} disabled={entityStatus === "loading"} />
        <IconButton onClick={removeTodoListHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
    </div>
  )
}
