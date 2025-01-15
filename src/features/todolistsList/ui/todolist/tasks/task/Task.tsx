import React, { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { TaskDomainType } from "../../../../bll/tasksSlice"
import { TaskStatuses } from "features/todolistsList/lib/enum"
import { EditableSpan } from "common/components/span/EditableSpan"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "features/todolistsList/api/tasks-api"
import { createTaskModel } from "common/utils/createTaskModel"

type Props = {
  todolistId: string
  task: TaskDomainType
  disabled?: boolean
}

export const Task = ({ todolistId, task, disabled }: Props) => {

  const [removeTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  const onClickHandler = () => {
    removeTask({ todoListId: todolistId, taskId: task.id })
  }

  const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
    const model = createTaskModel(task,  {status})
    updateTask({todoListId: todolistId, taskId: task.id, model})
  }

  const updateTaskHandler = (title: string) => {
    const model = createTaskModel(task,  {title})
    updateTask({todoListId: todolistId, taskId: task.id, model})
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
