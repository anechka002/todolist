import { RootState } from "./store";

export const selectError = (state: RootState) => state.app.error
export const selectThemeMode = (state: RootState) => state.app.theme
export const selectStatus = (state: RootState) => state.app.status

export const selectTodolists = (state: RootState) => state.todolists
export const selectTasks = (state: RootState) => state.tasks

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
export const selectIsInitialized = (state: RootState) => state.auth.isInitialized