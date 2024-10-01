import { TasksStateType } from "../type/type"
import { tasksReducer } from "./task-reducer"
import { addTodoListAC, TodoListDomainType, todoListsReducer } from "./todolist-reducer"

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodoListDomainType> = []

  const action = addTodoListAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.todolistId)
  expect(idFromTodolists).toBe(action.todolistId)
})