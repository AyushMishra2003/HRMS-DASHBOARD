import { useIsLoginQuery } from '../../rtk/login';
import React, { useEffect, useRef } from 'react';
import { Outlet, useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

const ProtectedAuth = ({ isPrivate, allowedRoles = [] }) => {
  const { data, isLoading } = useIsLoginQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const navigate = useNavigate();
  const redirected = useRef(false); 

  useEffect(() => {
    if (isLoading || redirected.current) return;

    const user = data?.user;
    const isLoggedIn = data?.success;

    if (isLoggedIn) {
      if (!isPrivate) {
        redirected.current = true;
        if (user?.role === "admin" || "Admin") navigate("/dashboard", { replace: true });
        else if (user?.role === "employee" || 'Employee') navigate("/employee/dashboard", { replace: true });
      } else if (!allowedRoles.includes(user?.role)) {
        redirected.current = true;
        navigate("/unauthorized", { replace: true });
      }
    } else {
      if (isPrivate) {
        redirected.current = true;
        navigate("/", { replace: true });
      }
    }
  }, [isLoading, data, isPrivate, allowedRoles, navigate]);

  if (isLoading) {
    return (
      <div className='flex h-[100vh] items-center justify-center'>
        <ClipLoader />
      </div>
    );
  }

  return <Outlet />;
};

export default ProtectedAuth;
