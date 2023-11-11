import React from "react";
import { useTheme } from "@mui/material/styles";
import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
    Box
} from "@mui/material";

import { IUser } from "../../../api/Users/types";

import UsersCardStyle from "./styles";

interface IUsersCard {
    user: IUser
}

const UsersCard: React.FC<IUsersCard> = ({ user }) => {

    const theme = useTheme()
    const styles = UsersCardStyle(theme)

    return (
        <Card sx={styles.card} elevation={3}>
            <CardContent>
                <Typography sx={styles.typographyId} gutterBottom>
                    {user.id}
                </Typography>
                <Typography variant="h5">
                    {user.username}
                </Typography>
            </CardContent>
            <CardActions>
                <Box sx={styles.box}>
                    <Box sx={styles.boxInner}>
                        <Button variant={'contained'}>
                            Редактировать пользователя
                        </Button>
                    </Box>
                    <Box sx={styles.boxInner}>
                        <Button
                            variant={'outlined'}
                            color={'error'}
                        >
                            Удалить пользователя
                        </Button>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    )
}

export default UsersCard
