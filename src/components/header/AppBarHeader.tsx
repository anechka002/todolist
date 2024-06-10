import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'
import MenuIcon from "@mui/icons-material/Menu";
import Typography from '@mui/material/Typography';
import {MenuButton} from '../button/MenuButton';
import { Switch } from '@mui/material';

type Props = {
  changeModeHandler: () => void
}

function AppBarHeader({changeModeHandler}: Props) {
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
                    <MenuButton color='inherit'>Faq</MenuButton>
                    <Switch color='default'onChange={changeModeHandler}/>
                </Toolbar>
            </AppBar>
  )
}

export default AppBarHeader