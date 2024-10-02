import { v1 } from "uuid";
import { AddTodoListsActionType, RemoveTodoListsActionType, setTodoListsActionType } from "./todolist-reducer";
import { TasksStateType } from "../type/type";
import { TaskPriorities, TaskStatuses, TaskType } from "../api/todolists-api";

const initialState: TasksStateType = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | UpdateTaskActionType | AddTodoListsActionType | RemoveTodoListsActionType | setTodoListsActionType

export const tasksReducer = (state = initialState, action: ActionsType): TasksStateType => {
  switch(action.type) {
    case 'REMOVE-TASK':
      const deleteTask = {...state, [action.todoListId]: state[action.todoListId].filter(el => el.id !== action.id)}
      return deleteTask
      
    case 'ADD-TASK':
      const newTask : TaskType = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todoListId, description: '', startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
      return {...state, [action.todoListId]: [newTask, ...state[action.todoListId]]}

    case 'CHANGE-TASK-STATUS':     
      return {...state, [action.todoListId]: state[action.todoListId].map(el => el.id === action.id ? {...el, status: action.status} : el)}

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

    case 'SET-TODOLISTS': {
      return action.todos.reduce((acc, val) => {
        acc[val.id] = [];
        return acc
      }, state)
    }
    default: return state
  }
}

export const removeTaskAC = (todoListId: string, id: string) => {
  return {type: 'REMOVE-TASK', todoListId, id} as const
}

export const addTaskAC = (todoListId: string, title: string) => {
  return {type: 'ADD-TASK', todoListId, title} as const
}

export const changeTaskStatusAC = (todoListId: string, id: string, status: TaskStatuses) => {
  return {type: 'CHANGE-TASK-STATUS', todoListId, id, status} as const
}

export const updateTaskAC = (todoListId: string, id: string, title: string) => {
  return {type: 'UPDATE-TASK', todoListId, id, title} as const
}


