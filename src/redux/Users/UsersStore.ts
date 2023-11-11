import { createSlice } from '@reduxjs/toolkit'

import { getUsers } from "../../api/Users/Users";
import { IUser } from "../../api/Users/types";

const makeInitialState = () => ({
    users: [] as Array<IUser>,
})

export const UsersStore = createSlice({
    name: 'users',
    initialState: makeInitialState(),
    reducers: {},
    extraReducers: (builder) => {
        builder.addMatcher(
            getUsers.matchFulfilled,
            (state, action) => {
                state.users = action.payload
            },
        )
    },
})

export default UsersStore
