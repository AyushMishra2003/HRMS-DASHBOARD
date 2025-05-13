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
      query: (id) => (
        console.log("mai to rtk huy",id),
        
        {
        url: `/notification/isReade/${id}`,
        method: "GET", // or POST if your backend supports it
      }),
      invalidatesTags: ["notification"], // optional: to refetch updated notifications
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsReadNotificationMutation } =
  notificationApi;
