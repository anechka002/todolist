import { Main } from "app/Main"
import { Page404 } from "common/components"
import { Login } from "features/auth/ui/login/Login"
import { Route, Routes } from "react-router"
import { ProtectedRoute } from "./ProtectedRoute"
import { useAppSelector } from "common/hooks"
import { selectIsLoggedIn } from "app/appSelectors"

export const Path = {
  Main: '/',
  Login: 'login',
  NotFound: '*',
} as const

export const Routing = () => {

  const isLoggedIn = useAppSelector(selectIsLoggedIn)

  return (
    <Routes>
      
      <Route path={Path.Main} element={<ProtectedRoute isLoggedIn={isLoggedIn}><Main /></ProtectedRoute>} />
      {/* <Route path={Path.Main} element={<Main />} /> */}

      <Route path={Path.Login} element={<Login />} />
      <Route path={Path.NotFound} element={<Page404 />} />
    </Routes>
  )
}