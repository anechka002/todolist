import React, { useMemo } from 'react';
import './App.css';
import { Box, Container, CssBaseline } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress'
import { ThemeProvider } from '@mui/material';
import AppBarHeader from '../header/AppBarHeader';
import { TodolistsList } from '../../features/todolistsList/TodolistsList';
import { ErrorSnackbar } from '../errorSnackbar/ErrorSnackbar';
import { getTheme } from '../../common/theme';
import { useAppSelector } from '../../hooks/useAppSelector';

function App() {

  const status = useAppSelector(state => state.app.status)
  const themeMode = useAppSelector(state => state.app.theme)

  const memoizedTheme = useMemo(() => getTheme(themeMode), [themeMode]);

  return (
    <div className="App">
      <ErrorSnackbar/>
      <ThemeProvider theme={memoizedTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 10 }}>
          <AppBarHeader />
        </Box>

        {status === 'loading' && <LinearProgress />}
        
        <Container fixed>
          <TodolistsList />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
