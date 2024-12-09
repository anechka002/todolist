import { todoListsAPI } from "../api/todolists-api"
import {
  RequestStatusType,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "../../../app/bll/app-reducer"
import { ResultCode } from "../lib/enum/enums"
import { TodoListType } from "../api/todolists-api.types"
import { AppThunkType } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { getTasksTC } from "./task-reducer"

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: TodolistsActionsType): Array<TodoListDomainType> => {
  switch (action.type) {
    case "TODOLISTS/REMOVE-TODOLIST":
      return state.filter((el) => el.id !== action.id)

    case "TODOLISTS/ADD-TODOLIST":
      
      const newTodoList: TodoListDomainType = {
        ...action.todoList,
        filter: "all",
        entityStatus: "idle",
      }
      return [newTodoList, ...state]

    case "TODOLISTS/UPDATE-TODOLIST":
      return state.map((el) => (el.id === action.todolistId ? { ...el, title: action.title } : el))

    case "TODOLISTS/CHANGE-TODOLIST-FILTER":
      const newTodolist = state.map((el) => (el.id === action.todolistId ? { ...el, filter: action.filter } : el))
      return newTodolist

    case "TODOLISTS/SET-TODOLISTS": {
      return action.todos.map((el) => ({
        ...el,
        filter: "all",
        entityStatus: "idle",
      }))
    }

    case "TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) => (tl.id === action.id ? { ...tl, entityStatus: action.entityStatus } : tl))
    }

    case "CLEAR-DATA": {
      return []
    }

    default:
      return state
  }
}

// actions
export const removeTodoListAC = (todolistId: string) => {
  return { type: "TODOLISTS/REMOVE-TODOLIST", id: todolistId } as const
}

export const addTodoListAC = (todoList: TodoListType) => {
  return { type: "TODOLISTS/ADD-TODOLIST", todoList } as const
}

export const updateTodoListAC = (todolistId: string, title: string) => {
  return { type: "TODOLISTS/UPDATE-TODOLIST", todolistId, title } as const
}

export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return {
    type: "TODOLISTS/CHANGE-TODOLIST-FILTER",
    todolistId,
    filter,
  } as const
}

export const setTodoListsAC = (todos: TodoListType[]) => {
  return { type: "TODOLISTS/SET-TODOLISTS", todos } as const
}

export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
  return {
    type: "TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS",
    id,
    entityStatus,
  } as const
}
export const clearDataAC = () => {
  return { type: "CLEAR-DATA"} as const
}

// thunks
export const getTodosTC = (): AppThunkType => (dispatch) => {

  dispatch(setAppStatusAC("loading"))
  todoListsAPI.getTodoLists()
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setTodoListsAC(res.data))
      return res.data
    })
    .then((todos) => {
      todos.forEach((tl) => dispatch(getTasksTC(tl.id)))     
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const removeTodoListTC = (todolistId: string): AppThunkType => (dispatch) => {

  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodoListEntityStatusAC(todolistId, "loading"))

  todoListsAPI.deleteTodoList(todolistId)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(removeTodoListAC(todolistId))
        dispatch(setAppStatusAC("succeeded"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(changeTodoListEntityStatusAC(todolistId, "idle"))
    })
}

export const addTodoListTC = (title: string): AppThunkType => (dispatch) => {

  dispatch(setAppStatusAC("loading"))

  todoListsAPI.createTodoLists(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(addTodoListAC(res.data.data.item))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const updateTodoListTC = (todolistId: string, title: string): AppThunkType => (dispatch) => {

  dispatch(setAppStatusAC("loading"))
  dispatch(changeTodoListEntityStatusAC(todolistId, "loading"))

  todoListsAPI.updateTodoList(todolistId, title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(updateTodoListAC(todolistId, title))
        dispatch(changeTodoListEntityStatusAC(todolistId, "idle"))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(changeTodoListEntityStatusAC(todolistId, "idle"))
    })
}

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}

export type RemoveTodoListsActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListsActionType = ReturnType<typeof addTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>
export type ClearDataActionType = ReturnType<typeof clearDataAC>

export type TodolistsActionsType =
  | ReturnType<typeof updateTodoListAC>
  | ReturnType<typeof changeTodoListFilterAC>
  | RemoveTodoListsActionType
  | AddTodoListsActionType
  | SetTodoListsActionType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ReturnType<typeof changeTodoListEntityStatusAC>
  | ClearDataActionType
