import { useIsLoginQuery, useLoginApiMutation } from '../../rtk/login';
import React, { useEffect, useState } from 'react';
import { data, Outlet, useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

const ProtectedAuth = ({ isPrivate }) => {
  const { data, isLoading, refetch } = useIsLoginQuery();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // For loading indicator

  

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await refetch(); // 🛠️ This triggers fresh API call
        if (response?.data?.success) {
          console.log("✅ User is logged in.");
          if (!isPrivate) navigate("/dashboard", { replace: true });
        } else {
          // console.log("⛔ User is not logged in.");
          if (isPrivate) navigate("/login", { replace: true });
        }
      } catch (error) {
        if (isPrivate) navigate("/login", { replace: true });
      } finally {
        setLoading(false);
      }
    };
  
    checkLogin();
  }, [refetch]);
  
  if (isLoading) {
    return <div className='flex  h-[100vh] items-center justify-center'><ClipLoader/></div>
  }

  return <Outlet />; // Render child routes
};

export default ProtectedAuth;
