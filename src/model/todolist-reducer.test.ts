import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "../App";
import { addTodoListAC, changeTodoListFilterAC, removeTodoListAC, todoListsReducer, updateTodoListAC } from "./todolist-reducer";

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodolistsType>

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    {id: todoListId1, title: "What to learn", filter: "all"},
    {id: todoListId2, title: "What to buy", filter: "all"}
]
})

test('correct todolist should be removed', () => { 

  const endState = todoListsReducer(startState, removeTodoListAC(todoListId1))

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test('correct todolist should be added', () => { 
  let newTitle = 'New TodoList';

  const endState = todoListsReducer(startState, addTodoListAC(newTitle))  

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTitle);
  expect(endState[2].filter).toBe('all');
  expect(endState[2].id).toBeDefined()
});

test('correct todolist should change its name', () => { 
  let newTitle = 'New TodoList';

  const action = updateTodoListAC(todoListId2, newTitle)

  const endState = todoListsReducer(startState, action)  

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTitle);
});

test('correct filter of todolist should be changed', () => { 

  let newFilter: FilterValuesType = 'completed'

  const action = changeTodoListFilterAC(todoListId2, newFilter)

  const endState = todoListsReducer(startState, action)  

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});