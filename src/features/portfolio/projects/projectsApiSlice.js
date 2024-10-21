import { apiSlice } from '../../../app/api/apiSlice';

const PROJECTS_URL = 'api/v1/projects';

const projectsApiSlice = apiSlice.injectEndpoints({
  tagType: ['Projects'],
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: (params) => `${PROJECTS_URL}${params}`,
      providesTags: ['Projects'],
    }),

    createProject: builder.mutation({
      query: (project) => ({
        url: PROJECTS_URL,
        method: 'POST',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),

    updateProject: builder.mutation({
      query: (project) => ({
        url: `${PROJECTS_URL}/${project.id}`,
        method: 'PATCH',
        body: project,
      }),
      invalidatesTags: ['Projects'],
    }),

    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Projects'],
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectsApiSlice;
