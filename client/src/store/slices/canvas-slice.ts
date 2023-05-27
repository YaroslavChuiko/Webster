import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import type { RootState } from '../store';
import { ICanvas, ICanvasParams, ICanvasPayload, ICanvasResponse } from '~/types/canvas';
import { setStage } from './frame-slice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery,
  tagTypes: ['Canvas'],
  endpoints: (builder) => ({
    getCanvases: builder.query<ICanvasResponse, ICanvasParams>({
      query: (params) => ({
        url: `/canvas`,
        params,
      }),
      providesTags: (result) => {
        const canvases = result?.canvases || [];
        return ['Canvas', ...canvases.map(({ id }) => ({ type: 'Canvas' as const, id }))];
      },
    }),
    getCanvas: builder.query<ICanvas, string>({
      query: (id: string) => ({
        url: `/canvas/${id}`,
      }),
      providesTags: (result) => [{ type: 'Canvas', id: result?.id }],
    }),
    createCanvas: builder.mutation<ICanvas, ICanvasPayload>({
      query: (body) => ({
        url: `/canvas`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Canvas'],
    }),
    updateCanvas: builder.mutation<ICanvas, ICanvasPayload & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/canvas/${id}`,
        method: 'PUT',
        body,
      }),
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setStage({ ...data }));
        } catch (err) {
          console.error(err);
        }
      },
      invalidatesTags: (_result, _error, arg) => [{ type: 'Canvas', id: arg.id }],
    }),
    deleteCanvas: builder.mutation<ICanvas, string>({
      query: (id) => ({
        url: `/canvas/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Canvas', id: arg }],
    }),
  }),
});

export const {
  useGetCanvasesQuery,
  useLazyGetCanvasQuery,
  useLazyGetCanvasesQuery,
  useGetCanvasQuery,
  useCreateCanvasMutation,
  useUpdateCanvasMutation,
  useDeleteCanvasMutation,
} = apiSlice;
