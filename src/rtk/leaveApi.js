import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const leaveApi = createApi({
  reducerPath: "leave",
  baseQuery: axiosBaseQuery,
  tagTypes: ["leave"],

  endpoints: (builder) => ({
    leaveCreate: builder.mutation({
      query: ({ id, formData }) => ({
        url: `leave/add/${id}`,
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["leave"],
    }),

    leaveDelete: builder.mutation({
      query: ({ leaveId }) => ({
        url: `leave/delete/${leaveId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["leave"],
    }),

    leaveUpdate: builder.mutation({
      query: ({ id, formData }) => ({
        url: `leave/edit/${id}`,
        method: "PUT",
        data: formData,
      }),
      invalidatesTags: ["leave"],
    }),

    ApproveLeave: builder.mutation({
      query: ({id}) => ({
        url: `leave/aproved/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["leave"],
    }),

    getLeaveDetail: builder.query({
      query: () => ({
        url: "/leave/all/detal",
        method: "GET",
      }),
      providesTags: ["leave"],
    }),

    getEmployeeLeave: builder.query({
      query: () => ({
        url: "/leave/all/employee",
        method: "GET",
      }),
      providesTags: ["leave"],
    }),
   
  }),
});

export const {
  useGetEmployeeLeaveQuery,
  useGetLeaveDetailQuery,
  useLeaveCreateMutation,
  useLeaveDeleteMutation,
  useLeaveUpdateMutation,
  useApproveLeaveMutation,
} = leaveApi;