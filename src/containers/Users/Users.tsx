import React from 'react'

import { Grid } from "@mui/material";

import { useGetUsersQuery } from "../../api/Users/Users";
import MProgress from "../../components/MUI/MProgress/MProgress";
import UsersCard from "./UsersCard/UsersCard";

const Users: React.FC = () => {

    const {
        isFetching,
        data
    } = useGetUsersQuery()

    return (
        <Grid container>
            {isFetching && <MProgress />}
            {!isFetching && data && (
                <Grid item container spacing={3}>
                    {
                        data.map((user) => (
                            <Grid item xs={12} key={user.id}>
                                <UsersCard user={user} />
                            </Grid>
                        ))
                    }
                </Grid>
            )}
        </Grid>
    )
}
export default Users

