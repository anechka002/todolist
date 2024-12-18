import { v1 } from "uuid"
import { RequestStatusType } from "app/bll/appSlice"
import { addTodoList, changeTodoListEntityStatus, changeTodoListFilter, FilterValuesType, removeTodoList, TodoListDomainType, todoListsReducer, updateTodoList } from "../todolistsSlice"

let todoListId1: string
let todoListId2: string
let startState: Array<TodoListDomainType>

beforeEach(() => {
  todoListId1 = v1()
  todoListId2 = v1()

  startState = [
    { id: todoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ]
})

test("correct todolist should be removed", () => {
  const endState = todoListsReducer(startState, removeTodoList({todolistId: todoListId1}))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId2)
})

test("correct todolist should be added", () => {
  let newTodoList = {
    id: "bla",
    title: "New TodoList",
    addedDate: "",
    order: 0,
  }

  const endState = todoListsReducer(startState, addTodoList({todoList: newTodoList}))

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodoList.title)
  expect(endState[2].filter).toBe("all")
  expect(endState[2].id).toBeDefined()
})

test("correct todolist should change its name", () => {
  let newTitle = "New TodoList"

  const action = updateTodoList({todolistId: todoListId2, title: newTitle})

  const endState = todoListsReducer(startState, action)

  expect(endState[0].title).toBe("What to learn")
  expect(endState[1].title).toBe(newTitle)
})

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed"

  const action = changeTodoListFilter({todolistId: todoListId2, filter: newFilter})

  const endState = todoListsReducer(startState, action)

  expect(endState[0].filter).toBe("all")
  expect(endState[1].filter).toBe(newFilter)
})

test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatusType = "loading"

  const action = changeTodoListEntityStatus({id: todoListId2, entityStatus: newStatus})

  const endState = todoListsReducer(startState, action)

  expect(endState[0].entityStatus).toBe("idle")
  expect(endState[1].entityStatus).toBe(newStatus)
})
