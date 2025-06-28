import { toast } from "sonner";
import axios from "axios";
const backend_url = import.meta.env.VITE_BACKEND_URL
export const axiosInstance = axios.create({
  baseURL: backend_url || "http://localhost:6002/api/v1",
  // baseURL: backend_url || "https://hr-management-codecrafter-1.onrender.com/api/v1",
  // headers: {
  //   "Content-Type": "application/json",
  // },
  withCredentials: true, 
});

const axiosBaseQuery = async ({ url, method, data }) => {
  try {
    const response = await axiosInstance({
      url,
      method,
      ...(data instanceof FormData
  ? {
      data,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  : { data }),
    });

    if (response?.data?.message) {
      // toast.success(response.data.message);
    }
    return { data: method === "GET" ? response?.data?.data : response?.data };
    
  } catch (error) {
      if(error.status===401){
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
      }else{
        const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
        // toast.error(errorMessage);
      }
      const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    return {
      error: {
        status: error.response?.status || 500,
        message: errorMessage,
      },
    };
  }
};

export default axiosBaseQuery;
