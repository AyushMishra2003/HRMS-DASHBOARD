import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIsLoginQuery, useLoginApiMutation } from '../../rtk/login';
import { ClipLoader } from 'react-spinners';
import logo from '../../assets/logo.png'

const AuthLogin = () => {
  const [data, setData] = useState({ 
    email: '', 
    password: '', 
    role: 'Admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginApi] = useLoginApiMutation();
  const { data: isLoginData, isLoading } = useIsLoginQuery();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
        console.log(data);
        
      const response = await loginApi(data).unwrap();
      console.log('response:', response);
      if (response.success === true) {
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  useEffect(() => {
    if (isLoginData && !isLoading) {
      navigate('/');
    }
  }, [isLoginData, isLoading, navigate]);

  if (isLoading || isLoginData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="blue" size={30} />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-lg border">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Sign In</h1>
        <p className="text-center text-gray-500 mb-6">Please login to access the dashboard.</p>
        
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* Username Field */}
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder=""
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="••••••"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  {showPassword ? (
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" fillRule="evenodd" clipRule="evenodd" />
                  ) : (
                    <path d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" fillRule="evenodd" clipRule="evenodd" />
                  )}
                </svg>
              </button>
            </div>
          </div>
          
          {/* Login Button */}
          <button
            type="button"
            onClick={login}
            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secure Sign-In
          </button>
        </form>
        
        {/* Help Text */}
        <div className="mt-6">
          <p className="text-center text-gray-500 text-sm">
            Note: You can use the username 'admin' and password 'admin' to log in.
          </p>
          <div className="text-center mt-2">
            <a href="#" className="text-sm text-red-500 hover:text-red-600">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
      
      {/* Logo */}
      <div className="mt-8">
         <p>Developed By:Code Crafter Web Solutions</p>
      </div>
    </div>
  );
};

export default AuthLogin;