import { Bell, ChevronDown, Globe, MessageSquare, Settings } from 'lucide-react';
import React, { useState } from 'react'
import { useIsLogoutMutation } from '../rtk/login';
import { useNavigate } from 'react-router-dom';

const TopHeader = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const [logout]=useIsLogoutMutation()
    const navigate=useNavigate()
    
    const toggleProfileMenu = () => {
      setProfileMenuOpen(!profileMenuOpen);
    };

    const handleLogout=async()=>{
         const response=await logout()
         console.log(response);
         if(response?.data){
              navigate("/login")
         }
         
    }
  
    return (
      <header className="bg-white border-b flex justify-between items-center p-4">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="mr-4 p-1 rounded-md hover:bg-gray-200"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-md flex items-center">
            <span className="mr-1">⏱</span>
            <span>00:00:05</span>
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Settings size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              6
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Globe size={20} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <MessageSquare size={20} />
          </button>
          <div className="relative">
            <button 
              onClick={toggleProfileMenu}
              className="flex items-center hover:bg-gray-100 rounded-full p-2"
            >
              <div className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-sm font-medium">SA</span>
              </div>
              <span className="ml-2 mr-1">User</span>
              <ChevronDown size={16} />
            </button>
            
            {/* Profile Dropdown Menu */}
            {profileMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  My Profile
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Change Username
                </a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Change Password
                </a>
                <div className="border-t border-gray-100"></div>
                <button onClick={()=>handleLogout()} className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  };

export default TopHeader