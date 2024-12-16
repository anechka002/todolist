import React, { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { removeTaskTC, TaskDomainType, UpdateDomainTaskModelType, updateTaskTC } from "../../../../bll/tasksSlice"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { TaskStatuses } from "features/todolistsList/lib/enum"
import { EditableSpan } from "common/components/span/EditableSpan"

type Props = {
  todolistId: string
  task: TaskDomainType
  disabled?: boolean
}

export const Task = ({ todolistId, task, disabled }: Props) => {
  // const task = useSelector<AppRootStateType, TaskDomainType>(
  //   (state) =>
  //     state.tasks[todolistId].find((el) => el.id === taskId) as TaskDomainType
  // );
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(removeTaskTC({ todoListId: todolistId, taskId: task.id }))
  }

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked
    dispatch(
      updateTaskTC(todolistId, task.id, {
        status: newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New,
      })
    )
  }

  const updateTaskHandler = (domainModel: UpdateDomainTaskModelType) => {
    const oldTitle = task.title
    let title

    if (domainModel.title) {
      title = domainModel.title.length > 100 || domainModel.title.length < 1 ? oldTitle : domainModel.title
    }

    dispatch(updateTaskTC(todolistId, task.id, { title }))
  }

  return (
    <div className={task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        onChange={onChangeTaskStatusHandler}
        color="primary"
        disabled={disabled || task.entityStatus === "loading"}
      />
      <EditableSpan
        oldTitle={task.title}
        updateItem={updateTaskHandler}
        disabled={disabled || task.entityStatus === "loading"}
      />
      <IconButton onClick={onClickHandler} disabled={disabled || task.entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </div>
  )
}
