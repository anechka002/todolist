import { Box, Button } from '@mui/material'
import s from './Page404.module.css'
import { Link } from 'react-router'
import { Path } from 'common/routing/Routing'

export const Page404 = () => {
  return (
    <>
      <h1 className={s.title}>404</h1>
      <h2 className={s.subTitle}>page not found</h2>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        marginTop={'20px'}
      >
        <Button variant='contained' component={Link} to={Path.Main}>на главную страницу</Button>
      </Box>
    </>
  )
}