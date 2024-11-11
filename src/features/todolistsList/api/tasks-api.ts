import { instance } from '../../../common/instance/instance';
import { ResponseType } from '../../../common/types';
import {
  GetTasksResponseType,
  TaskType,
  UpdateTaskModelType,
} from './tasks-api.types';

export const tasksAPI = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponseType>(
      `/todo-lists/${todoListId}/tasks`
    );
  },
  createTask(todoListId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(
      `/todo-lists/${todoListId}/tasks`,
      { title }
    );
  },
  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(
      `/todo-lists/${todoListId}/tasks/${taskId}`
    );
  },
  updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<ResponseType>(
      `/todo-lists/${todoListId}/tasks/${taskId}`,
      model
    );
  },
};
