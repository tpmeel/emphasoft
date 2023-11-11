import React from 'react'
import { CircularProgress, Box, Theme } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const progressStyle = (theme: Theme) => ({
    placeholder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
    circularProgress: {
        color: theme.palette.primary.main,
    },
})

const MProgress: React.FC = () => {
    const theme = useTheme()
    const styles = progressStyle(theme)

    return (
        <Box sx={styles.placeholder}>
            <CircularProgress sx={styles.circularProgress} />
        </Box>
    )
}

export default MProgress
