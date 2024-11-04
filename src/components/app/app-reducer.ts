export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type RequestThemeType = 'light' | 'dark'

const initialState = {
  status: 'idle' as RequestStatusType,
  error: null as (string | null),
  theme: 'light' as RequestThemeType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return { ...state, status: action.status }
    case 'APP/SET-ERROR':
      return { ...state, error: action.error }
    case 'APP/SET-THEME': {
      return {...state, theme: action.theme}
    }
    default:
      return state
  }
}

export const setAppStatusAC = (status: RequestStatusType) => {
  return {type: 'APP/SET-STATUS', status} as const
}
export const setAppErrorAC = (error: string | null) => {
  return {type: 'APP/SET-ERROR', error} as const
}
export const setAppThemeAC = (theme: RequestThemeType) => {
  return {type: 'APP/SET-THEME', theme} as const
}

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppThemeActionType = ReturnType<typeof setAppThemeAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | SetAppThemeActionType