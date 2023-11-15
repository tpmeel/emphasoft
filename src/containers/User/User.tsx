import React from 'react'
import {Grid, Typography} from "@mui/material";

import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../../api/Users/Users";
import UserForm from "./UserForm/UserForm";
import MProgress from "../../components/MUI/MProgress/MProgress";

const User: React.FC = () => {

    const { userId } = useParams()

    const isNewUser = userId === 'newUser'

    const {
        isFetching,
        data
    } = useGetUserQuery(
        Number(userId),
        {
            refetchOnMountOrArgChange: true,
            skip: userId === undefined || isNewUser,
        },
    )

    return (
        <Grid
            container
            justifyContent="start"
            alignItems="flex-start"
        >
            <Grid item xs={12}>
                <Typography variant={'h3'}>
                    {isNewUser ? 'Создание пользователя': `Пользователь ${data?.username}`}
                </Typography>
            </Grid>
            <Grid item lg={6} md={6} sm={10} xs={12}>
                {isFetching && <MProgress />}
                {!isFetching && (
                    <UserForm
                        isNewUser={isNewUser}
                        userId={userId}
                        user={data}
                    />
                )}
            </Grid>
        </Grid>
    )
}
export default User

