import { todoListsAPI, TodoListType } from "../api/todolists-api";
import { Dispatch } from "redux";
import { RequestStatusType, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType } from "../components/app/app-reducer";

const initialState: Array<TodoListDomainType> = []

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionsType): Array<TodoListDomainType> => {
  switch(action.type) {
    case 'TODOLISTS/REMOVE-TODOLIST':
      return state.filter(el => el.id != action.id)
    case 'TODOLISTS/ADD-TODOLIST':
      const newTodoList: TodoListDomainType = {...action.todoList, filter: 'all', entityStatus: 'loading'}
      return [newTodoList, ...state]
    case 'TODOLISTS/UPDATE-TODOLIST':
      return state.map(el => el.id === action.todolistId ? {...el, title: action.title} : el)
    case 'TODOLISTS/CHANGE-TODOLIST-FILTER':
      const newTodolist = state.map(el => el.id === action.todolistId ? {...el, filter: action.filter}: el)
      return newTodolist
    case 'TODOLISTS/SET-TODOLISTS': {
      return action.todos.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
    }
    case 'TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS': {
      return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
    }
    default: 
    return state
  }
}

// actions
export const removeTodoListAC = (todolistId: string) => {
  return { type: 'TODOLISTS/REMOVE-TODOLIST', id: todolistId } as const
}
export const addTodoListAC = (todoList: TodoListType) => {
  return { type: 'TODOLISTS/ADD-TODOLIST', todoList } as const
}
export const updateTodoListAC = (todolistId: string, title: string) => {
  return { type: 'TODOLISTS/UPDATE-TODOLIST', todolistId, title } as const
}
export const changeTodoListFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { type: 'TODOLISTS/CHANGE-TODOLIST-FILTER', todolistId, filter } as const
}
export const setTodoListsAC = (todos: TodoListType[]) => {
  return { type: 'TODOLISTS/SET-TODOLISTS', todos } as const
}
export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
  return {type: 'TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
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
  dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
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
  dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
  todoListsAPI.updateTodoList(todolistId, title)
    .then((res) => {
      dispatch(setAppStatusAC('succeeded'))
      dispatch(updateTodoListAC(todolistId, title))
      dispatch(changeTodoListEntityStatusAC(todolistId, 'idle'))
    })
}

// types
export type FilterValuesType = "all" | "active" | "completed";
export type TodoListDomainType = TodoListType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
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
  | ReturnType<typeof changeTodoListEntityStatusAC>