import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import  {TodoList}  from './components/todos/TodoList';
import { AddItemForm } from './components/itemForm/AddItemForm';
import { Box, Container, CssBaseline, Grid, Paper } from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material";
import AppBarHeader from './components/header/AppBarHeader';
import { addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC } from './model/task-reducer';
import { addTodoListAC, changeTodoListFilterAC, removeTodoListAC, todoListsReducer, updateTodoListAC } from './model/todolist-reducer';

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistsType = { 
    id: string, 
    title: string, 
    filter: FilterValuesType
};
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: TaskType[]
}

export type ThemeMode = 'dark' | 'light'

function AppWithReducer() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, dispatchTodoLists] = useReducer(todoListsReducer,[
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatchTodoLists(changeTodoListFilterAC(todolistId, filter))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatchTasks(removeTaskAC(todolistId, id))
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatchTasks(changeTaskStatusAC(todolistId, id, isDone))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchTasks(addTaskAC(todolistId, title))
    }

    const removeTodoList = (todolistId: string) => {
        const action = removeTodoListAC(todolistId)
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        // const newTodoListId = v1()
        dispatchTodoLists(action)
        dispatchTasks(action)
    }

    const updateTask = (todolistId: string, id: string, title: string) => {
        dispatchTasks(updateTaskAC(todolistId, id, title))
    }

    const updateTodoList = (todolistId: string, title: string) => {
        dispatchTodoLists(updateTodoListAC(todolistId, title))
    }

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')
    const changeModeHandler = () => {
        setThemeMode(themeMode == 'light' ? 'dark' : 'light')
    }
    const theme = createTheme({
        palette: {
            mode: themeMode === 'light' ? 'light' : 'dark',
            primary: {
                main: '#1565c0',
                contrastText: 'white',
            },
            secondary: {
                light: '#5d67f7',
                main: '#1831c3',
                dark: '#001c5d',
                contrastText: '#fff',
            }
        }
    })
    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Box sx={{flexGrow: 1, mb: 10}}>
                    <AppBarHeader changeModeHandler={changeModeHandler}/>
                </Box>
            

                <Container fixed>
                    <Grid container style={{padding: '20px'}}>
                        <AddItemForm addItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {
                            todolists.map(el => {
                                return (
                                    <Grid key={el.id} item>
                                        <Paper style={{padding: '10px'}}>
                                            <TodoList 
                                                key={el.id}
                                                tasks={tasks}
                                                todolistId={el.id}
                                                title={el.title}
                                                filter={el.filter}
                                                changeFilter={changeFilter}
                                                removeTask={removeTask}
                                                changeTaskStatus={changeTaskStatus}
                                                addTask={addTask}
                                                removeTodoList={removeTodoList}
                                                updateTask={updateTask}
                                                updateTodoList={updateTodoList}
                                            />
                                        </Paper>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Container>
            </ThemeProvider>
        </div>
    );
}

export default AppWithReducer;
