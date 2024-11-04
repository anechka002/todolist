import { createTheme } from "@mui/material/styles";
import { RequestThemeType } from "../components/app/app-reducer";

export const getTheme = (themeMode: RequestThemeType) => createTheme({
  palette: {
    mode: themeMode,
    // mode: themeMode === 'light' ? 'light' : 'dark',
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