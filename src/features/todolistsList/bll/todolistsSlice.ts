import { _todoListsAPI } from "../api/todolists-api"
import { RequestStatusType, setAppStatus } from "../../../app/bll/appSlice"
import { ResultCode } from "../lib/enum/enums"
import { TodoListType } from "../api/todolists-api.types"
import { AppThunkType } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "common/utils"
import { createSlice } from "@reduxjs/toolkit"
import { getTasksTC } from "./tasksSlice"

const initialState: Array<TodoListDomainType> = []

export const todolistsSlice = createSlice({
  name: "todolists",
  initialState,
  reducers: (create) => {
    return {
      setTodoLists: create.reducer<{ todos: TodoListType[] }>((state, action) => {
        action.payload.todos.forEach((el) => {
          state.push({ ...el, filter: "all", entityStatus: "idle" })
        })
      }),
      removeTodoList: create.reducer<{ todolistId: string }>((state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId)
        if (index !== -1) {
          state.splice(index, 1)
        }
      }),
      addTodoList: create.reducer<{ todoList: TodoListType }>((state, action) => {
        const newTodoList: TodoListDomainType = {
          ...action.payload.todoList,
          filter: "all",
          entityStatus: "idle",
        }
        state.unshift(newTodoList)
      }),
      updateTodoList: create.reducer<{ todolistId: string; title: string }>((state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.todolistId)
        if (todolist) {
          todolist.title = action.payload.title
        }
      }),
      changeTodoListFilter: create.reducer<{ todolistId: string; filter: FilterValuesType }>((state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.todolistId)
        if (todolist) {
          todolist.filter = action.payload.filter
        }
      }),
      changeTodoListEntityStatus: create.reducer<{ id: string; entityStatus: RequestStatusType }>((state, action) => {
        const todolist = state.find((tl) => tl.id === action.payload.id)
        if (todolist) {
          todolist.entityStatus = action.payload.entityStatus
        }
      }),
      clearData: create.reducer<undefined>((state, action) => {
        return []
      }),
    }
  },
  selectors: {
    selectTodolists: state => state
  }
})

export const {
  setTodoLists,
  removeTodoList,
  addTodoList,
  updateTodoList,
  changeTodoListFilter,
  changeTodoListEntityStatus,
  clearData,
} = todolistsSlice.actions

export const todoListsReducer = todolistsSlice.reducer
export const {selectTodolists} = todolistsSlice.selectors

// thunks
export const getTodosTC = (): AppThunkType => (dispatch) => {
  dispatch(setAppStatus({ status: "loading" }))
  _todoListsAPI
    .getTodoLists()
    .then((res) => {
      dispatch(setAppStatus({ status: "succeeded" }))
      dispatch(setTodoLists({ todos: res.data }))
      return res.data
    })
    .then((todos) => {
      todos.forEach((tl) => dispatch(getTasksTC(tl.id)))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const removeTodoListTC =
  (todolistId: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodoListEntityStatus({ id: todolistId, entityStatus: "loading" }))

    _todoListsAPI
      .deleteTodoList(todolistId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(removeTodoList({ todolistId }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
      .finally(() => {
        dispatch(changeTodoListEntityStatus({ id: todolistId, entityStatus: "idle" }))
      })
  }

export const addTodoListTC =
  (title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))

    _todoListsAPI
      .createTodoLists(title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }))
          dispatch(addTodoList({ todoList: res.data.data.item }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
  }

export const updateTodoListTC =
  (todolistId: string, title: string): AppThunkType =>
  (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodoListEntityStatus({ id: todolistId, entityStatus: "loading" }))

    _todoListsAPI
      .updateTodoList(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(setAppStatus({ status: "succeeded" }))
          dispatch(updateTodoList({ todolistId, title }))
          dispatch(changeTodoListEntityStatus({ id: todolistId, entityStatus: "idle" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
      .finally(() => {
        dispatch(changeTodoListEntityStatus({ id: todolistId, entityStatus: "idle" }))
      })
  }

// types
export type FilterValuesType = "all" | "active" | "completed"
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}
