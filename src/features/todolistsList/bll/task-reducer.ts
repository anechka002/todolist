import {
  RequestStatusType,
  SetAppErrorActionType,
  setAppStatusAC,
  SetAppStatusActionType,
} from "../../../app/bll/app-reducer"
import { ResultCode, TaskPriorities, TaskStatuses } from "../lib/enum/enums"
import { AppRootStateType, AppThunkType } from "../../../app/store"
import { AddTodoListsActionType, ClearDataActionType, RemoveTodoListsActionType, SetTodoListsActionType } from "./todolist-reducer"
import { tasksAPI } from "../api/tasks-api"
import { TaskType, UpdateTaskModelType } from "../api/tasks-api.types"
import { handleServerAppError, handleServerNetworkError } from "common/utils"

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: TasksActionsType): TasksStateType => {
  switch (action.type) {
    case "TASKS/REMOVE-TASK":
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].filter((el) => el.id !== action.payload.taskId),
      }

    case "TASKS/ADD-TASK":    
      const newTask: TaskDomainType = {
        ...action.task,
        entityStatus: "idle",
      }
      return {
        ...state,
        [action.task.todoListId]: [newTask, ...state[action.task.todoListId]],
      }

    case "TASKS/UPDATE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map((el) =>
          el.id === action.id ? { ...el, ...action.model } : el
        ),
      }

    case "TODOLISTS/ADD-TODOLIST":
      return {
        ...state,
        [action.todoList.id]: [],
      }

    case "TODOLISTS/REMOVE-TODOLIST":
      let copyState = { ...state }
      delete copyState[action.id]
      return copyState

    case "TODOLISTS/SET-TODOLISTS": {
      debugger
      return action.todos.reduce((acc, val) => {
        acc[val.id] = []
        return acc
      }, state)
    }

    case "TASKS/SET-TASKS": {
      debugger
      return {
        ...state,
        [action.todoListId]: action.tasks.map((el) => ({
          ...el,
          entityStatus: "idle",
        })),
      }
    }

    case "TASKS/CHANGE-TASK-ENTITY-STATUS": {
      return {
        ...state,
        [action.payload.todoListId]: state[action.payload.todoListId].map((el) =>
          el.id === action.payload.taskId ? { ...el, entityStatus: action.payload.entityStatus } : el
        ),
      }
    }

    case "CLEAR-DATA": {
      return {}
    }

    default:
      return state
  }
}

// actions
export const removeTaskAC = (payload: {todoListId: string, taskId: string}) => {
  return { type: "TASKS/REMOVE-TASK", payload } as const
}
export const addTaskAC = (task: TaskType) => {
  return { type: "TASKS/ADD-TASK", task } as const
}
export const updateTaskAC = (todoListId: string, id: string, model: UpdateDomainTaskModelType) => {
  return { type: "TASKS/UPDATE-TASK", todoListId, id, model } as const
}
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
  return { type: "TASKS/SET-TASKS", todoListId, tasks } as const
}
export const changeTaskEntityStatusAC = (payload: {todoListId: string, taskId: string, entityStatus: RequestStatusType}) => {
  return {
    type: "TASKS/CHANGE-TASK-ENTITY-STATUS",
    payload
  } as const
}

// thunks
export const getTasksTC = (todoListId: string): AppThunkType => (dispatch) => {

  dispatch(setAppStatusAC("loading"))

  tasksAPI.getTasks(todoListId)
    .then((res) => {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setTasksAC(todoListId, res.data.items))
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const addTaskTC = (arg: {todoListId: string, title: string}): AppThunkType => (dispatch) => {

  dispatch(setAppStatusAC("loading"))

  tasksAPI.createTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(addTaskAC(res.data.data.item))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
}

export const removeTaskTC = (arg: {todoListId: string, taskId: string}): AppThunkType => (dispatch) => {

  dispatch(setAppStatusAC("loading"))  
  dispatch(changeTaskEntityStatusAC({todoListId: arg.todoListId, taskId: arg.taskId, entityStatus: "loading"}))
  
  tasksAPI.deleteTask(arg)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(setAppStatusAC("succeeded"))
        dispatch(removeTaskAC(arg))
      } else {
        handleServerAppError(res.data, dispatch)
      }
    })
    .catch((err) => {
      handleServerNetworkError(err, dispatch)
    })
    .finally(() => {
      dispatch(changeTaskEntityStatusAC({todoListId: arg.todoListId, taskId: arg.taskId, entityStatus: "idle"}))
    })
}

export const updateTaskTC =
  (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType): AppThunkType =>
  (dispatch, getState: () => AppRootStateType) => {
    const state = getState()
    const task = state.tasks[todoListId].find((task) => task.id === id)
    if (!task) {
      console.warn("task not found in the state")
      return
    }
    const apiModel: UpdateTaskModelType = {
      status: task.status,
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      ...domainModel,
    }

    dispatch(setAppStatusAC("loading"))
    dispatch(changeTaskEntityStatusAC({ todoListId, taskId: id, entityStatus: "loading" }))

    tasksAPI.updateTask(todoListId, id, apiModel)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          dispatch(updateTaskAC(todoListId, id, domainModel))
          dispatch(setAppStatusAC("succeeded"))
          dispatch(changeTaskEntityStatusAC({ todoListId, taskId: id, entityStatus: "idle" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((err) => {
        handleServerNetworkError(err, dispatch)
      })
      .finally(() => {
        dispatch(changeTaskEntityStatusAC({todoListId, taskId: id, entityStatus: "idle"}))
      })
  }

// types
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type TaskDomainType = TaskType & {
  entityStatus?: RequestStatusType
}

export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodoListsActionType
  | RemoveTodoListsActionType
  | SetTodoListsActionType
  | SetAppStatusActionType
  | SetAppErrorActionType
  | ReturnType<typeof changeTaskEntityStatusAC>
  | ClearDataActionType

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
