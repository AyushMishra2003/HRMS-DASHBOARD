import React from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Clock,
  Award,
  Building,
  ChevronUp,
  ChevronDown,
  MoreVertical
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import {useGetAllEmployeeQuery } from '../rtk/employeeApi';
import { useNavigate } from 'react-router-dom';
import { useGetWeeklayCharQuery } from '../rtk/attendance';

const AdminHome = () => {
    const{data:employeeData,isLoading} =useGetAllEmployeeQuery()
    const{data:weeklyCharData,isLoading:charLoading}=useGetWeeklayCharQuery()
     const navigate=useNavigate();  
 const attendanceData = weeklyCharData || [];

     console.log("weeklyChar", weeklyCharData);
     
  // const attendanceData = [
  //   { name: 'Mon', present: 85, absent: 15 },
  //   { name: 'Tue', present: 88, absent: 12 },
  //   { name: 'Wed', present: 82, absent: 18 },
  //   { name: 'Thu', present: 90, absent: 10 },
  //   { name: 'Fri', present: 87, absent: 13 },
  //   { name: 'Sat', present: 75, absent: 25 },
  //   { name: 'Sun', present: 70, absent: 30 }
  // ];

  const performanceData = [
    { month: 'Jan', performance: 78 },
    { month: 'Feb', performance: 82 },
    { month: 'Mar', performance: 85 },
    { month: 'Apr', performance: 88 },
    { month: 'May', performance: 90 },
    { month: 'Jun', performance: 87 }
  ];

  const departmentData = [
    { name: 'Engineering', value: 45, color: '#06425F' },
    { name: 'HR', value: 15, color: '#0891b2' },
    { name: 'Sales', value: 25, color: '#06b6d4' },
    { name: 'Marketing', value: 15, color: '#67e8f9' }
  ];

  const recentActivities = [
    { id: 1, user: 'John Doe', action: 'submitted leave request', time: '2 hours ago' },
    { id: 2, user: 'Sarah Wilson', action: 'completed onboarding', time: '4 hours ago' },
    { id: 3, user: 'Mike Johnson', action: 'updated profile', time: '6 hours ago' },
    { id: 4, user: 'Emily Davis', action: 'clock out', time: '1 day ago' }
  ];

  const StatCard = ({ title, value, change, icon: Icon, positive = true }) => (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="h-5 w-5 text-[#06425F]" />
        </div>
        <div className={`flex items-center text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {positive ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          {change}%
        </div>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-1">{value}</h3>
      <p className="text-sm text-gray-600">{title}</p>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening in your organization.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title="Total Employees" 
          value="Loading..."//{employeeData?.summary?.totalEmployees}
          change="12.5" 
          icon={Users} 
        />
        <StatCard 
          title="Present Today" 
          value="827" //{employeeData?.summary?.present}
          change="8.2" 
          icon={UserCheck} 
        />
        <StatCard 
          title="On Leave" 
          value="512"   //{employeeData?.summary?.onLeave}
          change="2.4" 
          icon={Calendar} 
          positive={false}
        />
        <StatCard 
          title="Monthly Payroll" 
          value="₹45.2L" 
          change="5.7" 
          icon={DollarSign} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Attendance Chart */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Attendance</h3>
            <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Bar dataKey="present" fill="#06425F" radius={[0, 0, 0, 0]} />
              <Bar dataKey="absent" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Department Distribution */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Distribution</h3>
            <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={departmentData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {departmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {departmentData.map((dept, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: dept.color }}
                  ></div>
                  <span className="text-gray-600">{dept.name}</span>
                </div>
                <span className="font-medium text-gray-900">{dept.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Trend */}
        <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trend</h3>
            <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" fontSize={12} />
              <YAxis stroke="#666" fontSize={12} />
              <Line 
                type="monotone" 
                dataKey="performance" 
                stroke="#06425F" 
                strokeWidth={3}
                dot={{ fill: '#06425F', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-[#06425F] rounded-full mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 text-sm text-[#06425F] hover:bg-gray-50 py-2 rounded-lg transition-colors">
            View All Activities
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <button 
          onClick={()=> navigate("/dashboard/employee/add")}
          className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Users className="h-6 w-6 text-[#06425F] mb-2" />
            <span className="text-sm text-gray-700">Add Employee</span>
          </button>
          <button
          onClick={()=>navigate("/dashboard/leave/logs")} 
          className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Calendar className="h-6 w-6 text-[#06425F] mb-2" />
            <span className="text-sm text-gray-700">Leave Requests</span>
          </button>
          <button
          onClick={()=>navigate("/dashboard/attendance/list")} 
          className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Clock className="h-6 w-6 text-[#06425F] mb-2" />
            <span className="text-sm text-gray-700">Attendance</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <DollarSign className="h-6 w-6 text-[#06425F] mb-2" />
            <span className="text-sm text-gray-700">Payroll</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Award className="h-6 w-6 text-[#06425F] mb-2" />
            <span className="text-sm text-gray-700">Performance</span>
          </button>
          <button className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <Building className="h-6 w-6 text-[#06425F] mb-2" />
            <span className="text-sm text-gray-700">Departments</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;