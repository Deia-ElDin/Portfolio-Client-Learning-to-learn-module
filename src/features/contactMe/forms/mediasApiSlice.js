import { apiSlice } from '../../../app/api/apiSlice';

const MEDIAS_URL = 'api/v1/medias';

const mediaApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Medias'],
  endpoints: (builder) => ({
    getAllMedias: builder.query({
      query: () => MEDIAS_URL,
      providesTags: ['Medias'],
    }),

    createMedia: builder.mutation({
      query: (Media) => ({
        url: MEDIAS_URL,
        method: 'POST',
        body: Media,
      }),
      invalidatesTags: ['Medias'],
    }),

    updateMedia: builder.mutation({
      query: (Media) => ({
        url: `${MEDIAS_URL}/${Media.id}`,
        method: 'PATCH',
        body: Media,
      }),
      invalidatesTags: ['Medias'],
    }),

    deleteMedia: builder.mutation({
      query: (id) => ({
        url: `${MEDIAS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Medias'],
    }),
  }),
});

export const {
  useGetAllMediasQuery,
  useCreateMediaMutation,
  useUpdateMediaMutation,
  useDeleteMediaMutation,
} = mediaApiSlice;
