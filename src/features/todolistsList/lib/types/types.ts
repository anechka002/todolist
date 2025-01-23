import { RequestStatusType } from "app/bll/appSlice"
import { TodoListType } from "features/todolistsList/api/todolists-api.types"

export type FilterValues = "all" | "active" | "completed"

export type TodoListDomainType = TodoListType & {
  filter: FilterValues
  entityStatus: RequestStatusType
}