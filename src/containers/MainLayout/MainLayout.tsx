import React from 'react'
import { Outlet } from 'react-router-dom'

import MContainer from "../../components/MUI/MContainer/MContainer";

const MainLayout: React.FC = () => {
    return (
        <MContainer>
            <Outlet />
        </MContainer>
    )
}
export default MainLayout

