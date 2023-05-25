import { createApi } from '@reduxjs/toolkit/query/react';

import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';
import type { RootState } from '../store';
import { ICanvasPayload, ICanvasResponse } from '~/types/canvas';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    console.log(token);
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
    getCanvases: builder.query<ICanvasResponse[], void>({
      query: () => ({
        url: `/canvas`,
      }),
      providesTags: (result) => {
        const canvases = result || [];
        return ['Canvas', ...canvases.map(({ id }) => ({ type: 'Canvas' as const, id }))];
      },
    }),
    getCanvas: builder.query<ICanvasResponse, string>({
      query: (id: string) => ({
        url: `/canvas/${id}`,
      }),
      providesTags: (result) => [{ type: 'Canvas', id: result?.id }],
    }),
    createCanvas: builder.mutation<ICanvasResponse, ICanvasPayload>({
      query: (body) => ({
        url: `/canvas`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Canvas'],
    }),
    updateCanvas: builder.mutation<ICanvasResponse, ICanvasPayload & { id: string }>({
      query: ({ id, ...body }) => ({
        url: `/canvas/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'Canvas', id: arg.id }],
    }),
    deleteCanvas: builder.mutation<ICanvasResponse, string>({
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
  useGetCanvasQuery,
  useCreateCanvasMutation,
  useUpdateCanvasMutation,
  useDeleteCanvasMutation,
} = apiSlice;
