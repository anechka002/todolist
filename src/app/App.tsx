import './App.css';
import { Box, CssBaseline } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress'
import { ThemeProvider } from '@mui/material';
import { selectStatus, selectThemeMode } from './appSelectors';
import { Main } from './Main';
import { AppBarHeader, ErrorSnackbar } from 'common/components';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { getTheme } from 'common/theme/theme';
import { Routing } from 'common/routing';

function App() {

  const status = useAppSelector(selectStatus)
  const themeMode = useAppSelector(selectThemeMode)

  // const memoizedTheme = useMemo(() => getTheme(themeMode), [themeMode]);
  const memoizedTheme =  getTheme(themeMode);

  return (
    <div className="App">
      <ErrorSnackbar/>
      <ThemeProvider theme={memoizedTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 10 }}>
          <AppBarHeader />
          {status === 'loading' && <LinearProgress />}
        </Box>
        <Routing/>
      </ThemeProvider>
    </div>
  );
}

export default App;
