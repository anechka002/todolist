import { TasksStateType } from "../type/type";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC } from "./task-reducer";
import { addTodoListAC, removeTodoListAC } from "./todolist-reducer";

let startState: TasksStateType

beforeEach(()=> {
  startState = {
    'todoListId1': [
        { id: '1', title: 'CSS', isDone: false },
        { id: '2', title: 'JS', isDone: true },
        { id: '3', title: 'React', isDone: false },
    ],
    'todoListId2': [
        { id: '1', title: 'bread', isDone: false },
        { id: '2', title: 'milk', isDone: true },
        { id: '3', title: 'ice', isDone: false },
    ],
  }
})
test('correct task should be deleted from correct array', () => {
  const taskIdToRemove = '2'
  const action = removeTaskAC('todoListId2', taskIdToRemove)

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todoListId1': [
        {id: '1', title: 'CSS', isDone: false},
        {id: '2', title: 'JS', isDone: true},
        {id: '3', title: 'React', isDone: false}
    ],
    'todoListId2': [
        {id: '1', title: 'bread', isDone: false},
        {id: '3', title: 'ice', isDone: false}
    ]
  })
})

test('correct task should be added to correct array', () => {
  const action = addTaskAC('todoListId2', 'yo')
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(4)
  expect(endState['todoListId2'][0].id).toBeDefined()
  expect(endState['todoListId2'][0].title).toBe('yo')
  expect(endState['todoListId2'][0].isDone).toBe(false)
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC('todoListId2', '2', false)
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][1].isDone).toBe(false)
  expect(endState['todoListId1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {
  const action = updateTaskAC('todoListId2', '2', 'yo')
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][1].title).toBe('yo')
  expect(endState['todoListId1'][1].title).toBe('JS')
})

test('new array should be added when new todolist is added', () => {
  const action = addTodoListAC("new todolist");

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState);// ["todolistId1", "todolistId2", "newKey"]
  const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
      throw Error("new key should be added")
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey].length).toBe(3);
}) 

test('property with todolistId should be deleted', () => {

  const action = removeTodoListAC('todolistId2')

  const endState = tasksReducer(startState, action)

  const keys = Object.keys(endState)

  expect(keys.length).toBe(2)
  expect(endState['todolistId2']).not.toBeDefined()
})

