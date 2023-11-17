import { emptySplitApi } from '../base'
import { IUser, UserId, IPutUserProps, ICreateUserProps } from './types'

const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<Array<IUser>, void>({
            query: () => '/v1/users',
        }),
        getUser: build.query<IUser, UserId>({
            query: (id) => `/v1/users/${id}`,
        }),
        createUser: build.mutation<IUser, ICreateUserProps>({
            query: ({ values }) => ({
                url: `/v1/users/`,
                method: 'POST',
                body: values,
            }),
        }),
        putUser: build.mutation<IUser, IPutUserProps>({
            query: ({ values, id }) => ({
                url: `/v1/users/${id}`,
                method: 'PUT',
                body: values,
            }),
        }),
        deleteUser: build.mutation<void, UserId>({
            query: (id) => ({
                url: `/v1/users/${id}`,
                method: 'DELETE',
            }),
        })
    }),
})

export const {
    endpoints: {
        getUsers
    },
    useGetUserQuery,
    useGetUsersQuery,
    useCreateUserMutation,
    usePutUserMutation,
    useDeleteUserMutation
} = userApi
