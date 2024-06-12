import React from 'react'
import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type Props = {
  background?: string
}

export const MenuButton = styled(Button)<Props>(({background, theme}) => ({
  minWidth: '110px',
  fontWeight: 'bold',
  boxShadow: `0 0 0 2px ${theme.palette.primary.dark}, 4px 4px 0 0 ${theme.palette.primary.dark}`,
  borderRadius: '2px',
  textTransform: 'capitalize',
  margin: '0 10px',
  padding: '8px 24px',
  color: theme.palette.primary.contrastText,
  background: background ||theme.palette.primary.light,
}))

//---------------------------------------------------------------
// export const MenuButton = styled(Button)({
//     minWidth: '110px',
//     fontWeight: 'bold',
//     boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
//     borderRadius: '2px',
//     textTransform: 'capitalize',
//     margin: '0 10px',
//     padding: '8px 24px',
//     color: '#ffffff',
//     background: '#1565c0',
// })