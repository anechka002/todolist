import "./App.css"
import { Box, CircularProgress, CssBaseline } from "@mui/material"
import LinearProgress from "@mui/material/LinearProgress"
import { ThemeProvider } from "@mui/material"
import { AppBarHeader, ErrorSnackbar } from "common/components"
import { useAppSelector } from "common/hooks/useAppSelector"
import { getTheme } from "common/theme/theme"
import { Routing } from "common/routing"
import { useEffect, useState } from "react"
import s from "./App.module.css"
import { selectStatus, selectThemeMode, setIsLoggedIn } from "./bll/appSlice"
import { useMeQuery } from "features/auth/api/authApi"
import { useAppDispatch } from "common/hooks"
import { ResultCode } from "features/todolistsList/lib/enum"

function App() {
  const status = useAppSelector(selectStatus)
  const themeMode = useAppSelector(selectThemeMode)

  const [isInitialized, setIsInitialized] = useState(false)

  const dispatch = useAppDispatch()

  const {data,isLoading} = useMeQuery()

  useEffect(() => {
    if(!isLoading) {
      setIsInitialized(true)
      if (data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: true }))
      }
    }
  }, [isLoading, data])

  if (!isInitialized) {
    return (
      <div className={s.circularProgressContainer}>
        <CircularProgress size={150} thickness={3} />
      </div>
    )
  }

  const memoizedTheme = getTheme(themeMode)

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
