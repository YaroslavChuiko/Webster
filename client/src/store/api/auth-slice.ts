import { ILoginPayload, ILoginResponse, IRegisterPayload, IRegisterResponse } from '~/types/auth';
import { logout, login } from '../slices/auth-slice';
import { apiSlice } from './api-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<IRegisterResponse, IRegisterPayload>({
      query: ({ username, email, password }) => ({
        url: 'auth/sign-up',
        method: 'POST',
        body: { username, email, password },
      }),
    }),
    login: builder.mutation<ILoginResponse, ILoginPayload>({
      query: ({ email, password }) => ({
        url: 'auth/sign-in',
        method: 'POST',
        body: { email, password },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
        } catch (error) {
          // console.log(error);
        }
      },
      invalidatesTags: ['Canvas'],
    }),
    refresh: builder.mutation({
      query: () => ({
        url: 'auth/refresh',
        method: 'POST',
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data));
        } catch (error) {
          dispatch(logout());
        }
      },
    }),
    verifyEmail: builder.mutation<any, string>({
      query: (token) => ({
        url: `auth/verify-email`,
        method: 'POST',
        body: { token },
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useRefreshMutation, useVerifyEmailMutation } = extendedApiSlice;
