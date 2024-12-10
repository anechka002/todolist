import React, { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { Path } from './Routing'

type Props = {
  isLoggedIn: boolean
  children: ReactNode
}

export const ProtectedRoute = ({isLoggedIn, children}: Props) => {

  if (!isLoggedIn) {
    return <Navigate to={Path.Login}/>
  }

  return <>{children}</>
}
