import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'

import { BASE_URL } from './constants'

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
        const accessToken = localStorage.getItem('tokenFromBackend')
        if (accessToken) {
            headers.set('Authorization', `Token ${accessToken}`)
        }
        return headers
    },
})

export const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
    > = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)

    if(result?.error?.status === 401){
        console.log(result)
    }

    return result
}

export const emptySplitApi = createApi({
    baseQuery: baseQueryWithAuth,
    endpoints: () => ({}),
})
