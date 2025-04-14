import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
export const logiDetail = createApi({
  reducerPath: "authApi",
  baseQuery: axiosBaseQuery,
  tagTypes: ["babu"],
  endpoints: (builder) => ({
    loginApi: builder.mutation({
      query: (data) => (
        {
        url: "/admin/login",
        method: "POST",
        data,
        credentials: "include",
      }),
      // invalidatesTags: ["userLogin"],
    }),

    isLogin: builder.query({
      query: () => ({
        url: "/admin/isLogin",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["userLogin"],
      keepUnusedDataFor: 0, // Data cache ko immediately expire karega
      refetchOnMountOrArgChange: true,
    }),

    
    isLogout: builder.mutation({
      query: () => ({
        url: "/admin/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLoginApiMutation, useIsLoginQuery, useIsLogoutMutation } =
  logiDetail;
