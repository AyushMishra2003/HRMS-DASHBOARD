import { useIsLoginQuery, useLoginApiMutation } from '../../rtk/login';
import React, { useEffect, useState } from 'react';
import { data, Outlet, useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

const ProtectedAuth = ({ isPrivate }) => {
  const { data: isLoginData, isLoading } = useIsLoginQuery();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true); // For loading indicator

  console.log(data);
  

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await isLogin();
        console.log(response);

        if (response?.data?.success) {
          console.log("✅ User is logged in.");
          if (!isPrivate) navigate("/dashboard/home", { replace: true });
        } else {
          console.log("⛔ User is not logged in.");
          if (isPrivate) navigate("/login", { replace: true });
        }
      } catch (error) {
        console.error("🚨 Error in login check:", error);
        if (isPrivate) navigate("/login", { replace: true });
      } finally {
        setLoading(false); // Loading is done
      }
    };

    checkLogin(); // Call the function
  }, []);

  if (isLoading) {
    return <div className='flex  h-[100vh] items-center justify-center'><ClipLoader/></div>
  }

  return <Outlet />; // Render child routes
};

export default ProtectedAuth;
