import { applyMiddleware, combineReducers, compose, legacy_createStore, UnknownAction } from "redux";
import { tasksReducer } from "../task-reducer";
import { todoListsReducer } from "../todolist-reducer";
import {thunk, ThunkDispatch} from 'redux-thunk'
import { appReducer } from "../../components/app/app-reducer";

declare global {
  interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer,
  app: appReducer,
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // {}, composeEnhancers(),

// непосредственно создаём store
export const store = legacy_createStore(rootReducer, {}, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>;

// определить автоматически тип state от всего объекта состояния
export type RootState = ReturnType<typeof store.getState>;

// создаем тип dispatch который принимает как АС так и ТС
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