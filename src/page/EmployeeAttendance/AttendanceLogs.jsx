import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Download, 
  Upload, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { useAttendanceFilterQuery } from "../../rtk/attendance.js";
import { ClipLoader } from 'react-spinners';
import TableView from './TableView.jsx'
import CalendarView from './CalendarView.jsx'

const AttendanceLogs = () => {
  const [activeView, setActiveView] = useState('table');
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [searchTerm, setSearchTerm] = useState('');
  const [showEntries, setShowEntries] = useState(10);

  const [filter, setFilter] = useState("all");
  const { data: attendanceData, isLoading } = useAttendanceFilterQuery(filter);

  const handleFilterChange = (date) => {
    const formatedDate = date.toISOString().split('T')[0];
    setFilter(`startDate=${formatedDate}&endDate=${formatedDate}`);
  };

  useEffect(() => {
    handleFilterChange(currentDate);
  }, [currentDate]);

  const isToday = currentDate.toDateString() === new Date().toDateString();

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + direction);
    setCurrentDate(newDate);
    handleFilterChange(newDate);
  };

  if (!attendanceData || isLoading) {
    return (
      <div className="flex justify-center h-[90vh]">
        <ClipLoader size={30} color="blue" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">Attendance Logs</h1>
            {/* { activeView === 'table' ? ( */}
<div className="flex items-center gap-4">
              <button
                onClick={() => navigateDate(-1)}
                className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                PREVIOUS
              </button>
              <input
                type="date"
                value={currentDate.toISOString().split('T')[0]}
                onChange={(e) => setCurrentDate(new Date(e.target.value))}
                max={new Date().toISOString().split('T')[0]} 
                className="border border-gray-300 rounded px-3 py-1 text-sm"
              />
              
              <button
                onClick={() => navigateDate(1)}
                className={`${isToday ? 'text-blue-300 cursor-not-allowed' : "text-blue-600 hover:text-blue-800"} text-sm flex items-center gap-1`}
                disabled={isToday}
              >
                NEXT
                <ChevronRight className="h-4 w-4" />
              </button>
              {isToday ? null : (
                <button
                  onClick={() => setCurrentDate(new Date())}
                  className="text-blue-500 text-sm hover:underline"
                >
                  Today
                </button>
              )}
            </div>
            {/* ):null} */} 
            
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-between">
          <div className="flex border border-gray-300 rounded">
            <button
              onClick={() => setActiveView('table')}
              className={`px-4 py-2 text-sm font-medium ${
                activeView === 'table'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setActiveView('calendar')}
              className={`px-4 py-2 text-sm font-medium ${
                activeView === 'calendar'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 py-2 pr-10 text-sm w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
            </div>
            
            <button className="bg-red-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-red-600">
              <Download className="h-4 w-4" />
              Import
            </button>
            
            <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-blue-600">
              <Upload className="h-4 w-4" />
              Export
            </button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Show</span>
              <select 
                className="border border-gray-300 rounded px-2 py-1 text-sm"
                value={showEntries}
                onChange={(e) => setShowEntries(parseInt(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
          </div>
        </div>
      </div>
<div className='w-[63rem]'>
      {/* Content */}
      {activeView === 'table' ? (
        <TableView 
          attendanceData={attendanceData}
          isLoading={isLoading}
          searchTerm={searchTerm}
          showEntries={showEntries}
        />
      ) : (
        <CalendarView 
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      )}
</div>
      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          1 to {Math.min(showEntries, attendanceData?.length || 0)} of {attendanceData?.length || 0}
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="px-3 py-1 text-sm">Page 1 of 1</span>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronRight className="h-4 w-4" />
          </button>
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AttendanceLogs;
