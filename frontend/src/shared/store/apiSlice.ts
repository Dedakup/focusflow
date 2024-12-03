// Centralized RTK Query API slice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { useAuth0 } from '@auth0/auth0-react';
import { setAuth } from '@auth';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { RootState } from '@store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseQueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        const { getAccessTokenSilently } = useAuth0();
        const token = await getAccessTokenSilently();
        api.dispatch(setAuth({ token }));
        result = await baseQuery(args, api, extraOptions);
    }

    return result;
};

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
        getProfile: builder.query({
            query: () => '/profile',
        }),
    }),
});

export const { useGetProfileQuery } = apiSlice;
