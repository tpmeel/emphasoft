import React, { useState, FC } from 'react'
import { useSnackbar } from 'notistack'
import {
    Grid,
    Stack,
    Typography,
    AlertTitle,
    Alert,
    Fade,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { makeRequired, makeValidate, TextField } from 'mui-rff'
import { Form } from 'react-final-form'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup'

import { FORM_FIELDS_VALIDATION_ERRORS_LOCALIZATION } from '../../../defs/validation'
import { FINAL_FORMS_SUBSCRIPTION } from '../../../defs/forms'
import { FieldName, FormData } from '../types'
import { useLoginMutation } from "../../../api/Login/Login";
import { canStepNextInWizard } from '../../../utils/forms'
import { isDefined } from '../../../utils/object'

import FormStyle from "../../../styles/formStyle";

Yup.setLocale(FORM_FIELDS_VALIDATION_ERRORS_LOCALIZATION)

const schema: Yup.Schema<FormData> = Yup.object().shape({
    [FieldName.username]: Yup.string().required(),
    [FieldName.password]: Yup.string().required(),
})

const validate = makeValidate(schema)
const required = makeRequired(schema)

const LoginForm: FC = () => {
    const theme = useTheme()
    const styles = FormStyle(theme)

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const [
        login,
        {
            isLoading,
        },
    ] = useLoginMutation()

    const [isError, setIsError] = useState<boolean>(false)

    const onSubmit = async (values: FormData) => {

        const returnedFromAPIVal = await login(values)

        if ('error' in returnedFromAPIVal) {
            setIsError(true)
        } else if (isDefined(returnedFromAPIVal.data.token)) {
            localStorage.setItem('tokenFromBackend', returnedFromAPIVal.data.token)
            setIsError(false)
            navigate('/users')
        } else {
            enqueueSnackbar('Произошла ошибка', { variant: 'error' })
        }
    }

    return (
        <Form<FormData>
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
                                    Логин пользователя
                                </Typography>
                                <TextField
                                    id={FieldName.username}
                                    sx={styles.textField}
                                    label="Логин"
                                    name={FieldName.username}
                                    required={required[FieldName.username]}
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
                            {
                                isError && !isLoading && (
                                    <Grid item xs={12}>
                                        <Fade in={isError}>
                                            <Alert severity="error" sx={styles.alert}>
                                                <AlertTitle>Ошибка</AlertTitle>
                                            </Alert>
                                        </Fade>
                                    </Grid>
                                )
                            }
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
                                Войти
                            </LoadingButton>
                        </Grid>
                    </Stack>
                )
            }}
        />
    )
}
export default LoginForm
