import { toast } from "sonner";
import axios from "axios";

export const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:6002/api/v1",
  // baseURL: "https://hr-management-codecrafter-1.onrender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
=======
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://hr-management-codecrafter-1.onrender.com/api/v1",
  // headers: {
  //   "Content-Type": "application/json",
  // },
>>>>>>> bb206d77491a9c26131ebdb75969212b5c5034a6
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
