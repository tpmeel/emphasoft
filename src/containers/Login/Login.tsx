import React from 'react'
import {
    Grid,
    Card,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { Navigate } from "react-router-dom";

import authStyle from './styles'
import LoginForm from './LoginForm/LoginForm'
import { useIsAuthenticated } from "../../hooks/useIsAuthenticated";

const Login: React.FC = () => {
    const theme = useTheme()
    const styles = authStyle(theme)

    const {
        loggedIn,
    } = useIsAuthenticated()

    if (loggedIn) {
        console.log('You already logged in')
        return <Navigate to={'/users'} />
    }

    return (
        <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={styles.fullPage}
        >
            <Grid item lg={4} md={4} sm={8} xs={12}>
                <Card sx={styles.card}>
                    <LoginForm />
                </Card>
            </Grid>
        </Grid>
    )
}

export default Login
