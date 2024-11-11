import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import { Switch } from '@mui/material';
import { useAppSelector } from 'common/hooks/useAppSelector';
import { useAppDispatch } from 'common/hooks/useAppDispatch';
import { selectThemeMode } from 'app/appSelectors';
import { getTheme } from 'common/theme/theme';
import { setAppThemeAC } from 'app/app-reducer';
import { MenuButton } from '../button/MenuButton';

export const AppBarHeader = () => {

  const themeMode = useAppSelector(selectThemeMode)

  const dispatch = useAppDispatch()

  const theme = getTheme(themeMode)

  const changeModeHandler = () => {
    dispatch(setAppThemeAC(themeMode === "light" ? "dark" : 'light'))
  };
  
  return (
    <AppBar position='static'>
      <Toolbar>
          <IconButton 
          size='large'
            edge='start' 
            color='inherit' 
            aria-label='menu'
          >
              <MenuIcon />
          </IconButton>
          <Typography variant='h6' component='div' sx={{flexGrow: 1}} >
              News
          </Typography>
          <MenuButton color='inherit'>Login</MenuButton>
          <MenuButton color='inherit'>Logout</MenuButton>
          <MenuButton background={theme.palette.primary.dark} color='inherit'>Faq</MenuButton>
          <Switch color='default'onChange={changeModeHandler}/>
      </Toolbar>
    </AppBar>
  )
}