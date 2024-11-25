import './App.css';
import React, { useMemo } from 'react';
import { Box, CssBaseline } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress'
import { ThemeProvider } from '@mui/material';
import { selectStatus, selectThemeMode } from './appSelectors';
import { Main } from './Main';
import { AppBarHeader, ErrorSnackbar } from 'common/components';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getTheme } from 'common/theme/theme';

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
          {status === 'loading' && <LinearProgress />}
        </Box>
        <Main/>
      </ThemeProvider>
    </div>
  );
}

export default App;
