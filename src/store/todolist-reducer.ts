import { todoListsAPI, TodoListType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../components/app/app-reducer";

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
  switch(action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(el => el.id != action.id)
    case 'ADD-TODOLIST':
      const newTodoList: TodoListDomainType = {...action.todoList, filter: 'all'}
      return [newTodoList, ...state]
    case 'UPDATE-TODOLIST':
      return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
    case 'CHANGE-TODOLIST-FILTER':
      const newTodolist = state.map(el => el.id === action.todolistId ? {...el, filter: action.filter}: el)
      return newTodolist
    case 'SET-TODOLISTS': {
      return action.todos.map(el => ({...el, filter: 'all'}))
    }
    default: 
    return state
  }
}

// actions
export const removeTodoListAC = (todolistId: string) => {
  return { type: 'REMOVE-TODOLIST', id: todolistId } as const
}
export const addTodoListAC = (todoList: TodoListType) => {
  return { type: 'ADD-TODOLIST', todoList } as const
}
export const updateTodoListAC = (todolistId: string, title: string) => {
  return { type: 'UPDATE-TODOLIST', todolistId, title } as const
}
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const
}
export const setTodoListsAC = (todos: TodoListType[]) => {
  return { type: 'SET-TODOLISTS', todos } as const
}

// thunks
export const getTodosTC = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.getTodoLists()
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(setTodoListsAC(res.data))
    })
}

export const removeTodoListTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.deleteTodoList(todolistId)
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(removeTodoListAC(todolistId))
    })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.createTodoLists(title)
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(addTodoListAC(res.data.data.item))
    })
}

export const updateTodoListTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppStatusAC('loading'))
  todoListsAPI.updateTodoList(todolistId, title)
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(updateTodoListAC(todolistId, title))
    })
}

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
}

export type RemoveTodoListsActionType = ReturnType<typeof removeTodoListAC>
export type AddTodoListsActionType = ReturnType<typeof addTodoListAC>
export type SetTodoListsActionType = ReturnType<typeof setTodoListsAC>

export type ActionsType = 
  | ReturnType<typeof updateTodoListAC> 
  | ReturnType<typeof changeTodoListFilterAC> 
  | RemoveTodoListsActionType
  | AddTodoListsActionType 
  | SetTodoListsActionType
  | SetAppStatusActionType
  | SetAppErrorActionType