import { baseApi } from 'app/baseApi';
import { instance } from '../../../common/instance/instance';
import { ResponseType } from '../../../common/types';
import {
  GetTasksResponse,
  GetTasksResponseType,
  TaskType,
  UpdateTaskModelType,
} from './tasks-api.types';

export const tasksAPI = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTasks: builder.query<GetTasksResponse, string>({
        query: (todoListId) => `/todo-lists/${todoListId}/tasks`,
        transformResponse(tasks: GetTasksResponseType): GetTasksResponse {
          return {
            ...tasks,
            items: tasks.items.map((el) => ({ ...el, entityStatus: "idle" })) 
          }       
        },
        providesTags: ['Task']
      }),
      createTask: builder.mutation<ResponseType<{ item: TaskType }>, {todoListId: string, title: string}>({
        query: ({todoListId, title}) => {
          return {
            url: `/todo-lists/${todoListId}/tasks`,
            method: "POST",
            body: { title },
          }
        },
        invalidatesTags: ['Task']
      }),
      deleteTask: builder.mutation<ResponseType, {todoListId: string, taskId: string}>({
        query: (arg) => {
          return {
            url: `/todo-lists/${arg.todoListId}/tasks/${arg.taskId}`,
            method: "DELETE",
          }
        },
        invalidatesTags: ['Task']
      }),
      updateTask: builder.mutation<ResponseType, {todoListId: string, taskId: string, model: UpdateTaskModelType}>({
        query: ({todoListId, model, taskId}) => {
          return {
            url: `/todo-lists/${todoListId}/tasks/${taskId}`,
            method: "PUT",
            body: model
          }
        },
        invalidatesTags: ['Task']
      }),
    }
  }
})

export const {useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation} = tasksAPI

export const _tasksAPI = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponseType>(
      `/todo-lists/${todoListId}/tasks`
    );
  },
  createTask(arg: {todoListId: string, title: string}) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${arg.todoListId}/tasks`,
      { title: arg.title }
    );
  },
  deleteTask(arg: {todoListId: string, taskId: string}) {
    return instance.delete<ResponseType>(
      `/todo-lists/${arg.todoListId}/tasks/${arg.taskId}`
    );
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(
      `/todo-lists/${todoListId}/tasks/${taskId}`,
      model
    );
  },
};
