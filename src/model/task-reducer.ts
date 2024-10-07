import { v1 } from "uuid";
import { AddTodoListsActionType, RemoveTodoListsActionType, setTodoListsActionType } from "./todolist-reducer";
import { TasksStateType } from "../type/type";
import { TaskPriorities, TaskStatuses, TaskType, todoListsAPI } from "../api/todolists-api";
import { Dispatch } from "redux";

const initialState: TasksStateType = {}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

export type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | UpdateTaskActionType | AddTodoListsActionType | RemoveTodoListsActionType | setTodoListsActionType | SetTasksActionType

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
    case 'SET-TASKS': {
      return {
        ...state,
        [action.todoListId]: action.tasks
      }
    }
    default: return state
  }
}

export const removeTaskAC = (todoListId: string, id: string) => {
  return {type: 'REMOVE-TASK', todoListId, id} as const
}

export const addTaskAC = (task: TaskType) => {
  return {type: 'ADD-TASK', task} as const
}

export const changeTaskStatusAC = (todoListId: string, id: string, status: TaskStatuses) => {
  return {type: 'CHANGE-TASK-STATUS', todoListId, id, status} as const
}

export const updateTaskAC = (todoListId: string, id: string, title: string) => {
  return {type: 'UPDATE-TASK', todoListId, id, title} as const
}

export const setTasksAC = (todoListId: string, tasks: TaskType[]) => {
  return {type: 'SET-TASKS', todoListId, tasks} as const
}

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


