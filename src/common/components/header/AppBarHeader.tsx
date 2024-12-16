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
import { logoutTC, selectIsLoggedIn } from "features/auth/model/authSlice"
import { selectThemeMode, setAppTheme } from "app/bll/appSlice"

export const AppBarHeader = () => {
  const themeMode = useAppSelector(selectThemeMode)
  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(setAppTheme({theme: themeMode === "light" ? "dark" : "light"}))
  }

  const setLogoutHandler = () => {
    dispatch(logoutTC())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>

        {isLoggedIn && (
          <MenuButton onClick={setLogoutHandler} color="inherit">
            Logout
          </MenuButton>
        )}

        <MenuButton background={theme.palette.primary.dark} color="inherit">
          Faq
        </MenuButton>
        <Switch color="default" onChange={changeModeHandler} />
      </Toolbar>
    </AppBar>
  )
}
