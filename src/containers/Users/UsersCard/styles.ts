import { Theme } from '@mui/material'

const UsersCardStyle = (theme: Theme) => ({
    card: {
        width: '100%',
        backgroundColor: theme.palette.common.white
    },
    typographyId: {
        fontSize: 14,
        color: theme.palette.text.secondary
    },
    box: {
        display: 'flex'
    },
    boxInner: {
        paddingLeft: '10px'
    }
})

export default UsersCardStyle
