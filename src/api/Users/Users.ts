import { emptySplitApi } from '../base'
import { IUser, UserId, IPutUserProps } from './types'

const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query<Array<IUser>, void>({
            query: () => '/v1/users',
        }),
        getUser: build.query<IUser, UserId>({
            query: (id) => `/v1/users/${id}`,
        }),
        putUser: build.mutation<IUser, IPutUserProps>({
            query: ({ values, id }) => ({
                url: `/v1/users/${id}`,
                method: 'PUT',
                body: values,
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
    usePutUserMutation
} = userApi
