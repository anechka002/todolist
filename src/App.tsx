import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import  {TodoList}  from './components/todos/TodoList';
import { AddItemForm } from './components/itemForm/AddItemForm';
import { Box, Container, CssBaseline, Grid, Paper } from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material";
import AppBarHeader from './components/header/AppBarHeader';

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

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todolists, setTodolists] = useState<TodolistsType[]>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "all"}
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
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
        const newTodoList = todolists.map(el => {
            return el.id === todolistId ? {...el, filter} : el
        })
        setTodolists(newTodoList)
    }

    const removeTask = (todolistId: string, id: string) => {
        const newTodoListTask = {...tasks, [todolistId]: tasks[todolistId].filter(el => el.id !== id)}
        setTasks(newTodoListTask)
    }

    const changeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        const updateTask = {...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, isDone: isDone} : el)}
        setTasks(updateTask)
    }

    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
        const newTodoListTask = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodoListTask)
    }

    const removeTodoList = (todolistId: string) => {
        const newTodoList = todolists.filter(el => el.id !== todolistId)
        setTodolists(newTodoList)
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodolistsType = {id: newTodoListId, title: title, filter: "all"}
        setTodolists([newTodoList, ...todolists])
        setTasks({...tasks, [newTodoListId]: []})
    }

    const updateTask = (todolistId: string, id: string, title: string) => {
        const updateTask = {...tasks, [todolistId]: tasks[todolistId].map(el => el.id === id ? {...el, title: title} : el)}
        setTasks(updateTask)
    }

    const updateTodoList = (todolistId: string, title: string) => {
        const currentTodoList = todolists.map(el => el.id === todolistId ? {...el, title: title}: el)
        setTodolists(currentTodoList)
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

export default App;
