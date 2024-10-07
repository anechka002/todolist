import { TaskPriorities, TaskStatuses } from "../api/todolists-api";
import { TasksStateType } from "../type/type";
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC } from "./task-reducer";
import { addTodoListAC, removeTodoListAC } from "./todolist-reducer";

let startState: TasksStateType

beforeEach(()=> {
  startState = {
    'todoListId1': [
        { id: '1', title: 'CSS', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''},
        { id: '2', title: 'JS', status: TaskStatuses.Completed, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: '' },
        { id: '3', title: 'React', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: '' },
    ],
    'todoListId2': [
        { id: '1', title: 'bread', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: '' },
        { id: '2', title: 'milk', status: TaskStatuses.Completed, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: '' },
        { id: '3', title: 'ice', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: '' },
    ],
  }
})

test('correct task should be deleted from correct array', () => {
  const taskIdToRemove = '2'
  const action = removeTaskAC('todoListId2', taskIdToRemove)

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todoListId1': [
        {id: '1', title: 'CSS', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''},
        {id: '2', title: 'JS', status: TaskStatuses.Completed, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''},
        {id: '3', title: 'React', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId1', order: 0, addedDate: ''}
    ],
    'todoListId2': [
        {id: '1', title: 'bread', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''},
        {id: '3', title: 'ice', status: TaskStatuses.New, description: '',  priority: TaskPriorities.Low, startDate: '', deadline: '', todoListId: 'todoListId2', order: 0, addedDate: ''}
    ]
  })
})

test('correct task should be added to correct array', () => {
  // const action = addTaskAC('todoListId2', 'yo')
  const action = addTaskAC({
    todoListId: 'todoListId2',
    title: 'yo',
    status: TaskStatuses.New,
    addedDate: '',
    deadline: '',
    description: '',
    order: 0,
    priority: 0,
    startDate: '',
    id: 'id exist'
  })
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId1'].length).toBe(3)
  expect(endState['todoListId2'].length).toBe(4)
  expect(endState['todoListId2'][0].id).toBeDefined()
  expect(endState['todoListId2'][0].title).toBe('yo')
  expect(endState['todoListId2'][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
  const action = changeTaskStatusAC('todoListId2', '2', TaskStatuses.New)
  const endState = tasksReducer(startState, action)

  expect(endState['todoListId2'][1].status).toBe(TaskStatuses.New)
  expect(endState['todoListId1'][1].status).toBe(TaskStatuses.Completed)
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

