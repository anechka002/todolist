import { RequestStatusType } from "app/bll/appSlice"
import { TaskType } from "features/todolistsList/api/tasks-api.types"
import { TodoListType } from "features/todolistsList/api/todolists-api.types"

export type FilterValues = "all" | "active" | "completed"

export type TodoListDomainType = TodoListType & {
  filter: FilterValues
  entityStatus: RequestStatusType
}

export type TasksStateType = {
  [key: string]: Array<TaskDomainType>
}

export type TaskDomainType = TaskType & {
  entityStatus?: RequestStatusType
}