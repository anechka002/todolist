import React, {useState} from 'react';
import './App.css';
import  {TodoList}  from './components/todos/TodoList';
import { AddItemForm } from './components/itemForm/AddItemForm';
import { Box, Container, CssBaseline, Grid, Paper } from '@mui/material';
import {createTheme, ThemeProvider} from "@mui/material";
import AppBarHeader from './components/header/AppBarHeader';
import { addTodoListAC, changeTodoListFilterAC, removeTodoListAC, updateTodoListAC } from './model/todolist-reducer';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './model/state/store';
import { useDispatch } from 'react-redux';
import { FilterValuesType, ThemeMode, TodolistsType } from './type/type';

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, Array<TodolistsType>>(state => state.todolists)
    const dispatch = useDispatch()

    const changeFilter = (todolistId: string, filter: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todolistId, filter))
    }

    const removeTodoList = (todolistId: string) => {
        dispatch(removeTodoListAC(todolistId))
    }

    const addTodoList = (title: string) => {
        const action = addTodoListAC(title)
        dispatch(action)
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
                                                todolistId={el.id}
                                                title={el.title}
                                                filter={el.filter}
                                                changeFilter={changeFilter}
                                                removeTodoList={removeTodoList}                                               
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
