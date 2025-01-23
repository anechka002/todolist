import IconButton from "@mui/material/IconButton"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components/span/EditableSpan"
import { todoListsAPI, useDeleteTodoListMutation, useUpdateTodoListMutation } from "features/todolistsList/api/todolists-api"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { RequestStatusType } from "app/bll/appSlice"
import { TodoListDomainType } from "features/todolistsList/lib/types/types"

type Props = {
  todolist: TodoListDomainType
}

export const TodoListTitle = ({ todolist }: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist

  const [deleteTodoList] = useDeleteTodoListMutation()
  const [updateTodoList] = useUpdateTodoListMutation()

  const dispatch = useAppDispatch()

  const updateQueryData = (status: RequestStatusType) => {
    dispatch(
      todoListsAPI.util.updateQueryData('getTodoLists', undefined, state => {
      const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.entityStatus = status
        }
    }))
  }

  const removeTodoListHandler = () => {
    updateQueryData('loading')
    deleteTodoList(id)
    .unwrap()
    .catch(() => {
      updateQueryData('failed')
    })
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
