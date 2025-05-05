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

    joinProject: builder.mutation({
      query: (id) => ({
        url: `/projects/join/${id}`,
        method: 'POST',
        credentials: 'include',
      }),
    }),
    
    approveJoinRequest: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/projects/join/approve/${id}`,
        method: 'PUT',
        body: { userId },
        credentials: 'include',
      }),
    }),

    getPendingRequests: builder.query({
      query: (id) => ({
        url: `/projects/join/pending/${id}`,
        credentials: "include",
      }),
    }),

    rejectJoinRequest: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/projects/join/reject/${id}`,
        method: "PUT",
        body: { userId },
        credentials: "include",
      }),
    }),

    getAssignableUsers: builder.query({
      query: (id) => ({
        url: `/projects/${id}/assignable-users`,
        credentials: "include", // EKLENMELİ!
      }),
    }),      
    
    
  }),
});

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useGetProjectByIdQuery,
  useGetMyProjectsQuery,
  useApproveJoinRequestMutation,
  useJoinProjectMutation,
  useGetPendingRequestsQuery,
  useRejectJoinRequestMutation,
  useGetAssignableUsersQuery
} = projectApiSlice;
