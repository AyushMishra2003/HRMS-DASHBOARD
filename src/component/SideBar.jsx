import React from 'react'
import { useState } from 'react';
import { ChevronDown, ChevronRight, LayoutDashboard, UserPlus, Rocket, Users, FileText, Clock, Calendar, Settings, Bell, Globe, MessageSquare, LogOut, Plus, ChevronLeft }
 from 'lucide-react';
import { Link } from 'react-router-dom';



const SideBar = () => {

    const [expandedNav, setExpandedNav] = useState('Employee');
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [currentPage, setCurrentPage] = useState('Dashboard');
  
    const toggleNav = (name) => {
      if (expandedNav === name) {
        setExpandedNav(null);
      } else {
        setExpandedNav(name);
      }
    };
  
    const navigateTo = (pageName) => {
      setCurrentPage(pageName);
    };
  
    const navItems = [
      { name: 'Dashboard', icon: <LayoutDashboard size={20} />, children: [] ,url:"/" },
      { name: 'Recruitment', icon: <UserPlus size={20} />, children: [], url: "/about" },
      { name: 'Onboarding', icon: <Rocket size={20} />, children: [] },
      { 
        name: 'Employee', 
        icon: <Users size={20} />, 
        children: [
          {name:'Employee List',url:"/employee/list"},
          {name:'Employee Add',url:"/employee/add"},
          {name:'Employee Attendance',url:"/employee/list"},
          {name:'Work Type',url:"/employee/work"},
          {name:'Employee Policy',url:"/employee/policy"},
         
        ] 
      },
      { name: 'Attendance', icon: <Clock size={20} />, children: [] },
      { name: 'Onboarding', icon: <Rocket size={20} />, children: [] },
    ];
    return (
        <div className='h-screen bg-gray-900'>

            <div className={`bg-gray-900 text-white ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
                {/* Company header */}
                <div className="p-4 flex items-center border-b border-gray-800">
                    <div className="bg-blue-700 p-1 rounded">
                        <span className="text-xs">CC</span>
                    </div>
                    {sidebarOpen && (
                        <div className="ml-3">
                            <p className="font-bold text-sm">Code Crafter Web Solution</p>
                            <p className="text-xs text-gray-400">Web Solutions</p>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="mt-4">
                    {navItems.map((item) => (
                        <div key={item.name}>
                            <Link to={item?.url}
                                className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-800 ${currentPage === item.name ? 'bg-blue-900' : ''}`}
                                onClick={() => {
                                    navigateTo(item.name);
                                    if (item.children.length > 0) {
                                        toggleNav(item.name);
                                    }
                                }}
                            >
                                <span className="mr-3">{item.icon}</span>
                                {sidebarOpen && (
                                    <>
                                        <span className="flex-grow">{item.name}</span>
                                        {item.children.length > 0 && (
                                            expandedNav === item.name ?
                                                <ChevronDown size={16} /> :
                                                <ChevronRight size={16} />
                                        )}
                                    </>
                                )}
                            </Link>

                            {/* Submenu */}
                            {sidebarOpen && expandedNav === item.name && item.children.length > 0 && (
                                <div className="bg-gray-800 pl-12 py-1">
                                    {item.children.map((child) => (
                                        <div
                                            key={child?.name}
                                            className={`py-2 text-sm text-gray-300 hover:text-white cursor-pointer ${currentPage === child ? 'text-white font-medium' : ''}`}
                                            onClick={() => navigateTo(child)}
                                        >
                                            <Link to={child?.url}>
                                            {child?.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>
        </div>
    )
}

export default SideBar