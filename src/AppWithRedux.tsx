import React, { useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import { AddItemForm } from './components/itemForm/AddItemForm';
import { Box, Container, CssBaseline, Grid, Paper } from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material";
import AppBarHeader from './components/header/AppBarHeader';
import { addTodoListAC, getTodosTC, TodoListDomainType } from './model/todolist-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './model/state/store';
import { ThemeMode} from './type/type';
import { TodoListWithRedux } from './components/todos/TodolistWithRedux';
import { useAppDispatch } from './hooks/hooks';

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodoListDomainType>>(state => state.todolists)
    
    const dispatch = useAppDispatch()

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
        dispatch(getTodosTC)
    }, []);

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
