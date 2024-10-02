import React, { useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import { AddItemForm } from './components/itemForm/AddItemForm';
import { Box, Container, CssBaseline, Grid, Paper } from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material";
import AppBarHeader from './components/header/AppBarHeader';
import { addTodoListAC, setTodoListsAC, TodoListDomainType } from './model/todolist-reducer';
import { useSelector } from 'react-redux';
import { RootReducerType } from './model/state/store';
import { useDispatch } from 'react-redux';
import { ThemeMode} from './type/type';
import { TodoListWithRedux } from './components/todos/TodolistWithRedux';
import { todoListsAPI } from './api/todolists-api';

function AppWithRedux() {

    const todolists = useSelector<RootReducerType, Array<TodoListDomainType>>(state => state.todolists)
    
    const dispatch = useDispatch()

    const addTodoList = useCallback((title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
    }, [dispatch])

    const [themeMode, setThemeMode] = useState<ThemeMode>('light')

    const changeModeHandler = () => {
        setThemeMode(themeMode === 'light' ? 'dark' : 'light')
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
    const memoizedTheme = useMemo(() => theme, [themeMode])

    useEffect(() => {
        todoListsAPI.getTodoLists()
        .then((res) => dispatch(setTodoListsAC(res.data)))
    }, [])

    return (
        <div className="App">
            <ThemeProvider theme={memoizedTheme}>
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
                                            <TodoListWithRedux
                                                todolist={el}
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
