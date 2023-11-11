import { emptySplitApi } from '../base'
import { IUser } from './types'

const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<Array<IUser>, void>({
            query: () => '/v1/users',
        }),
        getUser: build.query<IUser, void>({
            query: (id) => `/v1/users/${id}`,
        }),
    }),
})

export const {
    endpoints: {
        getUser,
        getUsers
    },
    useGetUserQuery,
    useGetUsersQuery
} = userApi
