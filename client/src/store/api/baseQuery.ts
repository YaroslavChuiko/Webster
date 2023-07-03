import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
// import { logout, login } from '../slices/auth-slice';
import type { RootState } from '../store';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  credentials: 'include',
});

// const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions,
// ) => {
//   let result = await baseQuery(args, api, extraOptions);

//   if (result.error && result.error.status === 401) {
//     const refreshResult = await baseQuery(
//       {
//         url: 'auth/refresh',
//         method: 'POST',
//       },
//       api,
//       extraOptions,
//     );
//     if (refreshResult.data) {
//       api.dispatch(login(refreshResult.data));
//       result = await baseQuery(args, api, extraOptions);
//     } else {
//       api.dispatch(logout());
//     }
//   }

//   if (result.error && result.error.status === 500) {
//     return {
//       ...result,
//       error: {
//         ...result.error,
//         data: {
//           message: 'A server error occurred.',
//         },
//       },
//     };
//   }

//   return result;
// };

export default baseQuery;
