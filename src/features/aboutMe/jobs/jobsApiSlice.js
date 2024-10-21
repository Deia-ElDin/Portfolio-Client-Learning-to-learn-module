import { apiSlice } from '../../../app/api/apiSlice';

const JOBS_URL = 'api/v1/jobs';

const jobsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Jobs'],
  endpoints: (builder) => ({
    getAllJobs: builder.query({
      query: () => JOBS_URL,
      providesTags: ['Jobs'],
    }),

    createJob: builder.mutation({
      query: (job) => ({
        url: JOBS_URL,
        method: 'POST',
        body: job,
      }),
      invalidatesTags: ['Jobs'],
    }),

    updateJob: builder.mutation({
      query: (job) => ({
        url: `${JOBS_URL}/${job.id}`,
        method: 'PATCH',
        body: job,
      }),
      invalidatesTags: ['Jobs'],
    }),

    deleteJob: builder.mutation({
      query: (id) => ({
        url: `${JOBS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Jobs'],
    }),
  }),
});

export const {
  useGetAllJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} = jobsApiSlice;
