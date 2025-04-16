import { toast } from "sonner";
import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:6002/api/v1",
  baseURL: "https://hr-management-codecrafter-1.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

const axiosBaseQuery = async ({ url, method, data }) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      ...(data instanceof FormData
        ? { data, headers: { "Content-Type": "multipart/form-data" } } 
        : { data }),
    });
    // console.log(response);

    if (response?.data?.message) {
      toast.success(response.data.message);
    }
    return { data: method === "GET" ? response?.data?.data : response?.data };
    
  } catch (error) {
    // console.error("Request Error:", error);
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);
    return {
      error: {
        status: error.response?.status || 500,
        message: errorMessage,
      },
    };
  }
};

export default axiosBaseQuery;
