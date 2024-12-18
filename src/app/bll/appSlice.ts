import { createSlice } from "@reduxjs/toolkit"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestThemeType = 'light' | 'dark'


export type AppStateType = {
  status: RequestStatusType;
  error: string | null;
  theme: RequestThemeType;
};

const initialState: AppStateType = {
  status: 'idle' as RequestStatusType,
  error: null as (string | null),
  theme: 'light' as RequestThemeType
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: (create) => {
    return {
      setAppStatus: create.reducer<{status: RequestStatusType}>((state, action) => {
        state.status = action.payload.status
      }),
      setAppError: create.reducer<{error: string | null}>((state, action) => {
        state.error = action.payload.error
      }),
      setAppTheme: create.reducer<{theme: RequestThemeType}>((state, action) => {
        state.theme = action.payload.theme
      }),
    }
  },
  selectors: {
    selectError: state => state.error,
    selectThemeMode: state => state.theme,
    selectStatus: state => state.status,
  }
})

export const { setAppStatus, setAppError, setAppTheme } = appSlice.actions
export const appReducer = appSlice.reducer
export const {selectError, selectThemeMode, selectStatus} = appSlice.selectors
