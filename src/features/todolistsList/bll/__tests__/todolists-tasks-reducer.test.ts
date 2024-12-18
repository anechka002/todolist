import { tasksReducer, TasksStateType } from "../tasksSlice"
import { addTodoList, TodoListDomainType, todoListsReducer } from "../todolistsSlice"

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {}
  const startTodolistsState: Array<TodoListDomainType> = []

  let newTodoList = {
    id: "bla",
    title: "New TodoList",
    addedDate: "",
    order: 0,
  }

  const action = addTodoList({todoList: newTodoList})

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payload.todoList.id)
  expect(idFromTodolists).toBe(action.payload.todoList.id)
})
