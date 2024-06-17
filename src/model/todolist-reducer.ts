import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "../type/type";

const initialState: Array<TodolistsType> = []

export type RemoveTodoListsActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListsActionType = ReturnType<typeof addTodoListAC>
export type UpdateTodoListsActionType = ReturnType<typeof updateTodoListAC>
export type ChangeTodoListsFilterActionType = ReturnType<typeof changeTodoListFilterAC>

export type ActionsType = RemoveTodoListsActionType | AddTodoListsActionType | UpdateTodoListsActionType | ChangeTodoListsFilterActionType

export const todoListsReducer = (state: Array<TodolistsType> = initialState, action: ActionsType): Array<TodolistsType> => {
  switch(action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(el => el.id != action.id)
    case 'ADD-TODOLIST':
      const newTodoList: TodolistsType = {
        id: action.todolistId,
        title: action.title,
        filter: 'all'
      }
      return [newTodoList, ...state]
    case 'UPDATE-TODOLIST':
      return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
    case 'CHANGE-TODOLIST-FILTER':
      const newTodolist = state.map(el => el.id === action.todolistId ? {...el, filter: action.filter}: el)
      return newTodolist
    default: 
    return state
  }
}

export const removeTodoListAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', id: todolistId} as const
}
export const addTodoListAC = (title: string) => {
  return { type: 'ADD-TODOLIST', todolistId: v1(), title} as const
}
export const updateTodoListAC = (todolistId: string, title: string) => {
  return { type: 'UPDATE-TODOLIST', todolistId, title} as const
}
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter} as const
}
