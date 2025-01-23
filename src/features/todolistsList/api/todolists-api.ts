import { baseApi } from 'app/baseApi';
import { instance } from '../../../common/instance/instance';
import { ResponseType } from '../../../common/types';
import { TodoListType } from './todolists-api.types';
import { TodoListDomainType } from '../lib/types/types';

export const todoListsAPI = baseApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getTodoLists: builder.query<TodoListDomainType[], void>({
        query: () => '/todo-lists',
        transformResponse(todolists: TodoListType[]): TodoListDomainType[] {
          return todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
        },
      providesTags: ['Todolist']
      }),
      createTodolist: builder.mutation<ResponseType<{ item: TodoListType }>, string>({
        query: (title) => {
          return {
            url: "todo-lists",
            method: "POST",
            body: { title }
          }
        },
        invalidatesTags: ['Todolist']
      }),
      deleteTodoList: builder.mutation<ResponseType<{ item: TodoListType }>, string>({
        query: (todoListId) => {
          return {
            url: `/todo-lists/${todoListId}`,
            method: "DELETE",
          }
        },
        invalidatesTags: ['Todolist']
      }),
      updateTodoList: builder.mutation<ResponseType, {todoListId: string, title: string}>({
        query: ({todoListId, title}) => {
          return {
            url: `/todo-lists/${todoListId}`,
            method: "PUT",
            body: { title }
          }
        },
        invalidatesTags: ['Todolist']
      }),
    }
  }
})

export const {useGetTodoListsQuery, useCreateTodolistMutation, useDeleteTodoListMutation, useUpdateTodoListMutation} = todoListsAPI

export const _todoListsAPI = {
  getTodoLists() {
    const promise = instance.get<TodoListType[]>('/todo-lists');
    return promise;
  },
  createTodoLists(title: string) {
    const promise = instance.post<ResponseType<{ item: TodoListType }>>(
      '/todo-lists',
      { title: title }
    );
    return promise;
  },
  deleteTodoList(todoListId: string) {
    const promise = instance.delete<ResponseType>(`/todo-lists/${todoListId}`);
    return promise;
  },
  updateTodoList(todoListId: string, title: string) {
    const promise = instance.put<ResponseType>(`/todo-lists/${todoListId}`, {
      title: title,
    });
    return promise;
  },
};
