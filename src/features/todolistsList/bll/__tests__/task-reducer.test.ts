import { TaskPriorities, TaskStatuses } from "features/todolistsList/lib/enum"
import { addTask, removeTask, tasksReducer, TasksStateType, updateTask } from "../tasksSlice"
import { addTodoList, removeTodoList } from "../todolistsSlice"

let startState: TasksStateType

beforeEach(() => {
  startState = {
    todoListId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "ice",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
    ],
  }
})

test("correct task should be deleted from correct array", () => {
  const taskIdToRemove = "2"
  const action = removeTask({ todoListId: "todoListId2", taskId: taskIdToRemove })

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    todoListId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
      {
        id: "3",
        title: "ice",
        status: TaskStatuses.New,
        description: "",
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
      },
    ],
  })
})

test("correct task should be added to correct array", () => {
  const action = addTask({task:{
    todoListId: "todoListId2",
    title: "yo",
    status: TaskStatuses.New,
    addedDate: "",
    deadline: "",
    description: "",
    order: 0,
    priority: 0,
    startDate: "",
    id: "id exist",
  }})
  const endState = tasksReducer(startState, action)

  expect(endState["todoListId1"].length).toBe(3)
  expect(endState["todoListId2"].length).toBe(4)
  expect(endState["todoListId2"][0].id).toBeDefined()
  expect(endState["todoListId2"][0].title).toBe("yo")
  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New)
})

test("status of specified task should be changed", () => {
  const action = updateTask({todoListId: "todoListId2", id: "2", model: { status: TaskStatuses.New }})
  const endState = tasksReducer(startState, action)

  expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New)
  expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed)
})

test("title of specified task should be changed", () => {
  const action = updateTask({todoListId: "todoListId2", id:"2", model: { title: "yo" }})
  const endState = tasksReducer(startState, action)

  expect(endState["todoListId2"][1].title).toBe("yo")
  expect(endState["todoListId1"][1].title).toBe("JS")
})

test("new array should be added when new todolist is added", () => {
  const action = addTodoList({todoList: {
    id: "blabla",
    title: "new todolist",
    order: 0,
    addedDate: "",
  }})

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState) // ["todolistId1", "todolistId2", "newKey"]
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2")
  if (!newKey) {
    throw Error("new key should be added")
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey].length).toBe(3)
})

test("property with todolistId should be deleted", () => {
  const action = removeTodoList({todolistId: "todolistId2"})

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState["todolistId2"]).not.toBeDefined()
})
