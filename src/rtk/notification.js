import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const notificationApi = createApi({
  reducerPath: "notification",
  baseQuery: axiosBaseQuery,
  tagTypes: ["notification"],

  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: "/notification/all",
        method: "GET",
      }),
      providesTags: ["notification"],
    }),

    // notificationApi.js
    markAsReadNotification: builder.mutation({
      query: ({id}) => (
        {
        url: `/notification/isReade/${id}`,
        method: "GET", 
      }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: ({id}) => (
        {
        url: `/notification/delete/${id}`,
        method: "DELETE", 
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsReadNotificationMutation , useDeleteNotificationMutation } =
  notificationApi;
