import { TaskType, UpdateTaskModelType } from "features/todolistsList/api/tasks-api.types"

export const createTaskModel = (task: TaskType, domainModal: Partial<UpdateTaskModelType>): UpdateTaskModelType => {
  return {
    status: task.status,
    title: task.title,
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    ...domainModal,
  }
}