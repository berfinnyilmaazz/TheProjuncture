import { apiSlice } from "../apiSlice";

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    getAllProjects: builder.query({
      query: () => '/projects',
    }),
    getProjectById: builder.query({
      query: (id) => `/projects/${id}`,
    }),
    getMyProjects: builder.query({
      query: () => ({
        url: '/projects/mine',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useGetMyProjectsQuery,
} = projectApiSlice;
