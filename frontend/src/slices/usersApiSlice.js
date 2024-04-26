//!This section is for the server side

import { USERS_URL } from "../constants";

//! because we have endpoint s that are dealing with asynchronous requests
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
    }),
});

export const { 
    useLoginMutation,
} = usersApiSlice;