import React, { useState } from 'react';
import { Download, Calendar, DollarSign, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const SalaryInfo = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  
  // Sample data based on your API response
  const earningsData = {
    success: true,
    message: "Employee Monthly Salary",
    data: {
      salaryDetail: {
        salary: "10000",
        absentDays: 8,
        totalDays: 8,
        presentDays: 0,
        estimate_salary: 0,
        status: "Not Paid"
      }
    }
  };

  const { salaryDetail } = earningsData.data;
  
  const handleDownloadSlip = () => {
    // Download functionality
    alert('Salary Not Paid yet')
    console.log('Downloading salary slip for:', selectedMonth);
    // You can implement actual download logic here
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600 bg-green-50';
      case 'Not Paid':
        return 'text-red-600 bg-red-500';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const months = [
    { value: '2024-01', label: 'January 2024' },
    { value: '2024-02', label: 'February 2024' },
    { value: '2024-03', label: 'March 2024' },
    { value: '2024-04', label: 'April 2024' },
    { value: '2024-05', label: 'May 2024' },
    { value: '2024-06', label: 'June 2024' },
  ];

  return (
    <div className="p-4 max-w-5xl mx-auto">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Monthly Earnings</h2>
            <p className="text-sm text-gray-600">Track your salary and attendance details</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Month Filter */}
            <div className="relative">
              <select 
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
              <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            
            {/* Download Button */}
            <button
              onClick={handleDownloadSlip}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Download className="h-4 w-4" />
              Download Slip
            </button>
          </div>
        </div>
      </div>

      {/* Main Earnings Card */}
      <div className="bg-gradient-to-br from-[#06425F] to-[#083d56] rounded-xl shadow-lg p-6 text-white mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Base Salary</h3>
              <p className="text-blue-100 text-sm">Monthly compensation</p>
            </div>
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(salaryDetail.status)} text-white`}>
            <div className="flex items-center gap-1">
              {salaryDetail.status === 'Paid' ? 
                <CheckCircle className="h-3 w-3" /> : 
                <XCircle className="h-3 w-3" />
              }
              {salaryDetail.status}
            </div>
          </div>
        </div>
        
        <div className="text-3xl font-bold mb-2">
          ₹{parseInt(salaryDetail.salary).toLocaleString()}
        </div>
        <div className="text-blue-100 text-sm">
          Estimated Earning: ₹{parseInt(salaryDetail.estimate_salary).toLocaleString()}
        </div>
      </div>

      {/* Attendance Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Total Days */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Days</p>
              <p className="text-2xl font-bold text-gray-900">{salaryDetail.totalDays}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Present Days */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Present Days</p>
              <p className="text-2xl font-bold text-green-600">{salaryDetail.presentDays}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(salaryDetail.presentDays / salaryDetail.totalDays) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Absent Days */}
        <div className="bg-white rounded-lg border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Absent Days</p>
              <p className="text-2xl font-bold text-red-600">{salaryDetail.absentDays}</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <XCircle className="h-5 w-5 text-red-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div 
                className="bg-red-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(salaryDetail.absentDays / salaryDetail.totalDays) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Salary Breakdown */}
      <div className="bg-white rounded-lg border border-gray-100 p-4">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="h-5 w-5 text-[#06425F]" />
          <h3 className="text-lg font-semibold text-gray-900">Salary Breakdown</h3>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600">Base Salary</span>
            <span className="font-semibold text-gray-900">₹{parseInt(salaryDetail.salary).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center py-2 border-b border-gray-50">
            <span className="text-gray-600">Deductions (Absent Days)</span>
            <span className="font-semibold text-red-600">
              -₹{(parseInt(salaryDetail.salary) - parseInt(salaryDetail.estimate_salary)).toLocaleString()}
            </span>
          </div>
          
          <div className="flex justify-between items-center py-2 pt-3 border-t-2 border-gray-100">
            <span className="font-semibold text-gray-900">Net Salary</span>
            <span className="text-xl font-bold text-[#06425F]">
              ₹{parseInt(salaryDetail.estimate_salary).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalaryInfo;