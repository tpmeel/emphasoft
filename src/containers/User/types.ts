export enum FieldName {
    username = 'username',
    first_name = 'first_name',
    last_name = 'last_name',
    password = 'password',
    is_active = 'is_active'
}

export interface FormData {
    [FieldName.username]: string
    [FieldName.first_name]?: string
    [FieldName.last_name]?: string
    [FieldName.password]: string
    [FieldName.is_active]?: boolean
}
