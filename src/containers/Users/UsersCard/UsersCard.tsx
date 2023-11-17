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
import { useNavigate } from "react-router-dom";

import { useDeleteUserMutation } from "../../../api/Users/Users";
import { IUser } from "../../../api/Users/types";

import UsersCardStyle from "./styles";
import {LoadingButton} from "@mui/lab";
import {useSnackbar} from "notistack";

interface IUsersCard {
    user: IUser
    refetch: any
}

const UsersCard: React.FC<IUsersCard> = ({
    user,
    refetch
}) => {

    const theme = useTheme()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const [
        deleteUser,
        {
            isLoading
        }
    ] = useDeleteUserMutation()

    const styles = UsersCardStyle(theme)

    const redirect = () => {
        navigate(`/users/${user.id}`)
    }

    const handleDelete = async () => {
        const returnedFromAPIVal = await deleteUser(user.id)
        if ('error' in returnedFromAPIVal) {
            enqueueSnackbar('Произошла ошибка', { variant: 'error' })
        } else {
            enqueueSnackbar('Пользователь удален', { variant: 'success' })
            refetch()
        }
    }

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
                        <Button
                            disabled={isLoading}
                            variant={'contained'}
                            onClick={redirect}
                        >
                            Редактировать пользователя
                        </Button>
                    </Box>
                    <Box sx={styles.boxInner}>
                        <LoadingButton
                            loading={isLoading}
                            variant={'outlined'}
                            color={'error'}
                            onClick={handleDelete}
                        >
                            Удалить пользователя
                        </LoadingButton>
                    </Box>
                </Box>
            </CardActions>
        </Card>
    )
}

export default UsersCard
