import { apiSlice } from '../../../app/api/apiSlice';

const SKILLS_URL = 'api/v1/skills';

const skillsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ['Skills'],
  endpoints: (builder) => ({
    getAllSkills: builder.query({
      query: () => SKILLS_URL,
      providesTags: ['Skills'],
    }),

    createSkill: builder.mutation({
      query: (skill) => ({
        url: SKILLS_URL,
        method: 'POST',
        body: skill,
      }),
      invalidatesTags: ['Skills'],
    }),

    updateSkill: builder.mutation({
      query: (skill) => ({
        url: `${SKILLS_URL}/${skill.id}`,
        method: 'PATCH',
        body: skill,
      }),
      invalidatesTags: ['Skills'],
    }),

    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `${SKILLS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Skills'],
    }),
  }),
});

export const {
  useGetAllSkillsQuery,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} = skillsApiSlice;
