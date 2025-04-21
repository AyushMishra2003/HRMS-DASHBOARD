import { use, useState } from 'react';
import { Bell, Calendar, MessageSquare, User, Check, X, Calendar as CalendarIcon } from 'lucide-react';
import { useUserContext } from '../UseContext/useContext.jsx';
import { useEffect } from "react";
import { useGetAttendanceDetailQuery } from '../../rtk/attendance.js';


const Dashboard=({data})=> {
  const{data:attandance,isLoading}=useGetAttendanceDetailQuery();
    //  console.log("mai ham page  pe hu",attandance?.attandanceData)

  const { setEmployeeId, setUser } = useUserContext();
  const [notices] = useState([
    { id: 1, title: "Team Meeting", content: "Monthly team meeting on Friday at 3 PM", date: "2025-04-12", priority: "high" },
    { id: 2, title: "System Maintenance", content: "Scheduled downtime on Saturday from 10 PM to 2 AM", date: "2025-04-15", priority: "medium" },
    { id: 3, title: "New Feature Release", content: "Check out our latest update with improved functionality", date: "2025-04-10", priority: "low" }
  ]);

  // Mock data for user
  const [user] = useState({
    name: data?. name ||  "Test Employee",
    phone_Number : data?.mobile || "EMP1234",
    department: "Employee",
    totalDays: 60, // Total working days in the last 2 months
    present: 52,
    absent: 5,
    leave: 3
  });

  useEffect(() => {
    if (data?.id) {
      setEmployeeId(data.id);
      setUser(data); // optional
      // console.log("✅ Employee ID set:", data.id);
    }
  }, [data]);
  // Generate attendance data for the last 2 months
  const groupByMonthYear = (data) => {
    const grouped = {};
  
    data.forEach(item => {
      const date = new Date(item.date);
      const month = date.toLocaleString('default', { month: 'long' });
      const year = date.getFullYear();
      const day = date.getDate();
  
      const key = `${month}-${year}`;
      if (!grouped[key]) {
        grouped[key] = {
          month,
          year,
          days: []
        };
      }
  
      grouped[key].days.push({
        day,
        status: item.status,
        date: item.date
      });
    });
  
    return Object.values(grouped).sort((a, b) => {
      const dateA = new Date(`${a.month} 1, ${a.year}`);
      const dateB = new Date(`${b.month} 1, ${b.year}`);
      return dateB - dateA; // latest first
    });
  };

  
  const mapAttendanceStatus = (attendanceArray) => {
    return attendanceArray.map(record => {
      let status = "absent"; // default
  
      if (record.leave === true) {
        status = "leave";
      } else if (record.isFullDay || record.isHalfDay) {
        status = "present";
      }
  
      return {
        ...record,
        status,
        date: new Date(record.createdAt).toISOString().split('T')[0] // format: yyyy-mm-dd
      };
    });
  };
  

const rawData = attandance?.attandanceData || [];
const mapped = mapAttendanceStatus(rawData);
const attendanceData = groupByMonthYear(mapped);

  

  const calculateStats = () => {
    let present = 0;
    let absent = 0;
    let leave = 0;
    let total = 0;
    
    attandance?.attandanceData.forEach(month => {
        total++
      if (month.status ==="present") present++;
        else if (month.checkIn ==false) absent++;
        else if (month.status === "status") leave++;
    });
    
    return { present, absent, leave, total };
  };

  const stats = calculateStats();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="text-blue-600" />
            <div>
              <h1 className="text-xl font-bold">{user.name}</h1>
              <p className="text-gray-500 text-sm">{user.id} | {user.department}</p>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="text-sm text-gray-600">
              Today: {new Date().toLocaleDateString("en-GB")}
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">Total Working Days</div>
              <div className="text-3xl font-bold">{stats.total}</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">Present</div>
              <div className="text-3xl font-bold text-green-600">{stats.present}</div>
              <div className="text-sm text-gray-500">{((stats.present / stats.total) * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">Absent</div>
              <div className="text-3xl font-bold text-red-600">{stats.absent}</div>
              <div className="text-sm text-gray-500">{((stats.absent / stats.total) * 100).toFixed(1)}%</div>
            </div>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="text-sm text-gray-500 mb-1">On Leave</div>
              <div className="text-3xl font-bold text-yellow-600">{stats.leave}</div>
              <div className="text-sm text-gray-500">{((stats.leave / stats.total) * 100).toFixed(1)}%</div>
            </div>
          </div>

          {/* Notice Board */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200 p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className="text-blue-600 mr-2" />
                  <h2 className="text-lg font-semibold">Notice Board</h2>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {notices.length} New
                </span>
              </div>
              <div className="p-4">
                {notices.length > 0 ? (
                  <div className="space-y-4">
                    {notices.map(notice => (
                      <div key={notice.id} className="border-l-4 p-3 bg-gray-50 rounded" 
                        style={{ 
                          borderColor: notice.priority === 'high' ? '#ef4444' : 
                                      notice.priority === 'medium' ? '#f59e0b' : '#10b981' 
                        }}>
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">{notice.title}</h3>
                          <span className="text-xs text-gray-500">{notice.date}</span>
                        </div>
                        <p className="text-gray-600 mt-1 text-sm">{notice.content}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No notices</h3>
                    <p className="mt-1 text-sm text-gray-500">No new notifications at this time.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Attendance Calendar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow h-full">
              <div className="border-b border-gray-200 p-4 flex items-center">
                <Calendar className="text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold">Monthly Attendance</h2>
              </div>
              <div className="p-4 space-y-6">
                {attendanceData.map((month, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-gray-800 mb-2">{month.month} {month.year}</h3>
                    <div className="grid grid-cols-7 gap-1">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                        <div key={i} className="text-center text-xs font-medium text-gray-500 p-1">
                          {day}
                        </div>
                      ))}
                      
                      {/* Empty cells for correct day alignment */}
                      {Array.from({ length: new Date(month.year, new Date(month.days[0]?.date).getMonth(), 1).getDay() - 1 }).map((_, i) => (
                        <div key={`empty-${i}`} className="p-1"></div>
                      ))}
                      
                      {/* Days */}
                      {Array.from({ length: new Date(month.year, new Date(month.days[0]?.date).getMonth() + 1, 0).getDate() }).map((_, i) => {
                        const day = i + 1;
                        const dayData = month.days.find(d => d.day === day);
                        
                        let bgColor = "bg-gray-100"; // Default color for weekends or no data
                        let textColor = "text-gray-400";
                        let icon = null;
                        
                        if (dayData) {
                          if (dayData.status === "present") {
                            bgColor = "bg-green-100";
                            textColor = "text-green-800";
                            icon = <Check size={12} className="mx-auto text-green-600" />;
                          } else if (dayData.status === "absent") {
                            bgColor = "bg-red-100";
                            textColor = "text-red-800";
                            icon = <X size={12} className="mx-auto text-red-600" />;
                          } else if (dayData.status === "leave") {
                            bgColor = "bg-yellow-100";
                            textColor = "text-yellow-800";
                            icon = <CalendarIcon size={12} className="mx-auto text-yellow-600" />;
                          }
                        }
                        
                        return (
                          <div key={day} className={`rounded p-1 text-center ${bgColor}`}>
                            <div className={`text-xs font-medium ${textColor}`}>{day}</div>
                            {icon}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between text-xs text-gray-500 pt-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-100 rounded mr-1"></div>
                    <span>Present</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-red-100 rounded mr-1"></div>
                    <span>Absent</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-100 rounded mr-1"></div>
                    <span>Leave</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default Dashboard