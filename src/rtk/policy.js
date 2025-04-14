import { createApi } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";

export const policyApi = createApi({
  reducerPath: "policyApi", // ✅ make it consistent
  baseQuery: axiosBaseQuery,
  tagTypes: ["policy"],
  endpoints: (builder) => ({
    policyAdd: builder.mutation({
      query: (data) => (
        {
        url: "/plocy/add",
        method: "POST",
        data,
        credentials: "include",
      }),
      invalidatesTags: ["policy"],
    }),
    
    policyEdit: builder.mutation({
      query: ({ id, titel, description }) => (
          console.log(id),
        {
        url: `/plocy/update/${id}`,
        method: "PUT",
        data: { titel, description },
        credentials: "include",
      }),
      invalidatesTags: ["policy"],
    }),

    policyAll: builder.query({
      query: () => (
          {
          url: "/plocy/all",
          method: "GET",
      }),
      providesTags: ["policy"], 
  }), 

  policyDelete:builder.mutation({
     query:({id})=>(
          console.log("rtk",id),
      {
        url:`/plocy/delete/${id}`,
        method:"DELETE"
     }),
     invalidatesTags:["policy"]
  })
  }),
});

export const {usePolicyAddMutation,usePolicyAllQuery,usePolicyDeleteMutation,usePolicyEditMutation} = policyApi;
