import { TaskType } from "../api/todolists-api";

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type ThemeMode = 'dark' | 'light'