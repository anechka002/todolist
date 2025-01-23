import { TaskPriorities, TaskStatuses } from '../lib/enum/enums';
import { TaskDomainType } from '../lib/types/types';

export type TaskType = {
  description: string | null;
  title: string;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};
export type UpdateTaskModelType = {
  title: string;
  description: string | null;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
};
export type GetTasksResponseType = {
  error: string | null;
  totalCount: number;
  items: TaskType[];
};
export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: TaskDomainType [];
};
