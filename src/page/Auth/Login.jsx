import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLoginQuery, useLoginApiMutation } from "../../rtk/login";
import { ClipLoader } from "react-spinners";
import logo from "../../assets/logo.png";

const AuthLogin = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "Admin",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [loginApi, { isLoading: LoginLoading }] = useLoginApiMutation();
  const { data: isLoginData, isLoading } = useIsLoginQuery();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      console.log(data);

      const response = await loginApi(data).unwrap();
      console.log("response:", response);
      if (response.success === true) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (isLoginData && !isLoading) {
      navigate("/");
    }
  }, [isLoginData, isLoading, navigate]);

  if (LoginLoading||isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="blue" size={30} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#f1f8ff] px-4">
  <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 transition-all">
    {/* Header */}
    <div className="mb-6 text-center">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Welcome 👋</h1>
      <p className="text-gray-500 text-sm">Sign in to continue to your dashboard</p>
    </div>

    {/* Form */}
    <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#075271] focus:border-[#075271] transition-all duration-200"
        />
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-[#075271] focus:border-[#075271] transition-all"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.06 10.06 0 0112 20C7 20 2.73 16.11 1 12a17.89 17.89 0 012.06-3.35" />
                <path d="M22.94 11.06A10.06 10.06 0 0012 4c-2.33 0-4.5.94-6.24 2.35" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={login}
        className="w-full py-2 px-4 bg-[#075271] hover:bg-[#06425f] text-white text-sm font-medium rounded-lg shadow-md transition duration-200"
      >
        Sign In
      </button>
    </form>

    {/* Bottom Links */}
    <div className="mt-6 text-sm text-center text-gray-600">
      <p>
        Forgot your password?{" "}
        <a href="#" className="text-[#075271] font-medium hover:underline">
          Reset here
        </a>
      </p>
      <p className="mt-2">
        Note: Use <strong>admin/employee</strong> to login
      </p>
    </div>

    {/* Footer */}
    <div className="mt-8 text-center text-xs text-gray-400">
      Developed by <span className="text-[#075271] font-semibold">Code Crafter Web Solutions</span>
    </div>
  </div>
</div>

  
  );
};

export default AuthLogin;
