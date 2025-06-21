import React, { useState, useEffect, useMemo } from 'react';
import { Search, ChevronLeft, ChevronRight, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAttendanceByMonthQuery, useAttendanceFilterQuery } from "../../rtk/attendance.js";
import { ClipLoader } from 'react-spinners';

const CalendarView = ({ currentDate, setCurrentDate, searchTerm, setSearchTerm }) => {
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  
  // API call for calendar data
  const [calendarFilter, setCalendarFilter] = useState("");
  const { data: calendarData, isLoading: calendarLoading } = useAttendanceByMonthQuery(calendarFilter);
  console.log(calendarData);

  // Update filter when month/year changes
  useEffect(() => {
    const monthStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
    setCalendarFilter(`month=${monthStr}`);
  }, [selectedYear, selectedMonth]);

  // Update currentDate when year/month selection changes
  useEffect(() => {
    const newDate = new Date(selectedYear, selectedMonth, currentDate.getDate());
    setCurrentDate(newDate);
  }, [selectedYear, selectedMonth]);

  // Process calendar data according to new structure
  const processedEmployeeData = useMemo(() => {
    if (!calendarData || !Array.isArray(calendarData)) return [];
    
    return calendarData.map(employee => ({
      id: employee.employeeId ? employee.employeeId.slice(-5) : 'N/A',
      employeeId: employee.employeeId,
      employeeName: employee.name,
      email: employee.email,
      mobile: employee.mobile,
      avatar: employee.name ? employee.name.charAt(0).toUpperCase() : 'U',
      attendance: employee.attendance || {}
    }));
  }, [calendarData]);

  // Filter employee data based on search
  const filteredEmployeeData = useMemo(() => {
    if (!searchTerm) return processedEmployeeData;
    
    return processedEmployeeData.filter(employee => {
      return employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             employee.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
             employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [processedEmployeeData, searchTerm]);

  const getCalendarStatusColor = (status) => {
    switch (status) {
      case 'P': return 'bg-green-500';
      case 'A': return 'bg-red-400';
      case 'L': return 'bg-blue-400';
      case 'WO': return 'bg-gray-400';
      case 'AN': return 'bg-orange-400';
      case 'H': return 'bg-purple-400';
      case 'WFH': return 'bg-cyan-400';
      case 'HD': return 'bg-cyan-400'; // Half Day
      case 'ACO': return 'bg-red-600'; // Auto Clock-out
      case 'LOP': return 'bg-red-500'; // Loss of Pay
      default: return 'bg-gray-100';
    }
  };

  const getDaysInMonth = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      
      days.push({
        date: i,
        day: dayName,
        dateKey: dateKey
      });
    }
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = selectedMonth + direction;
    if (newMonth < 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else if (newMonth > 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(newMonth);
    }
  };

  const days = getDaysInMonth(selectedYear, selectedMonth);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  if (calendarLoading) {
    return (
      <div className="flex justify-center h-full">
        <ClipLoader size={30} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Calendar Controls */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Name, ID, Email"
                className="border border-gray-300 rounded px-3 py-2 pl-8 text-sm w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateMonth(-1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-sm text-gray-600">Year</span>
              <select 
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={selectedYear}
                onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              >
                {Array.from({ length: 10 }, (_, i) => {
                  const year = new Date().getFullYear() - 5 + i;
                  return (
                    <option key={year} value={year}>{year}</option>
                  );
                })}
              </select>
              <button
                onClick={() => navigateMonth(1)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Month</span>
              <select 
                className="border border-gray-300 rounded px-3 py-1 text-sm"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              >
                {monthNames.map((month, index) => (
                  <option key={index} value={index}>{month}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Table with Horizontal Scroll */}
      <div className="overflow-x-auto" style={{ maxWidth: 'calc(100vw - 280px)' }}>
        <table className="w-full min-w-max">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sticky left-0 bg-gray-50 z-20 border-r border-gray-200 min-w-20">
                ID
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sticky left-20 bg-gray-50 z-20 min-w-60 border-r border-gray-200">
                Employee Name
              </th>
              {days.map((day, index) => (
                <th key={index} className="px-2 py-3 text-center text-xs font-medium text-gray-700 min-w-12">
                  <div>{day.date}</div>
                  <div className="text-gray-500">{day.day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredEmployeeData.length > 0 ? (
              filteredEmployeeData.map((employee) => (
                <tr key={employee.employeeId} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200 min-w-20">
                    {employee.id}
                  </td>
                  <td className="px-4 py-3 sticky left-20 bg-white z-10 border-r border-gray-200 min-w-60">
                    <Link to='/dashboard/employee/overview' className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
                        {employee.avatar || <User2 size={16} />}
                      </div>
                      <div>
                        <div className="text-sm text-gray-900 font-medium">{employee.employeeName}</div>
                        <div className="text-xs text-gray-500">{employee.email}</div>
                      </div>
                    </Link>
                  </td>
                  {days.map((day, index) => {
                    const attendanceStatus = employee.attendance[day.dateKey];
                    return (
                      <td key={index} className="px-2 py-3 text-center min-w-12">
                        <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                          attendanceStatus && attendanceStatus !== 'NA'
                            ? getCalendarStatusColor(attendanceStatus) + ' text-white'
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {attendanceStatus && attendanceStatus !== 'NA' ? attendanceStatus : 'NA'}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={days.length + 2} className="px-4 py-8 text-center text-gray-500">
                  {searchTerm ? 'No employees found matching your search.' : 'No attendance data available for this month.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Present (P)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-400 rounded"></div>
            <span>Absent (A)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-blue-400 rounded"></div>
            <span>Leave (L)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-400 rounded"></div>
            <span>Weekly Off (WO)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-purple-400 rounded"></div>
            <span>Holiday (H)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-cyan-400 rounded"></div>
            <span>Work From Home (WFH)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-orange-400 rounded"></div>
            <span>Anomaly (AN)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-600 rounded"></div>
            <span>Auto Clock-out (ACO)</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>LOP</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-gray-100 rounded"></div>
            <span>Not Available (NA)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;