import { instance } from '../../../common/instance/instance';
import { ResponseType } from '../../../common/types';
import { TodoListType } from './todolists-api.types';

export const todoListsAPI = {
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
