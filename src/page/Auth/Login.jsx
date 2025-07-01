// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useIsLoginQuery, useLoginApiMutation } from "../../rtk/login";
// import { ClipLoader } from "react-spinners";

// const AuthLogin = () => {
//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     role: "Admin",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const [loginApi, { isLoading: LoginLoading }] = useLoginApiMutation();
//   const { data: isLoginData, isLoading } = useIsLoginQuery();

//   const handleChange = (e) => {
//     setData({ ...data, [e.target.name]: e.target.value });
//   };

//   const login = async () => {
//     try {
//       console.log(data);

//       const response = await loginApi(data).unwrap();
//       console.log("response:", response);
//       if (response.success === true) {
//         navigate("/dashboard");
//       }
//     } catch (error) {
//       console.error("Login failed:", error);
//     }
//   };

//   useEffect(() => {
//     if (isLoginData && !isLoading) {
//       navigate("/dashboard");
//     }
//   }, [isLoginData, isLoading, navigate]);

//   if (LoginLoading||isLoading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <ClipLoader color="blue" size={30} />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#f1f8ff] px-4">
//   <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-200 transition-all">
//     {/* Header */}
//     <div className="mb-6 text-center">
//       <h1 className="text-3xl font-extrabold text-gray-800 mb-1">Welcome Back 👋</h1>
//       <p className="text-gray-500 text-sm">Sign in to continue to your dashboard</p>
//     </div>

//     {/* Form */}
//     <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
//       {/* Email */}
//       <div>
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           value={data.email}
//           onChange={handleChange}
//           placeholder="you@example.com"
//           className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#075271] focus:border-[#075271] transition-all duration-200"
//         />
//       </div>

//       {/* Password */}
//       <div>
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             id="password"
//             name="password"
//             value={data.password}
//             onChange={handleChange}
//             placeholder="••••••••"
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm pr-10 focus:ring-[#075271] focus:border-[#075271] transition-all"
//           />
//           <button
//             type="button"
//             className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//             onClick={() => setShowPassword(!showPassword)}
//             aria-label="Toggle password visibility"
//           >
//             {showPassword ? (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.522 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7s-8.268-2.943-9.542-7z" />
//               </svg>
//             ) : (
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M17.94 17.94A10.06 10.06 0 0112 20C7 20 2.73 16.11 1 12a17.89 17.89 0 012.06-3.35" />
//                 <path d="M22.94 11.06A10.06 10.06 0 0012 4c-2.33 0-4.5.94-6.24 2.35" />
//                 <line x1="1" y1="1" x2="23" y2="23" />
//               </svg>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Submit */}
//       <button
//         type="button"
//         onClick={login}
//         className="w-full py-2 px-4 bg-[#075271] hover:bg-[#06425f] text-white text-sm font-medium rounded-lg shadow-md transition duration-200"
//       >
//         Sign In
//       </button>
//     </form>

//     {/* Bottom Links */}
//     <div className="mt-6 text-sm text-center text-gray-600">
//       <p>
//         Forgot your password?{" "}
//         <a href="#" className="text-[#075271] font-medium hover:underline">
//           Reset here
//         </a>
//       </p>
//       <p className="mt-2">
//         Note: Use <strong>admin/employee</strong> to login
//       </p>
//     </div>

//     {/* Footer */}
//     <div className="mt-8 text-center text-xs text-gray-400">
//       Developed by <span className="text-[#075271] font-semibold"><a href="https:codecrafter.co.in">Code Crafter Web Solutions</a></span>
//     </div>
//   </div>
// </div>

//   );
// };

// export default AuthLogin;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIsLoginQuery, useLoginApiMutation } from "../../rtk/login";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

const AuthLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [loginApi, { isLoading: LoginLoading }] = useLoginApiMutation();
  const { data: isLoginData, isLoading } = useIsLoginQuery();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const login = async () => {
    try {
      const response = await loginApi(data).unwrap();
      console.log(response);
      if (response.success) {
        localStorage.setItem("user", JSON.stringify(response.data));
        const role = response?.data?.role?.toLowerCase();

        if (role === "admin") {
          navigate("/dashboard");
        } else if (role === "employee") {
          console.log("hello");
          navigate("/employee/dashboard");
        }
      }
    } catch (error) {
      console.error("Login failed:", error);
      navigate("/");
    }
  };

  // useEffect(() => {
  //   if (!isLoading && isLoginData) {
  //     console.log(isLoginData)
  //     localStorage.setItem("user", JSON.stringify(isLoginData));
  //     if (isLoginData?.role === "Admin") navigate("/dashboard");
  //     if (isLoginData?.role === "Employee") navigate("/employee/dashboard");
  //   }
  // }, [isLoginData, isLoading, navigate]);

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Loader2 className="h-8 w-8 animate-spin text-[#075271]" />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f7feff] to-[#f8fafc] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8 md:p-10 border border-gray-200 transition-all">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-1">
            Welcome Back 👋
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue to your dashboard
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#075271] focus:border-[#075271]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-base font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#075271] focus:border-[#075271]"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={login}
            disabled={LoginLoading}
            className="w-full py-3 px-4 bg-[#075271] hover:bg-[#06425f] disabled:bg-[#075271]/70 text-white text-sm font-medium rounded-lg shadow-md flex items-center justify-center"
          >
            {LoginLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-sm text-center text-gray-600">
          <p>
            Forgot your password?{" "}
            <a href="#" className="text-[#075271] font-medium hover:underline">
              Reset here
            </a>
          </p>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          Developed by{" "}
          <span className="text-[#075271] font-semibold">
            <a href="https://codecrafter.co.in">Code Crafter Web Solutions</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthLogin;
