import { AddTodoListsActionType, RemoveTodoListsActionType, setTodoListsActionType } from "./todolist-reducer";
import { TasksStateType } from "../type/type";
import { TaskPriorities, TaskStatuses, TaskType, todoListsAPI, UpdateTaskModelType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootStateType } from "./state/store";

const initialState: TasksStateType = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

export type ActionsType = RemoveTaskActionType | AddTaskActionType | UpdateTaskActionType | AddTodoListsActionType | RemoveTodoListsActionType | setTodoListsActionType | SetTasksActionType

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK':
      const deleteTask = {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.id)}
      return deleteTask
      
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

// action

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

// thunk

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
  todoListsAPI.getTasks(todoListId)
    .then((res) => dispatch(setTasksAC(todoListId, res.data.items)))
}

export const addTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch) => {
  todoListsAPI.createTask(todoListId, title)
    .then((res) => dispatch(addTaskAC(res.data.data.item)))
}

export const removeTaskTC = (todoListId: string, id: string) => (dispatch: Dispatch) => {
  todoListsAPI.deleteTask(todoListId, id)
    .then((res) => dispatch(removeTaskAC(todoListId, id)))
}

export type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}

export const updateTaskTC = (todoListId: string, id: string, domainModel: UpdateDomainTaskModelType) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
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
  todoListsAPI.updateTask(todoListId, id, apiModel)
    .then((res) => dispatch(updateTaskAC(todoListId, id, domainModel)))
}
