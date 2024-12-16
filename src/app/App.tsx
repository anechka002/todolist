import "./App.css"
import { Box, CircularProgress, CssBaseline } from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import { ThemeProvider } from "@mui/material"
import { AppBarHeader, ErrorSnackbar } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { Routing } from "common/routing"
import { useAppDispatch } from "common/hooks"
import { useEffect } from "react"
import { initializeAppTC, selectIsInitialized } from "features/auth/model/authSlice"
import s from "./App.module.css"
import { selectStatus, selectThemeMode } from "./bll/appSlice"

function App() {
  // debugger

  const status = useAppSelector(selectStatus)
  const themeMode = useAppSelector(selectThemeMode)
  const isInitialized = useAppSelector(selectIsInitialized)

  const dispatch = useAppDispatch()

  // const memoizedTheme = useMemo(() => getTheme(themeMode), [themeMode]);
  const memoizedTheme = getTheme(themeMode)

  useEffect(() => {
    // debugger
    dispatch(initializeAppTC())
  }, [])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  return (
    <div className="App">
      <ErrorSnackbar />
      <ThemeProvider theme={memoizedTheme}>
        <CssBaseline />
        <Box sx={{ flexGrow: 1, mb: 10 }}>
          <AppBarHeader />
          {status === "loading" && <LinearProgress />}
        </Box>
        <Routing />
      </ThemeProvider>
    </div>
  )
}

export default App
