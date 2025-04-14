import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const attendanceDetailApi = createApi({
  reducerPath: "attendance",
  baseQuery: axiosBaseQuery,
  tagTypes: ["attendance"],

  endpoints: (builder) => ({
    employeeCheckIn: builder.mutation({
      query: (id) => ({
        url: `employee/attendance/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["attendance"],
    }),
    employeeChekOut: builder.mutation({
      query: (id) => ({
        url: `employee/attendance/logout/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["attendance"],
    }),
    employeeAllDetail:builder.mutation({
        query:(id)=>(
            console.log("rtk+++",id),
 
          {
          url:`employee/attendance/all/detail/${id}`,
          method: "GET",
        })
    })
  }),
});

export const { useEmployeeCheckInMutation, useEmployeeChekOutMutation,useEmployeeAllDetailMutation } =
  attendanceDetailApi;
