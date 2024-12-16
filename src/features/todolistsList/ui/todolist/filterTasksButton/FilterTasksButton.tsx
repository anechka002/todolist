import { useCallback } from "react"
import { Box, Button } from "@mui/material"
import { filterButtonsContainerSx } from "./FilterTasksButton.styles"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { ButtonWithMemo } from "common/components"
import { changeTodoListFilter, TodoListDomainType } from "features/todolistsList/bll/todolistsSlice"

type Props = {
  todolist: TodoListDomainType
}

export const FilterTasksButton = ({ todolist }: Props) => {
  const { id, title, filter, addedDate, order, entityStatus } = todolist

  const dispatch = useAppDispatch()

  const onAllClickHandler = useCallback(() => {
    dispatch(changeTodoListFilter({todolistId: id, filter: "all"}))
  }, [dispatch])
  const onActiveClickHandler = useCallback(() => {
    dispatch(changeTodoListFilter({todolistId: id, filter: "active"}))
  }, [dispatch])
  const onCompletedClickHandler = useCallback(() => {
    dispatch(changeTodoListFilter({todolistId: id, filter: "completed"}))
  }, [dispatch])

  return (
    <Box sx={filterButtonsContainerSx}>
      <Button
        variant={filter === "all" ? "outlined" : "text"}
        onClick={onAllClickHandler}
        color={"inherit"}
        disabled={entityStatus === "loading"}
      >
        All
      </Button>
      <Button
        variant={filter === "active" ? "outlined" : "text"}
        onClick={onActiveClickHandler}
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
