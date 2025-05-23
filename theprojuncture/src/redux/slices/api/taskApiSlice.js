import { apiSlice } from "../apiSlice";

const TASKS_URL = "/task";

export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TASKS_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),

        getAllTask: builder.query({
            query: ({ stage="all", isTrashed, search, projectId }) => ({
                url: `${TASKS_URL}?stage=${stage}&isTrashed=${isTrashed}&search=${search}&projectId=${projectId || ""}`,
                method: "GET",
                credentials: "include",
                providesTags: ['Task'],
            }),           
        }),

        createTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/create`,
                method: "POST",
                body: data,
                credentials: "include",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
        }),

        duplicateTask: builder.mutation({
            query: (id) => ({
                url: `${TASKS_URL}/duplicate/${id}`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),

        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASKS_URL}/update/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }), 
        }),

        trashTask: builder.mutation({
            query: ({id, projectId}) => ({
                url: `${TASKS_URL}/${id}`,
                method: "PUT",
                body: { projectId },
                credentials: "include",
            }), 
        }),

        deleteRestoreTask: builder.mutation({
            query: ({ taskId, projectId }) => ({
                url: `${TASKS_URL}/delete-restore/${taskId}`,
                method: "DELETE",
                body: { projectId },
                credentials: "include",
                headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),
            invalidatesTags: ['Task'],
        }),


        createSubTask: builder.mutation({
            query: ({data,id}) => ({
                url: `${TASKS_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }), 
        }),

        getSingleTask: builder.query({
            query: (id) => ({
                url: `${TASKS_URL}/${id}`,
                method: "GET",
                credentials: "include",
            }), 
        }),

        postTaskActivity: builder.mutation({
            query: ({data, id}) => ({
                url: `${TASKS_URL}/activity/${id}`,
                method: "POST",
                body: data,
                credentials: "include",
            }), 
        }),
    }),
});

export const {useGetDashboardStatsQuery, useGetAllTaskQuery, useCreateTaskMutation, useDuplicateTaskMutation, useUpdateTaskMutation, useTrashTaskMutation, useCreateSubTaskMutation, useGetSingleTaskQuery, usePostTaskActivityMutation, useDeleteRestoreTaskMutation} = taskApiSlice;