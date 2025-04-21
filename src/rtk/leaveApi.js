import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const leaveApi = createApi({
  reducerPath: "leave",
  baseQuery: axiosBaseQuery,
  tagTypes: ["leave"],

  endpoints: (builder) => ({
    // employeeCheckIn: builder.mutation({
    //   query: (id) => ({
    //     url: `employee/attendance/checkIn/${id}`,
    //     method: "POST",
    //   }),
    //   invalidatesTags: ["attendance"],
    // }),

    getLeaveDetail: builder.query({
      query: () => ({
        url: "/leave/all/detal",
        method: "GET",
      }),
      providesTags: ["leave"],
    }),
  }),
});

export const {
  useGetLeaveDetailQuery,
  useGetAttendanceDetailQuery,
} = leaveApi;
