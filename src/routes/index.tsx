import React from 'react'
import { useRoutes } from "react-router-dom";

import Login from "../containers/Login/Login";
import AuthGuard from "../containers/AuthGuard/AuthGuard";
import MainLayout from "../containers/MainLayout/MainLayout";
import Users from "../containers/Users/Users";
import User from "../containers/User/User";

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
                {
                    path: 'users/:userId',
                    element: <User />,
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
