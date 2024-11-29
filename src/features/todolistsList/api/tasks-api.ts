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
