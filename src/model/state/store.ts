import { combineReducers, legacy_createStore } from "redux";
import { tasksReducer } from "../task-reducer";
import { todoListsReducer } from "../todolist-reducer";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todoListsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer);
// определить автоматически тип всего объекта состояния
// export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootReducerType = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;

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