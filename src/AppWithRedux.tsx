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
import { useSelector } from 'react-redux';
import { AppRootStateType } from './model/state/store';
import { useDispatch } from 'react-redux';

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

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todolistId, filter))
    }

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(todolistId, id))
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, id, isDone))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(todolistId, title))
    }

    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }

    const updateTask = (todolistId: string, id: string, title: string) => {
        dispatch(updateTaskAC(todolistId, id, title))
    }

    const updateTodoList = (todolistId: string, title: string) => {
        dispatch(updateTodoListAC(todolistId, title))
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

export default AppWithRedux;
