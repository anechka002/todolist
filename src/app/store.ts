import { applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from "redux"
import { thunk, ThunkAction, ThunkDispatch } from "redux-thunk"
import { AppActionsType, appReducer } from "./bll/app-reducer"
import { TasksActionsType, tasksReducer } from "../features/todolistsList/bll/task-reducer"
import { TodolistsActionsType, todoListsReducer } from "../features/todolistsList/bll/todolist-reducer"

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer,
  app: appReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose // {}, composeEnhancers(),

// непосредственно создаём store
export const store = createStore(rootReducer, {}, composeEnhancers(applyMiddleware(thunk)))

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// определить автоматически тип state от всего объекта состояния
export type RootState = ReturnType<typeof store.getState>

// создаем тип dispatch который принимает как АС так и ТС
// export type AppDispatch = typeof store.dispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, ActionsType>

// все типы action для всего app
export type ActionsType = TodolistsActionsType | TasksActionsType | AppActionsType

// типизация всех action и thunk
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ActionsType>

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
