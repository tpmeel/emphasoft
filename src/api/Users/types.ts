export interface IUser {
    id: number
    username: string
    first_name: string
    last_name: string
    is_active: boolean
    last_login: string
    is_superuser: boolean
}

export interface ILoginProps {
    username: string
    password: string
}
