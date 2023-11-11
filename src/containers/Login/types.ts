export enum FieldName {
    username = 'username',
    password = 'password',
}

export interface FormData {
    [FieldName.username]: string
    [FieldName.password]: string
}
