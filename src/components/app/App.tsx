import React, { useMemo, useState } from 'react';
import './App.css';
import { Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material';
import AppBarHeader from '../header/AppBarHeader';
import { ThemeMode } from '../../type/type';
import { TodolistsList } from '../../features/todolistsList/TodolistsList';

function App() {
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  
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
      },
    },
  });

  const memoizedTheme = useMemo(() => theme, [themeMode]);

  return (
    <div className="App">
      <ThemeProvider theme={memoizedTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 10 }}>
          <AppBarHeader changeModeHandler={changeModeHandler} />
        </Box>
        <Container fixed>
          <TodolistsList />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
