import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, User, DollarSign, CheckCircle, XCircle, Edit2, TrendingUp, Users } from 'lucide-react';
import {Link} from 'react-router-dom'
const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [editingStatus, setEditingStatus] = useState(null);

  const [payrollData, setPayrollData] = useState([
    {
      id: 1,
      employeeName: "Ravi Test",
      email: "ravi@gmail.com",
      _id:'1245678',
      salary: "10000",
      presentDays: 22,
      absentDays: 3,
      status: "paid",
      totalWorkingDays: 25,
      estimate_salary: 8800
    },
    {
      id: 2,
      employeeName: "Priya Sharma",
      email: "priya@gmail.com",
       _id:'1245698',
      salary: "15000",
      presentDays: 25,
      absentDays: 0,
      status: "unpaid",
      totalWorkingDays: 25,
      estimate_salary: 15000
    },
    {
      id: 3,
      employeeName: "Amit Kumar",
      email: "amit@gmail.com",
      salary: "12000",
      presentDays: 20,
      absentDays: 5,
      status: "paid",
      totalWorkingDays: 25,
      estimate_salary: 9600
    },
    {
      id: 4,
      employeeName: "Sunita Singh",
      email: "sunita@gmail.com",
      salary: "18000",
      presentDays: 24,
      absentDays: 1,
      status: "unpaid",
      totalWorkingDays: 25,
      estimate_salary: 17280
    }
  ]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Filter and sort data
  const filteredData = useMemo(() => {
    let filtered = payrollData.filter(emp => 
      emp.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'highestSalary') {
      filtered = filtered.sort((a, b) => parseInt(b.salary) - parseInt(a.salary));
    } else if (sortBy === 'highestPresent') {
      filtered = filtered.sort((a, b) => b.presentDays - a.presentDays);
    }

    return filtered;
  }, [payrollData, searchTerm, sortBy]);

  const stats = useMemo(() => {
    const totalEmployees = payrollData.length;
    const paidEmployees = payrollData.filter(emp => emp.status === 'paid').length;
    const totalSalary = payrollData.reduce((sum, emp) => sum + parseInt(emp.estimate_salary), 0);
    const highestSalary = Math.max(...payrollData.map(emp => parseInt(emp.salary)));
    const highestPresent = Math.max(...payrollData.map(emp => emp.presentDays));

    return { totalEmployees, paidEmployees, totalSalary, highestSalary, highestPresent };
  }, [payrollData]);

  const handleStatusChange = (id, newStatus) => {
    setPayrollData(prev => 
      prev.map(emp => 
        emp.id === id ? { ...emp, status: newStatus } : emp
      )
    );
    setEditingStatus(null);
  };

  const StatusBadge = ({ status, isEditing, onEdit, onSave, onCancel }) => {
    if (isEditing) {
      return (
        <div className="flex gap-1">
          <button
            onClick={() => onSave('paid')}
            className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded hover:bg-green-200"
          >
            Paid
          </button>
          <button
            onClick={() => onSave('unpaid')}
            className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded hover:bg-red-200"
          >
            Unpaid
          </button>
        </div>
      );
    }

    return (
      <div className="flex items-center gap-1">
        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
          status === 'paid' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {status === 'paid' ? (
            <><CheckCircle className="w-3 h-3 inline mr-1" />Paid</>
          ) : (
            <><XCircle className="w-3 h-3 inline mr-1" />Unpaid</>
          )}
        </span>
        <button
          onClick={onEdit}
          className="p-1 hover:bg-gray-100 rounded"
        >
          <Edit2 className="w-3 h-3 text-gray-500" />
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ color: '#06425F' }}>
      <div className="p-4">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold mb-1">Monthly Payroll</h1>
          <p className="text-sm text-gray-600">Manage employee salary and attendance</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4" style={{ borderLeftColor: '#06425F' }}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Employees</p>
                <p className="text-lg font-bold">{stats.totalEmployees}</p>
              </div>
              <Users className="w-6 h-6 opacity-60" />
            </div>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Paid</p>
                <p className="text-lg font-bold text-green-600">{stats.paidEmployees}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Payout</p>
                <p className="text-lg font-bold">₹{stats.totalSalary.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Highest Salary</p>
                <p className="text-lg font-bold">₹{stats.highestSalary.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Max Present Days</p>
                <p className="text-lg font-bold">{stats.highestPresent}</p>
              </div>
              <Calendar className="w-6 h-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="flex items-center gap-2 flex-1 min-w-64">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search employee name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 border-0 outline-none text-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              >
                <option value="">All Months</option>
                {months.map(month => (
                  <option key={month} value={month}>{month}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1 text-sm outline-none"
              >
                <option value="">Sort By</option>
                <option value="highestSalary">Highest Salary</option>
                <option value="highestPresent">Highest Present Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: '#06425F' }} className="text-white">
                <tr>
                  <th className="px-3 py-2 text-left font-medium">Employee</th>
                  <th className="px-3 py-2 text-left font-medium">Salary</th>
                  <th className="px-3 py-2 text-left font-medium">Present</th>
                  <th className="px-3 py-2 text-left font-medium">Absent</th>
                  <th className="px-3 py-2 text-left font-medium">Estimate</th>
                  <th className="px-3 py-2 text-left font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((employee, index) => (
                  <tr key={employee.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-3 py-2">
                      <Link to={`/dashboard/employee/overview/${employee?._id}`} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium" style={{ backgroundColor: '#06425F' }}>
                          {employee.employeeName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{employee.employeeName}</p>
                          <p className="text-xs text-gray-500">{employee.email}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-3 py-2 font-medium">₹{parseInt(employee.salary).toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        {employee.presentDays} days
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        {employee.absentDays} days
                      </span>
                    </td>
                    <td className="px-3 py-2 font-medium">₹{parseInt(employee.estimate_salary).toLocaleString()}</td>
                    <td className="px-3 py-2">
                      <StatusBadge
                        status={employee.status}
                        isEditing={editingStatus === employee.id}
                        onEdit={() => setEditingStatus(employee.id)}
                        onSave={(newStatus) => handleStatusChange(employee.id, newStatus)}
                        onCancel={() => setEditingStatus(null)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No employees found matching your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payroll;