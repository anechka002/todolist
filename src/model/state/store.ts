import { applyMiddleware, combineReducers, compose, legacy_createStore, UnknownAction } from "redux";
import { tasksReducer } from "../task-reducer";
import { todoListsReducer } from "../todolist-reducer";
import {thunk, ThunkDispatch} from 'redux-thunk'

declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // {}, composeEnhancers(),

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

// store = {
//   state: {
//     tasks: {},
//     todolists: []
//   }
//   getState()
//   dispatch()
//   subscribe()
// }