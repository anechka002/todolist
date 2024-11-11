import { instance } from "../common/instance/instance"

// api
export const todoListsAPI = {
  getTodoLists() {
    const promise = instance.get<TodoListType[]>('/todo-lists')
    return promise
  },
  createTodoLists(title: string) {
    const promise = instance.post<ResponseType<{item: TodoListType}>>('/todo-lists', {title: title})
    return promise
  },
  deleteTodoList(todoListId: string) {
    const promise = instance.delete<ResponseType>(`/todo-lists/${todoListId}`)
    return promise
  },
  updateTodoList(todoListId: string, title: string) {
    const promise = instance.put<ResponseType>(`/todo-lists/${todoListId}`, {title: title})
    return promise
  },

//==============TASKS=================

  getTasks(todoListId: string) {
    return instance.get<GetTasksResponseType>(`/todo-lists/${todoListId}/tasks`)
  },
  createTask(todoListId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title})
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`, model)
  }
}

// types
export type TodoListType = {
  id: string
  title: string
  addedDate: string
  order: number
}

type FieldError = {
  error: string
  field: string
}

export type ResponseType<T = {}> = {
  data: T
  resultCode: number
  messages: string[]
  fieldsError: FieldError[]
}
export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}
export type TaskType = {
  description: string | null
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null 
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string | null
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string | null
  deadline: string | null
}
export type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}