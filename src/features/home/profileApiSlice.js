import { apiSlice } from '../../app/api/apiSlice';

const PROFILE_URL = 'api/v1/profile';

const profileApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfilePic: builder.query({
      query: () => PROFILE_URL,
      providesTags: ['Profile'],
    }),

    createProfilePic: builder.mutation({
      query: (profile) => ({
        url: PROFILE_URL,
        method: 'POST',
        body: profile,
      }),
      invalidatesTags: ['Profile'],
    }),

    updateProfilePic: builder.mutation({
      query: (profile) => ({
        url: `${PROFILE_URL}/${profile.id}`,
        method: 'PATCH',
        body: profile,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfilePicQuery,
  useCreateProfilePicMutation,
  useUpdateProfilePicMutation,
} = profileApiSlice;
