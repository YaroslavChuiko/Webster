import { ICanvas, ICanvasParams, ICanvasPayload, ICanvasResponse } from '~/types/canvas';
import { apiSlice } from './api-slice';
import { setStage } from '../slices/frame-slice';

export const extendedApiSlice = apiSlice.injectEndpoints({
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
} = extendedApiSlice;
