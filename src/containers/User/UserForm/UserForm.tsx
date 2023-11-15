import React, { FC } from "react";
import { Form } from "react-final-form";
import {
    makeRequired,
    makeValidate,
    TextField,
    Switches
} from "mui-rff";
import { LoadingButton } from "@mui/lab";
import {
    Grid,
    Stack,
    Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

import { IUser } from "../../../api/Users/types";
import { FieldName, FormData } from '../types'
import { FINAL_FORMS_SUBSCRIPTION } from "../../../defs/forms";
import { FORM_FIELDS_VALIDATION_ERRORS_LOCALIZATION } from "../../../defs/validation";
import { canStepNextInWizard } from "../../../utils/forms";
import { usePutUserMutation } from "../../../api/Users/Users";

import * as Yup from "yup";
import FormStyle from "../../../styles/formStyle";

interface IUserForm {
    isNewUser: boolean
    user?: IUser
    userId?: string
}

Yup.setLocale(FORM_FIELDS_VALIDATION_ERRORS_LOCALIZATION)

const getCharacterValidationError = (str: string) => {
    return `Как минимум один символ ${str}`;
};

const schema: Yup.Schema<FormData> = Yup.object().shape({
    [FieldName.username]: Yup.string().required(),
    [FieldName.first_name]: Yup.string(),
    [FieldName.last_name]: Yup.string(),
    [FieldName.password]: Yup.string()
        .required()
        .min(9, "Пароль должен содержать минимум 9 символов. ")
        .matches(/[0-9]/, getCharacterValidationError("- цифру. "))
        .matches(/[a-z]/, getCharacterValidationError("в нижнем регистре (латиница). "))
        .matches(/[A-Z]/, getCharacterValidationError("в верхнем регистре (латиница). ")),
    [FieldName.is_active]: Yup.boolean().required()
})

const validate = makeValidate(schema)
const required = makeRequired(schema)

const UserForm: FC<IUserForm> = ({
    isNewUser,
    user,
    userId
}) => {

    const theme = useTheme()
    const styles = FormStyle(theme)

    const { enqueueSnackbar } = useSnackbar()

    const [
        putUser,
        {
            isLoading
        }
    ] = usePutUserMutation()

    const initialValues: Partial<FormData> = user
        ? {
            [FieldName.username]: user.username,
            [FieldName.first_name]: user.first_name || '',
            [FieldName.last_name]: user.last_name || '',
            [FieldName.password]: '',
            [FieldName.is_active]: user.is_active
        }
        : {}

    const onSubmit = async (values: FormData) => {
        if (!isNewUser) {
            const returnedFromAPIVal = await putUser({ values, id: userId! })
            if ('error' in returnedFromAPIVal) {
                enqueueSnackbar('Произошла ошибка', { variant: 'error' })
            } else {
                enqueueSnackbar('Пользователь изменен', { variant: 'success' })
            }
        }
        // TODO: добавить добавление пользователя
    }

    return(
        <Form<FormData>
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={validate}
            subscription={{
                ...FINAL_FORMS_SUBSCRIPTION,
                values: true,
            }}
            render={(props) => {
                return (
                    <Stack
                        component="form"
                        spacing={1}
                        onSubmit={props.handleSubmit}
                        noValidate
                    >
                        <Grid
                            container
                            sx={{ padding: theme.spacing(3) }}
                        >
                            <Grid item xs={12}>
                                <Typography sx={styles.typographyLabel}>
                                    Username пользователя
                                </Typography>
                                <TextField
                                    id={FieldName.username}
                                    sx={styles.textField}
                                    label="Username"
                                    name={FieldName.username}
                                    required={required[FieldName.username]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={styles.typographyLabel}>
                                    Имя пользователя
                                </Typography>
                                <TextField
                                    id={FieldName.first_name}
                                    sx={styles.textField}
                                    label="Имя"
                                    name={FieldName.first_name}
                                    required={required[FieldName.first_name]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={styles.typographyLabel}>
                                    Фамилия пользователя
                                </Typography>
                                <TextField
                                    id={FieldName.last_name}
                                    sx={styles.textField}
                                    label="Фамилия"
                                    name={FieldName.last_name}
                                    required={required[FieldName.last_name]}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={styles.typographyLabel}>
                                    Пароль
                                </Typography>
                                <TextField
                                    id={FieldName.password}
                                    type="password"
                                    sx={styles.textField}
                                    label="Пароль"
                                    name={FieldName.password}
                                    required={required[FieldName.password]}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ paddingTop: theme.spacing(2) }}>
                                <Switches
                                    data={{label: 'Пользователь активен', value: false}}
                                    name={FieldName.is_active}
                                    required={required[FieldName.is_active]}
                                />
                            </Grid>
                            <LoadingButton
                                id="loginButton"
                                loading={isLoading}
                                variant="contained"
                                color="primary"
                                type="submit"
                                sx={styles.button}
                                disabled={
                                    !canStepNextInWizard(props)
                                }
                            >
                                Отправить
                            </LoadingButton>
                        </Grid>
                    </Stack>
                )
            }}
        />
    )
}

export default UserForm
