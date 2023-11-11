import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { BASE_URL } from "../constants";
import { emptySplitApi } from '../base'
import { ILoginResponse, ILoginProps } from './types'

const authBaseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

const userApi = emptySplitApi.injectEndpoints({
    endpoints: (build) => ({
        login: build.mutation<ILoginResponse, ILoginProps>({
            queryFn: async (
                values,
                sys,
            ) => {
                return (authBaseQuery(
                    {
                        url: '/v1/login/',
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
                        body: values,
                    },
                    sys,
                    {},
                ) as any)
            },
        }),
    }),
})

export const {
    endpoints: {
        login
    },
    useLoginMutation
} = userApi
