import {
  Bell,
  ChevronDown,
  Globe,
  MessageSquare,
  Settings,
  Menu,
  Clock,
  LogIn,
  LogOut,
  User
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useIsLogoutMutation } from "../rtk/login";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../page/UseContext/useContext.jsx";
import {
  useEmployeeCheckInMutation,
  useEmployeeChekOutMutation,
  useGetAttendanceDetailQuery,
} from "../rtk/attendance.js";
import { useGetEmployeeProfileQuery } from "../rtk/employeeApi.js";
import { ClipLoader } from "react-spinners";
import { ischeck } from "../helper/SweetAlrertIsConfirm.jsx";

const TopHeader = () => {
  const { employeeId, user } = useUserContext();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [buttonStatus, setButtonStatus] = useState(true);
  const [logout] = useIsLogoutMutation();
  const [employeeCheckIn, { isLoading, isError, isSuccess }] =
    useEmployeeCheckInMutation();
  const { data, isLoading: isProfileLoading } = useGetEmployeeProfileQuery();
  const { data: attandanceData, isLoading: attendanceLoading, error } = 
    useGetAttendanceDetailQuery();
  const [employeeCheckOut, { isLoading: chekOutLoading }] =
    useEmployeeChekOutMutation();
  const [timer, setTimer] = useState(0); // in seconds
  const [intervalId, setIntervalId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!attandanceData?.todayData?.checkIn == false) {
      setButtonStatus(false);
    }
    if (attandanceData?.todayData?.loginTime && intervalId === null && !attandanceData?.todayData?.logoutTime) {
      getSecondDifferenc();
    }
    if(attandanceData?.todayData?.logoutTime){
      totalTimeActive();
    }
  }, [attandanceData]);

  const getSecondDifferenc = async () => {
    const now = new Date(); // current date-time
    const createdAt = new Date(attandanceData?.todayData?.loginTime);
    setTimer(Math.floor((now - createdAt) / 1000)); 
    startTimer();
  }

  const totalTimeActive = async () => {
    const now = new Date(attandanceData?.todayData?.logoutTime); // current date-time
    const createdAt = new Date(attandanceData?.todayData?.loginTime);
    setTimer(Math.floor((now - createdAt) / 1000)); 
  }

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = async () => {
    const response = await logout();
    if (response?.data) {
      navigate("/login");
    }
  };

  const checkInButton = async () => {
    const response = await employeeCheckIn(employeeId);
    if(response.data.success){
      startTimer();
    }
  };

  const checkOutButton = async () => {
    const confirmed = await ischeck();
    if (confirmed) {
      const response = await employeeCheckOut(employeeId);
      if(response.data.success){
        stopTimer(); 
      }
    }
  };

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const startTimer = () => {
    if (intervalId !== null) return;
    const id = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  // Get first initial and last initial for avatar
  const getInitials = () => {
    if (data?.employee?.firstName && data?.employee?.lastName) {
      return `${data.employee.firstName[0]}${data.employee.lastName[0]}`;
    }
    return "US"; // Default
  };

  if (isProfileLoading || attendanceLoading || isLoading || chekOutLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="#3b82f6" size={40} />
      </div>
    );
  }

  return (
    <header className="bg-white border-b shadow-sm flex justify-between items-center px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-xl font-semibold text-gray-800 hidden md:block">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-3">
        {/* Time Tracker with Visual Improvements */}
        <div className="flex items-center rounded-lg overflow-hidden border border-gray-200 shadow-sm">
          {buttonStatus ? (
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 flex items-center font-medium transition-colors"
              onClick={checkInButton}
              disabled={isLoading}
            >
              <LogIn size={16} className="mr-1" />
              <span>Check In</span>
            </button>
          ) : (
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 flex items-center font-medium transition-colors"
              onClick={checkOutButton}
              disabled={chekOutLoading}
            >
              <LogOut size={16} className="mr-1" />
              <span>Check Out</span>
            </button>
          )}
          
          <div className="bg-gray-50 px-4 py-2 flex items-center border-l border-gray-200">
            <Clock size={16} className="text-green-600 mr-2" />
            <span className="font-mono text-green-600 font-medium">{formatTime(timer)}</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="hidden md:flex items-center space-x-1">
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Settings size={18} />
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 relative transition-colors">
            <Bell size={18} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <Globe size={18} />
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors">
            <MessageSquare size={18} />
          </button>
        </div>
        
        {/* Profile Menu */}
        <div className="relative">
          <button
            onClick={toggleProfileMenu}
            className="flex items-center hover:bg-gray-50 rounded-full py-1 pl-2 pr-3 border border-transparent hover:border-gray-200 transition-colors"
          >
            <div className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center">
              <span className="text-sm font-semibold">{getInitials()}</span>
            </div>
            <span className="ml-2 mr-1 font-medium text-gray-700 hidden sm:block">
              {data?.employee?.firstName || "User"}
            </span>
            <ChevronDown size={16} className="text-gray-500" />
          </button>

          {/* Profile Dropdown Menu */}
          {profileMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-10 py-1 border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                <p className="text-sm font-medium text-gray-900">{data?.employee?.firstName} {data?.employee?.lastName}</p>
                <p className="text-xs text-gray-500 truncate">{data?.employee?.email || user?.email}</p>
              </div>
              
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <User size={16} className="mr-3 text-gray-500" />
                My Profile
              </a>
              
              <a href="#" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                <Settings size={16} className="mr-3 text-gray-500" />
                Settings
              </a>
              
              <div className="border-t border-gray-100 my-1"></div>
              
              <button
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut size={16} className="mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopHeader;