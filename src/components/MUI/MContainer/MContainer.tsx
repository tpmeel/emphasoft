import React, { ReactNode } from 'react'
import { Container } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MContainerStyle from "./styles";

interface IMContainer {
    children: ReactNode
}

const MContainer: React.FC<IMContainer> = ({
   children,
}) => {
    const theme = useTheme()
    const styles = MContainerStyle(theme)
    return (
        <Container
            maxWidth={false}
            disableGutters
            sx={styles.container}
        >
            {children}
        </Container>
    )
}

export default MContainer
