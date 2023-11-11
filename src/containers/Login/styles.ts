import { Theme } from '@mui/material'

const authStyle = (theme: Theme) => ({
    mainGrid: {
        paddingTop: '60px',
    },
    info: {
        color: theme.palette.primary.contrastText,
        display: { xs: 'none', sm: 'none', md: 'block' },
    },
    infoTitle: {
        paddingTop: theme.spacing(1),
    },
    infoSubtitle: {
        opacity: '0.6',
        lineHeight: '1.57',
        fontSize: theme.typography.pxToRem(18),
        textAlign: 'justify',
        paddingTop: theme.spacing(1.5),
        fontWeight: 300,
    },
    card: {
        width: '100%',
        background: theme.palette.background.default,
    },
    fullPage: {
        width: '100vw',
        height: '100vh',
    },
})

export default authStyle
