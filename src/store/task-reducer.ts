import { AddTodoListsActionType, RemoveTodoListsActionType, SetTodoListsActionType } from "./todolist-reducer";
import { TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./state/store";
import { setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../components/app/app-reducer";
import { ResultCode } from "../common/enums";

const initialState: TasksStateType = {}

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK':
      return {
        ...state, 
        [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.id)}
      
    case 'ADD-TASK':
      return {
        ...state,
        [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]
      }

    case 'UPDATE-TASK':
      return {...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.id ? {...el, ...action.model} : el)}

    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todoList.id]: []
      }

    case 'REMOVE-TODOLIST':
      let copyState = {...state}
      delete copyState[action.id]
      return copyState

    case 'SET-TODOLISTS': {
      return action.todos.reduce((acc, val) => {
        acc[val.id] = [];
        return acc
      }, state)
    }

    case 'SET-TASKS': {
      return {
        ...state,
        [action.todoListId]: action.tasks
      }
    }

    default: return state
  }
}

// actions
export const removeTaskAC = (todoListId: string, id: string) => {
  return {type: 'REMOVE-TASK', todoListId, id} as const
}
export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}
export const updateTaskAC = (todoListId: string, id: string, model: UpdateDomainTaskModelType) => {
  return {type: 'UPDATE-TASK', todoListId, id, model} as const
}
export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
  return {type: 'SET-TASKS', todoListId, tasks} as const
}

// thunks
export const getTasksTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.getTasks(todoListId)
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setTasksAC(todoListId, res.data.items))
    })
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.createTask(todoListId, title)
    .then((res) => {
      if(res.data.resultCode === ResultCode.Success) {
        dispatch(addTaskAC(res.data.data.item))
        dispatch(setAppStatusAC('succeeded'))
      } else {
        dispatch(setAppErrorAC(res.data.messages.length ? res.data.messages[0] : 'Some error occurred'))
        dispatch(setAppStatusAC('failed'))
      }      
    })
}

export const removeTaskTC = (todoListId: string, id: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.deleteTask(todoListId, id)
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(removeTaskAC(todoListId, id))
    })
}

export const updateTaskTC = (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType) => 
  (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {

  const state = getState()
  const task = state.tasks[todoListId].find(task => task.id === id)
  if(!task) {
    console.warn('task not found in the state')
    return 
  }
  const apiModel: UpdateTaskModelType = {
    status: task.status,
    title: task.title,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    deadline: task.deadline,
    ...domainModel
  }
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.updateTask(todoListId, id, apiModel)
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(updateTaskAC(todoListId, id, domainModel))
    })
}

// types
export type TasksStateType = {
  [key: string]: Array<TaskType>
}

export type ActionsType = 
  | ReturnType<typeof removeTaskAC> 
  | ReturnType<typeof addTaskAC> 
  | ReturnType<typeof updateTaskAC> 
  | ReturnType<typeof setTasksAC>
  | AddTodoListsActionType 
  | RemoveTodoListsActionType 
  | SetTodoListsActionType 
  | SetAppStatusActionType
  | SetAppErrorActionType

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

