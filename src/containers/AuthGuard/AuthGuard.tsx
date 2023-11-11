import React, { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";

type AuthGuardProps = {
  children: ReactNode
};

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const {
        loggedIn,
    } = useIsAuthenticated()

    const { pathname } = useLocation()

    if (!loggedIn) {
        return <Navigate to={'/login'} />
    }

    if (pathname === '/') {
        return <Navigate to={'/users'} />
    }

    return <>{children}</>
}

export default AuthGuard
