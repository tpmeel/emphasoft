import { Theme } from '@mui/material'

const MContainerStyle = (theme: Theme) => ({
    container: {
        minHeight: '100vh',
        padding: {
            lg: theme.spacing(10, 15, 20, 15),
            md: theme.spacing(10, 3, 20, 3),
            sm: theme.spacing(5, 3, 5, 3),
            xs: theme.spacing(5, 1, 5, 1),
        },
        background: '#ffffff',
    }
})

export default MContainerStyle
