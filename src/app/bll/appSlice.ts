import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"
import { tasksAPI } from "features/todolistsList/api/tasks-api";
import { todoListsAPI } from "features/todolistsList/api/todolists-api";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestThemeType = 'light' | 'dark'


export type AppStateType = {
  status: RequestStatusType;
  error: string | null;
  theme: RequestThemeType;
  isLoggedIn: boolean
};

const initialState: AppStateType = {
  status: 'idle' as RequestStatusType,
  error: null as (string | null),
  theme: 'light' as RequestThemeType,
  isLoggedIn: false,
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
      setIsLoggedIn: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }),
    }
  },
  extraReducers: (builder) => {
    builder
      // .addMatcher(
      //   (action) => {
      //   // type predicate function
      //     return action.type.endsWith('/pending')
      //   },
      //   (state, action) => {
      //     // change state
      //     state.status = 'loading'
      //   }
      // )
      .addMatcher(isPending, (state, action) => {
        if(
          todoListsAPI.endpoints.getTodoLists.matchPending(action) || 
          tasksAPI.endpoints.getTasks.matchPending(action)
        ) {
          return 
        }
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, state => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, state => {
        state.status = 'failed'
      })
  },
  selectors: {
    selectError: state => state.error,
    selectThemeMode: state => state.theme,
    selectStatus: state => state.status,
    selectIsLoggedIn: state => state.isLoggedIn,
  }
})

export const { setAppStatus, setAppError, setAppTheme, setIsLoggedIn } = appSlice.actions
export const {selectError, selectThemeMode, selectStatus, selectIsLoggedIn} = appSlice.selectors
export const appReducer = appSlice.reducer
