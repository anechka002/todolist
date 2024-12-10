import { setAppStatusAC } from "app/bll/app-reducer"
import { LoginArgs } from "../api/authApi.types"
import { AppDispatchType } from "app/store"
import { authApi } from "../api/authApi"
import { ResultCode } from "features/todolistsList/lib/enum"
import { handleServerAppError, handleServerNetworkError } from "common/utils"

type InitialStateType = typeof initialState

const initialState = {
  isLoggedIn: false,
  isInitialized: false,
}

export const authReducer = (
  state: InitialStateType = initialState,
  action: AuthType
): InitialStateType => {
  switch (action.type) {
    case 'SET_IS_LOGGED_IN':
      return { ...state, isLoggedIn: action.payload.isLoggedIn }
    case 'SET_IS_INITIALIZED':
      return {...state, isInitialized: action.payload.isInitialized}
    default:
      return state
  }
}
// Action creators
const setIsLoggedInAC = (isLoggedIn: boolean) => {
  return { type: 'SET_IS_LOGGED_IN', payload: { isLoggedIn } } as const
}
const setIsInitializedAC = (isInitialized: boolean) => {
  return { type: 'SET_IS_INITIALIZED', payload: { isInitialized } } as const
}

// Actions types
export type AuthType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof setIsInitializedAC>

// thunks
export const loginTC = (data: LoginArgs) => (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC('loading'))

  authApi.login(data) 
  .then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setIsLoggedInAC(true))
      localStorage.setItem('sn-token', res.data.data.token)
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((err) => {
    handleServerNetworkError(err, dispatch)
  })
}

export const logoutTC = () => (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC('loading'))

  authApi.logout() 
  .then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setIsLoggedInAC(false))
      localStorage.removeItem('sn-token')
    } else {
      handleServerAppError(res.data, dispatch)
    }
  })
  .catch((err) => {
    handleServerNetworkError(err, dispatch)
  })
}

export const initializeAppTC = () => (dispatch: AppDispatchType) => {
  dispatch(setAppStatusAC('loading'))

  authApi.me()
  .then((res) => {
    if (res.data.resultCode === ResultCode.Success) {
      dispatch(setAppStatusAC("succeeded"))
      dispatch(setIsLoggedInAC(true))
    } else {
      handleServerAppError(res.data, dispatch)
    }   
  })
  .catch((err) => {
    handleServerNetworkError(err, dispatch)
  })
  .finally(() => {
    dispatch(setIsInitializedAC(true))
  })
}