import { Action, combineReducers, compose, legacy_createStore as createStore } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { tasksReducer, tasksSlice } from "../features/todolistsList/bll/tasksSlice"
import { todoListsReducer, todolistsSlice } from "../features/todolistsList/bll/todolistsSlice"
import { configureStore } from "@reduxjs/toolkit"
import { appReducer, appSlice } from "./bll/appSlice"
import { baseApi } from "./baseApi"
import { setupListeners } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // {}, composeEnhancers(),

// непосредственно создаём store
export const store = configureStore({ 
  reducer: {
    [tasksSlice.name]: tasksReducer,
    [todolistsSlice.name]: todoListsReducer,

    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
})

setupListeners(store.dispatch)

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// определить автоматически тип state от всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// создаем тип dispatch который принимает как АС так и ТС
export type AppDispatch = typeof store.dispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>

// все типы action для всего app
export type ActionsType = any

// типизация всех action и thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store

// Подписка на изменения store
// store.subscribe(() => {
//   console.log('State changed:', store.getState());
// });

// store = {
//   state: {
//     tasks: {},
//     todolists: []
//   }
//   getState()
//   dispatch()
//   subscribe()
// }
