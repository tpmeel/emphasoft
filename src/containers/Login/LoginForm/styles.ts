import { Theme } from '@mui/material'

const loginFormStyle = (theme: Theme) => ({
    typographyLabel: {
        fontWeight: 500,
        fontSize: theme.typography.pxToRem(13),
        paddingBottom: theme.spacing(1),
        paddingTop: theme.spacing(1),
    },
    textField: {
        background: theme.palette.background.paper,
        '&  .MuiFormHelperText-root.Mui-error': {
            backgroundColor: theme.palette.background.default,
            margin: 0,
            paddingLeft: theme.spacing(1),
        },
    },
    alert: {
        marginTop: theme.spacing(3.5),
    },
    button: {
        minHeight: '50px',
        minWidth: '150px',
        marginTop: theme.spacing(3.5),
    },
})

export default loginFormStyle
