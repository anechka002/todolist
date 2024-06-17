import { v1 } from "uuid";
import { AddTodoListsActionType, RemoveTodoListsActionType } from "./todolist-reducer";
import { TasksStateType } from "../type/type";

const initialState: TasksStateType = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | UpdateTaskActionType | AddTodoListsActionType | RemoveTodoListsActionType

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK':
      const deleteTask = {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.id)}
      return deleteTask
    case 'ADD-TASK':
      const newTask = {id: v1(), title: action.title, isDone: false}
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}
    case 'CHANGE-TASK-STATUS':     
      return {...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.id ? {...el, isDone: action.isDone} : el)}
    case 'UPDATE-TASK':
      return {...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.id ? {...el, title: action.title} : el)}
    case 'ADD-TODOLIST':
      return {
        ...state,
        [action.todolistId]: []
      }
    case 'REMOVE-TODOLIST':
        let copyState = {...state}
        delete copyState[action.id]
        return copyState
    default: return state
  }
}

export const removeTaskAC = (todoListId: string, id: string) => {
  return {type: 'REMOVE-TASK', todoListId, id} as const
}

export const addTaskAC = (todoListId: string, title: string) => {
  return {type: 'ADD-TASK', todoListId, title} as const
}

export const changeTaskStatusAC = (todoListId: string, id: string, isDone: boolean) => {
  return {type: 'CHANGE-TASK-STATUS', todoListId, id, isDone} as const
}

export const updateTaskAC = (todoListId: string, id: string, title: string) => {
  return {type: 'UPDATE-TASK', todoListId, id, title} as const
}


