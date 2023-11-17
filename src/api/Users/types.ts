import { FormData } from "../../containers/User/types";

export interface IUser {
    id: UserId
    username: string
    first_name?: string
    last_name?: string
    is_active: boolean
    last_login: string
    is_superuser: boolean
}

export type UserId = number

export interface IPutUserProps {
    values: FormData
    id: string
}

export interface ICreateUserProps {
    values: FormData
}
