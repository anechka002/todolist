import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import MenuIcon from "@mui/icons-material/Menu"
import Typography from "@mui/material/Typography"
import { Switch } from "@mui/material"
import { useAppSelector } from "common/hooks/useAppSelector"
import { useAppDispatch } from "common/hooks/useAppDispatch"
import { getTheme } from "common/theme/theme"
import { MenuButton } from "../button/MenuButton"
import { selectIsLoggedIn, selectThemeMode, setAppTheme, setIsLoggedIn } from "app/bll/appSlice"
import { useLogoutMutation } from "features/auth/api/authApi"
import { ResultCode } from "features/todolistsList/lib/enum"
import { baseApi } from "app/baseApi"

export const AppBarHeader = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const [logout] = useLogoutMutation()

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(setAppTheme({theme: themeMode === "light" ? "dark" : "light"}))
  }

  const setLogoutHandler = () => {
    logout()
    .then((res) => {
      if (res.data?.resultCode === ResultCode.Success) {
        dispatch(setIsLoggedIn({ isLoggedIn: false }))
        localStorage.removeItem("sn-token")
        // dispatch(baseApi.util.resetApiState()) // нужно использовать с осторожностью, т.к. он зачищает абсолютно все (все данные, состояния загрузки и ошибки)
      }
    })
    .then(() => {
      dispatch(baseApi.util.invalidateTags(['Task', 'Todolist']))
    })
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          TodoList
        </Typography>

        {isLoggedIn && (
          <MenuButton onClick={setLogoutHandler} color="inherit">
            Logout
          </MenuButton>
        )}
        
        <Switch color="default" onChange={changeModeHandler} />
      </Toolbar>
    </AppBar>
  )
}
