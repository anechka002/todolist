import { TaskType } from "../api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type ThemeMode = 'dark' | 'light'