import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': '835d64e3-7b27-41f2-8238-d2ebcfee0411'
  }
})

// api
export const todoListsAPI = {
  getTodoLists() {
    const promise = instance.get<TodoListType[]>('/todo-lists')
    return promise
  },
  createTodoLists(title: string) {
    return instance.post<ResponseType<{item: TodoListType}>>('/todo-lists', {title: title})
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
export type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  data: T
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
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
export type GetTasksResponseType = {
  error: string | null
  totalCount: number
  items: TaskType[]
}