// import React from 'react';
// import { Search } from 'lucide-react';
// import { Link } from 'react-router-dom';

// const CalendarView = ({
//   currentDate,
//   searchTerm,
//   setSearchTerm,
//   calendarData,
//   getCalendarStatusColor,
//   getDaysInMonth
// }) => {
//   const days = getDaysInMonth(currentDate);
//   const visibleDays = days.slice(0, 12); // Customize visible days

//   return (
//     <div className="bg-white rounded-lg">
//       {/* Calendar Controls */}
//       <div className="p-4 border-b border-gray-200">
//         <div className="flex justify-between items-center mb-4">
//           <div className="flex items-center gap-4">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Name, ID"
//                 className="border border-gray-300 rounded px-3 py-2 pl-8 text-sm w-64"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//               <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
//             </div>
//           </div>
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Year</span>
//               <select className="border border-gray-300 rounded px-3 py-1 text-sm">
//                 <option value="2025">2025</option>
//                 <option value="2024">2024</option>
//               </select>
//             </div>
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-600">Month</span>
//               <select className="border border-gray-300 rounded px-3 py-1 text-sm">
//                 <option value="June">June</option>
//                 <option value="May">May</option>
//                 <option value="July">July</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Calendar Table */}
//       <div className="overflow-x-auto relative">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sticky left-0 bg-gray-50">ID</th>
//               <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 sticky left-16 bg-gray-50">Employee Name</th>
//               {visibleDays.map((day, index) => (
//                 <th key={index} className="px-2 py-3 text-center text-xs font-medium text-gray-700 min-w-12">
//                   <div>{day.date}</div>
//                   <div className="text-gray-500">{day.day}</div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {calendarData.map((employee) => (
//               <tr key={employee.id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 text-sm text-gray-900 sticky left-0 bg-white">{employee.id}</td>
//                 <td className="px-4 py-3 sticky left-16 bg-white">
//                   <Link to='/dashboard/employee/overview' className="flex items-center">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
//                       {employee.avatar}
//                     </div>
//                     <span className="text-sm text-gray-900">{employee.employeeName}</span>
//                   </Link>
//                 </td>
//                 {visibleDays.map((day, index) => (
//                   <td key={index} className="px-2 py-3 text-center">
//                     <div className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
//                       employee.attendance[day.date] 
//                         ? getCalendarStatusColor(employee.attendance[day.date]) + ' text-white'
//                         : 'bg-gray-100 text-gray-400'
//                     }`}>
//                       {employee.attendance[day.date] || 'NA'}
//                     </div>
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Legend */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="flex flex-wrap gap-4 text-sm">
//           {[
//             ['Present', 'bg-green-500'],
//             ['Absent', 'bg-red-400'],
//             ['Leave', 'bg-blue-400'],
//             ['Weekly Off', 'bg-gray-400'],
//             ['Holiday', 'bg-purple-400'],
//             ['Half Day Leave', 'bg-cyan-400'],
//             ['Work From Home', 'bg-green-600'],
//             ['Anomaly', 'bg-orange-400'],
//             ['Auto Clock-out', 'bg-red-600'],
//             ['LOP', 'bg-red-500']
//           ].map(([label, color], idx) => (
//             <div key={idx} className="flex items-center gap-1">
//               <div className={`w-4 h-4 ${color} rounded`}></div>
//               <span>{label}</span>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CalendarView;
