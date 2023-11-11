import React from 'react'
import { useRoutes } from "react-router-dom";

import Login from "../containers/Login/Login";
import AuthGuard from "../containers/AuthGuard/AuthGuard";
import MainLayout from "../containers/MainLayout/MainLayout";
import Users from "../containers/Users/Users";

const Router = () => {
    return useRoutes([
        {
            path: '/',
            element: (
                <AuthGuard>
                    <MainLayout />
                </AuthGuard>
            ),
            children: [
                {
                    path: 'users',
                    element: <Users />,
                },
            ],
        },
        {
            path: 'login',
            element: (
                <Login />
            ),
        },
    ])
}

export default Router
