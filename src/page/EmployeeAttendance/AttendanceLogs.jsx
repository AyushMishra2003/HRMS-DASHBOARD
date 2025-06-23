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
















// import React, { useEffect, useState } from 'react';
// import { 
//   Search, 
//   Download, 
//   Upload, 
//   ChevronDown, 
//   ChevronLeft, 
//   ChevronRight,
//   Calendar,
//   Users,
//   User2
// } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useAttendanceFilterQuery } from "../../rtk/attendance.js";
// import { ClipLoader } from 'react-spinners';

// const AttendanceLogs = () => {
//   const [activeView, setActiveView] = useState('table');
//   const [currentDate, setCurrentDate] = useState(new Date()); 
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showEntries, setShowEntries] = useState(10);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [selectedGrade, setSelectedGrade] = useState('');
//   const [selectedLocation, setSelectedLocation] = useState('');
//   const [selectedManager, setSelectedManager] = useState('');
//   const [selectedStatus, setSelectedStatus] = useState('');

//   console.log(currentDate)

//  const [filter, setFilter] = useState("all");
//     const { data : attendanceData, isLoading } = useAttendanceFilterQuery(filter);
// console.log(filter)

//     const handleFilterChange = (date) =>{
//       const formatedDate = date.toISOString().split('T')[0]
//       setFilter(`startDate=${formatedDate}&endDate=${formatedDate}`)
//     }

// useEffect(()=>{
//   handleFilterChange(currentDate)
// },[currentDate])

// const isToday = currentDate.toDateString() === new Date().toDateString();

//   // Sample attendance data
//   // const attendanceData = [
//   //   {
//   //     id: 5,
//   //     employeeName: '4urjet',
//   //     status: 'A',
//   //     inTime: '--',
//   //     outTime: '--',
//   //     workDuration: '--',
//   //     department: 'IT',
//   //     grade: 'A',
//   //     location: 'Mumbai',
//   //     manager: 'John Doe',
//   //     avatar: 'J'
//   //   },
//   //   {
//   //     id: 4,
//   //     employeeName: 'Ashish Singh',
//   //     status: 'A',
//   //     inTime: '--',
//   //     outTime: '--',
//   //     workDuration: '--',
//   //     department: 'HR',
//   //     grade: 'B',
//   //     location: 'Delhi',
//   //     manager: 'Jane Smith',
//   //     avatar: 'AS'
//   //   },
//   //   {
//   //     id: 'codc...',
//   //     employeeName: 'Ayush',
//   //     status: 'A',
//   //     inTime: '--',
//   //     outTime: '--',
//   //     workDuration: '--',
//   //     department: 'IT',
//   //     grade: 'A',
//   //     location: 'Mumbai',
//   //     manager: 'John Doe',
//   //     avatar: 'A'
//   //   },
//   //   {
//   //     id: 3,
//   //     employeeName: 'Jitendra chauhan',
//   //     status: 'A',
//   //     inTime: '--',
//   //     outTime: '--',
//   //     workDuration: '--',
//   //     department: 'Sales',
//   //     grade: 'C',
//   //     location: 'Pune',
//   //     manager: 'Mike Johnson',
//   //     avatar: 'J'
//   //   },
//   //   {
//   //     id: 2,
//   //     employeeName: 'Suresh Singh',
//   //     status: 'A',
//   //     inTime: '--',
//   //     outTime: '--',
//   //     workDuration: '--',
//   //     department: 'Marketing',
//   //     grade: 'B',
//   //     location: 'Bangalore',
//   //     manager: 'Sarah Wilson',
//   //     avatar: 'S'
//   //   }
//   // ];

//   // Calendar data for June 2025
//   const calendarData = [
//     {
//       id: 5,
//       employeeName: '4urjet',
//       avatar: 'J',
//       attendance: {
//         16: 'A', 17: 'A', 18: 'A'
//       }
//     },
//     {
//       id: 'codc...',
//       employeeName: 'Ayush',
//       avatar: 'A',
//       attendance: {
//         10: 'A', 11: 'A', 12: 'AN', 13: 'AN', 14: 'A', 15: 'WO', 16: 'WO', 17: 'P', 18: 'NA'
//       }
//     },
//     {
//       id: 2,
//       employeeName: 'Suresh Singh',
//       avatar: 'SS',
//       attendance: {
//         10: 'A', 11: 'A', 12: 'A', 13: 'A', 14: 'A', 15: 'WO'
//       }
//     },
//     {
//       id: 3,
//       employeeName: 'Jitendra chauhan',
//       avatar: 'JC',
//       attendance: {
//         10: 'A', 11: 'A', 12: 'A', 13: 'A', 14: 'A', 15: 'WO'
//       }
//     },
//     {
//       id: 4,
//       employeeName: 'Ashish Singh',
//       avatar: 'AS',
//       attendance: {
//         10: 'A', 11: 'A', 12: 'AN', 13: 'A', 14: 'A', 15: 'WO'
//       }
//     }
//   ];

//  const statusCounts = attendanceData.reduce((acc, cur) => {
//   const status = cur.status;
//   if (status === 'P') acc.present++;
//   else if (status === 'A') acc.absent++;
//   else if (status === 'L') acc.leave++;
//   else if (status === 'AN') acc.anomaly++;
//   return acc;
// }, { present: 0, absent: 0, leave: 0, anomaly: 0 });

//   const getStatusColor = (status) => {
//     switch (status) {
//       case 'P': return 'bg-green-100 text-green-800';
//       case 'A': return 'bg-red-100 text-red-800';
//       case 'L': return 'bg-blue-100 text-blue-800';
//       case 'WO': return 'bg-gray-100 text-gray-800';
//       case 'AN': return 'bg-orange-100 text-orange-800';
//       case 'H': return 'bg-purple-100 text-purple-800';
//       case 'WFH': return 'bg-cyan-100 text-cyan-800';
//       default: return 'bg-gray-50 text-gray-400';
//     }
//   };

//   const getCalendarStatusColor = (status) => {
//     switch (status) {
//       case 'P': return 'bg-green-500';
//       case 'A': return 'bg-red-400';
//       case 'L': return 'bg-blue-400';
//       case 'WO': return 'bg-gray-400';
//       case 'AN': return 'bg-orange-400';
//       case 'H': return 'bg-purple-400';
//       case 'WFH': return 'bg-cyan-400';
//       default: return 'bg-gray-100';
//     }
//   };

//   const getDaysInMonth = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const daysInMonth = lastDay.getDate();
    
//     const days = [];
//     for (let i = 1; i <= daysInMonth; i++) {
//       const currentDate = new Date(year, month, i);
//       const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'short' });
//       days.push({
//         date: i,
//         day: dayName
//       });
//     }
//     return days;
//   };

//   const formatDate = (date) => {
//     // return date.toLocaleDateString('en-GB');
//     return date.toISOString().split('T')[0]
//   };



//   const navigateDate = (direction) => {
//     console.log('hit hua')
//     const newDate = new Date(currentDate);
//     newDate.setDate(newDate.getDate() + direction);
//     setCurrentDate(newDate);
//     console.log(currentDate)
//      handleFilterChange(newDate);
//   };

//   const navigateMonth = (direction) => {
//     const newDate = new Date(currentDate);
//     newDate.setMonth(newDate.getMonth() + direction);
//     setCurrentDate(newDate);
//   };

//   const TableView = () => (
//     <div className="bg-white rounded-lg">
//       {/* Filters */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex flex-wrap gap-4 mb-4">
//           <div className="flex items-center gap-2">
//             <select 
//               className="border border-gray-300 rounded px-3 py-1 text-sm"
//               value={selectedDepartment}
//               onChange={(e) => setSelectedDepartment(e.target.value)}
//             >
//               <option value="">Department</option>
//               <option value="IT">IT</option>
//               <option value="HR">HR</option>
//               <option value="Sales">Sales</option>
//               <option value="Marketing">Marketing</option>
//             </select>
//             <ChevronDown className="h-4 w-4 text-gray-400" />
//           </div>

//           <div className="flex items-center gap-2">
//             <select 
//               className="border border-gray-300 rounded px-3 py-1 text-sm"
//               value={selectedGrade}
//               onChange={(e) => setSelectedGrade(e.target.value)}
//             >
//               <option value="">Grade</option>
//               <option value="A">A</option>
//               <option value="B">B</option>
//               <option value="C">C</option>
//             </select>
//             <ChevronDown className="h-4 w-4 text-gray-400" />
//           </div>

//           <div className="flex items-center gap-2">
//             <select 
//               className="border border-gray-300 rounded px-3 py-1 text-sm"
//               value={selectedLocation}
//               onChange={(e) => setSelectedLocation(e.target.value)}
//             >
//               <option value="">Location</option>
//               <option value="Mumbai">Mumbai</option>
//               <option value="Delhi">Delhi</option>
//               <option value="Pune">Pune</option>
//               <option value="Bangalore">Bangalore</option>
//             </select>
//             <ChevronDown className="h-4 w-4 text-gray-400" />
//           </div>

//           <div className="flex items-center gap-2">
//             <select 
//               className="border border-gray-300 rounded px-3 py-1 text-sm"
//               value={selectedManager}
//               onChange={(e) => setSelectedManager(e.target.value)}
//             >
//               <option value="">Manager Name</option>
//               <option value="John Doe">John Doe</option>
//               <option value="Jane Smith">Jane Smith</option>
//               <option value="Mike Johnson">Mike Johnson</option>
//             </select>
//             <ChevronDown className="h-4 w-4 text-gray-400" />
//           </div>

//           <div className="flex items-center gap-2">
//             <select 
//               className="border border-gray-300 rounded px-3 py-1 text-sm"
//               value={selectedStatus}
//               onChange={(e) => setSelectedStatus(e.target.value)}
//             >
//               <option value="">Status</option>
//               <option value="P">Present</option>
//               <option value="A">Absent</option>
//               <option value="L">Leave</option>
//               <option value="WO">Weekly Off</option>
//             </select>
//             <ChevronDown className="h-4 w-4 text-gray-400" />
//           </div>

//           <div className="flex items-center gap-2 ml-auto">
//             <span className="text-sm text-gray-600">Sort By:</span>
//             <select className="border border-gray-300 rounded px-3 py-1 text-sm">
//               <option value="">Select</option>
//               <option value="name">Name</option>
//               <option value="id">ID</option>
//               <option value="status">Status</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       {isLoading || !attendanceData ? (
//         <div className="flex justify-center h-full">
//           <ClipLoader size={30} />
//         </div>
//       ) : 
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               {/* <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">SRN</th> */}
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">ID</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Employee Name</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Status</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">In Time</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Out Time</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Work Duration</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Number</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {attendanceData.map((employee,i) => (
//               <tr key={employee._id} className="hover:bg-gray-50">
//                 {/* <td className="px-4 py-3 text-sm  overflow-ellipsis text-gray-900">{i + 1}</td> */}
//                 <td className="px-4 py-3 text-sm  overflow-ellipsis text-gray-900">{employee._id.slice(-5)}</td>
//                 <td className="px-4 py-3">
//                   <Link to='/dashboard/employee/overview' className="flex items-center">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
//                       {employee.avatar || <User2/>}
//                     </div>
//                     <span className="text-sm text-gray-900">{employee.employee.name}</span>
//                   </Link>
//                 </td>
//                 <td className="px-4 py-3">
//                   <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(employee.status)}`}>
//                     {employee.status}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 text-sm text-gray-900">{employee.checkIn || '--'}</td>
//                 <td className="px-4 py-3 text-sm text-gray-900">{employee.checkOutTime || '--'}</td>
//                 <td className="px-4 py-3 text-sm text-gray-900">{employee.workDuration}</td>
//                 <td className="px-4 py-3 text-sm text-gray-900">{employee.employee.mobile}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
// }
//       {/* Status Summary */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="flex flex-wrap gap-4 text-sm">
//           <div className="flex items-center">
//             <span className="text-gray-600">* Status Legend:</span>
//           </div>
//           <div className="flex items-center">
//             <span className="text-gray-600">P: Present, A: Absent, L: Leave, WO: Weekly off, H: Holiday, HL: Half day leave, WFH: Work From Home, AN: Anomaly, AC: Auto Clock-out</span>
//           </div>
//         </div>
//         <div className="text-sm text-gray-600 mt-2">
//           Out time will be the same as the last punch time in cases of Auto Clock-out and odd number of punch timings
//         </div>
//         <div className="flex gap-6 mt-4">
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-green-500 rounded"></div>
//             <span className="text-sm">Present</span>
//             <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.present}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-red-500 rounded"></div>
//             <span className="text-sm">Absent</span>
//             <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.absent}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-orange-500 rounded"></div>
//             <span className="text-sm">Leave</span>
//             <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.leave}</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="w-4 h-4 bg-yellow-500 rounded"></div>
//             <span className="text-sm">Anomaly</span>
//             <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm font-medium">{statusCounts.anomaly}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   const CalendarView = () => {
//     const days = getDaysInMonth(currentDate);
//     const visibleDays = days.slice(0, 12); // Show first 18 days like in screenshot

//     return (
//       <div className="bg-white rounded-lg">
//         {/* Calendar Controls */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center gap-4">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder="Name, ID"
//                   className="border border-gray-300 rounded px-3 py-2 pl-8 text-sm w-64"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//               </div>
//             </div>
//             <div className="flex items-center gap-4">
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">Year</span>
//                 <select className="border border-gray-300 rounded px-3 py-1 text-sm">
//                   <option value="2025">2025</option>
//                   <option value="2024">2024</option>
//                 </select>
//               </div>
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-gray-600">Month</span>
//                 <select className="border border-gray-300 rounded px-3 py-1 text-sm">
//                   <option value="June">June</option>
//                   <option value="May">May</option>
//                   <option value="July">July</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Calendar Table */}
//         <div className="overflow-x-auto relative">
//           <table className="w-full">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sticky left-0 bg-gray-50">ID</th>
//                 <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sticky left-16 bg-gray-50">Employee Name</th>
//                 {visibleDays.map((day, index) => (
//                   <th key={index} className="px-2  py-3 text-center text-xs font-medium text-gray-700 min-w-12">
//                     <div>{day.date}</div>
//                     <div className="text-gray-500">{day.day}</div>
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-gray-200 ">
//               {calendarData.map((employee) => (
//                 <tr key={employee.id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm text-gray-900 sticky left-0 bg-white">{employee.id}</td>
//                   <td className="px-4 py-3 sticky left-16 bg-white">
//                     <Link to='/dashboard/employee/overview' className="flex items-center">
//                       <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
//                         {employee.avatar}
//                       </div>
//                       <span className="text-sm text-gray-900">{employee.employeeName}</span>
//                     </Link>
//                   </td>
//                   {visibleDays.map((day, index) => (
//                     <td key={index} className="px-2 py-3 text-center">
//                       <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
//                         employee.attendance[day.date] 
//                           ? getCalendarStatusColor(employee.attendance[day.date]) + ' text-white'
//                           : 'bg-gray-100 text-gray-400'
//                       }`}>
//                         {employee.attendance[day.date] || 'NA'}
//                       </div>
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Legend */}
//         <div className="p-4 border-t border-gray-200">
//           <div className="flex flex-wrap gap-4 text-sm">
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-green-500 rounded"></div>
//               <span>Present</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-red-400 rounded"></div>
//               <span>Absent</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-blue-400 rounded"></div>
//               <span>Leave</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-gray-400 rounded"></div>
//               <span>Weekly Off</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-purple-400 rounded"></div>
//               <span>Holiday</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-cyan-400 rounded"></div>
//               <span>Half Day Leave</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-green-600 rounded"></div>
//               <span>Work From Home</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-orange-400 rounded"></div>
//               <span>Anomaly</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-red-600 rounded"></div>
//               <span>Auto Clock-out</span>
//             </div>
//             <div className="flex items-center gap-1">
//               <div className="w-4 h-4 bg-red-500 rounded"></div>
//               <span>LOP</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

// if(!attendanceData || isLoading){
//   return (
//     <div className="flex justify-center h-[90vh]">
//           <ClipLoader size={30} color="blue" />
//         </div>
//   )
// }
//   return (
//     <div className="p-4 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-4">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 mb-1">Attendance Logs</h1>
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => navigateDate(-1)}
//                 className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 PREVIOUS
//               </button>
//               <input
//                 type="date"
//                 value={currentDate.toISOString().split('T')[0]}
//                 onChange={(e) => setCurrentDate(new Date(e.target.value))}
//                 max={new Date().toISOString().split('T')[0]} 
//                 className="border border-gray-300 rounded px-3 py-1 text-sm"
//               />
              
//               <button
//                 onClick={() => navigateDate(1)}
//                 className={`${isToday? 'text-blue-300 cursor-not-allowed' : "text-blue-600 hover:text-blue-800"}  text-sm flex items-center gap-1`}
//                disabled={isToday}
//               >
//                 NEXT
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//               {isToday ? null :(
//                  <button
//   onClick={() => setCurrentDate(new Date())}
//   className="text-blue-500 text-sm hover:underline"
// >
//   Today
// </button>
//               )}
             

//             </div>
//           </div>
//         </div>

//         {/* View Toggle */}
//         <div className="flex items-center justify-between">
//           <div className="flex border border-gray-300 rounded">
//             <button
//               onClick={() => setActiveView('table')}
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeView === 'table'
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               Table View
//             </button>
//             <button
//               onClick={() => setActiveView('calendar')}
//               className={`px-4 py-2 text-sm font-medium ${
//                 activeView === 'calendar'
//                   ? 'bg-blue-500 text-white'
//                   : 'bg-white text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               Calendar View
//             </button>
//           </div>

//           <div className="flex items-center gap-3">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search..."
//                 className="border border-gray-300 rounded px-3 py-2 pr-10 text-sm w-64"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
//             </div>
            
//             <button className="bg-red-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-red-600">
//               <Download className="h-4 w-4" />
//               Import
//             </button>
            
//             <button className="bg-blue-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-blue-600">
//               <Upload className="h-4 w-4" />
//               Export
//             </button>
            
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Show</span>
//               <select 
//                 className="border border-gray-300 rounded px-2 py-1 text-sm"
//                 value={showEntries}
//                 onChange={(e) => setShowEntries(parseInt(e.target.value))}
//               >
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       {activeView === 'table' ? <TableView /> : <CalendarView />}

//       {/* Pagination */}
//       <div className="mt-6 flex items-center justify-between">
//         <div className="text-sm text-gray-600">
//           1 to 5 of 5
//         </div>
//         <div className="flex items-center gap-2">
//           <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <span className="px-3 py-1 text-sm">Page 1 of 1</span>
//           <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//           <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttendanceLogs;