// import React from 'react';
// import { Link } from 'react-router-dom';
// import { User2 } from 'lucide-react';

// const TableView = ({ data, statusCounts, searchTerm, showEntries }) => {
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

//   const filteredData = data.filter(emp =>
//     emp.employee.name.toLowerCase().includes(searchTerm.toLowerCase())
//   ).slice(0, showEntries);

//   return (
//     <div className="bg-white rounded-lg">
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
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
//             {filteredData.map((employee) => (
//               <tr key={employee._id} className="hover:bg-gray-50">
//                 <td className="px-4 py-3 text-sm text-gray-900">{employee._id.slice(-5)}</td>
//                 <td className="px-4 py-3">
//                   <Link to='/dashboard/employee/overview' className="flex items-center">
//                     <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium mr-3">
//                       {employee.avatar || <User2 />}
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

//       <div className="p-4 border-t border-gray-200">
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
// };

// export default TableView;
