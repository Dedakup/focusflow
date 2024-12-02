// Centralized RTK Query API slice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: () => '/posts',
        }),
        createPost: builder.mutation({
            query: (newPost) => ({
                url: '/posts',
                method: 'POST',
                body: newPost,
            }),
        }),
    }),
});

export const { useGetPostsQuery, useCreatePostMutation } = apiSlice;
