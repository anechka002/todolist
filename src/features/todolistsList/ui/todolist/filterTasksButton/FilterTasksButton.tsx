import { useCallback } from "react"
import { Box, Button } from "@mui/material"
import { filterButtonsContainerSx } from "./FilterTasksButton.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { ButtonWithMemo } from "common/components"
import { FilterValuesType, TodoListDomainType } from "features/todolistsList/bll/todolistsSlice"
import { todoListsAPI } from "features/todolistsList/api/todolists-api"

type Props = {
  todolist: TodoListDomainType
}

export const FilterTasksButton = ({ todolist }: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    dispatch(
      todoListsAPI.util.updateQueryData('getTodoLists', undefined, (state) => {
        const todolist = state.find((tl) => tl.id === id)
        if (todolist) {
          todolist.filter = filter
        }
      })
    )
  }

// можно так передавать данные
  const onCompletedClickHandler = () => {
    changeFilterTasksHandler("completed")
  }

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={() => changeFilterTasksHandler('all')}
        color={"inherit"}
        disabled={entityStatus === "loading"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={() => changeFilterTasksHandler('active')}
        color={"primary"}
        disabled={entityStatus === "loading"}
      >
        Active
      </Button>
      <ButtonWithMemo
        variant={filter === "completed" ? "outlined" : "text"}
        onClick={onCompletedClickHandler}
        color={"secondary"}
        disabled={entityStatus === "loading"}
      >
        Completed
      </ButtonWithMemo>
    </Box>
  )
}
