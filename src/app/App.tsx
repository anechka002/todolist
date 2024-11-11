import React, { useMemo } from 'react';
import './App.css';
import { Box, CssBaseline } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress'
import { ThemeProvider } from '@mui/material';
import { useAppSelector } from '../common/hooks/useAppSelector';
import { getTheme } from '../common/theme/theme';
import { ErrorSnackbar } from '../common/components/errorSnackbar/ErrorSnackbar';
import AppBarHeader from '../common/components/header/AppBarHeader';
import { selectStatus, selectThemeMode } from './appSelectors';
import { Main } from './Main';

function App() {

  const status = useAppSelector(selectStatus)
  const themeMode = useAppSelector(selectThemeMode)

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
        
        <Main/>
      </ThemeProvider>
    </div>
  );
}

export default App;
