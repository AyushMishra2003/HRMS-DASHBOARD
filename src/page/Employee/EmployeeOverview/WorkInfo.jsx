import React, { useState, useEffect } from 'react';
import { FiEdit, FiSave, FiX } from 'react-icons/fi';
import { useGetOneEmployeeWorkQuery } from '../../../rtk/employeeworck.js';
import { useWorkAddMutation } from '../../../rtk/employeeworck.js';

const WorkInfo = ({ employeeId }) => {
  const { data: workData, isLoading, error } = useGetOneEmployeeWorkQuery({ id: employeeId });
  const [workAddMutation, { isLoading: isUpdating }] = useWorkAddMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [workInfo, setWorkInfo] = useState({
    department: '',
    jobPosition: '',
    shiftInformation: '',
    workType: '',
    employeeType: '',
    reportingManager: '',
    company: '',
    workLocation: '',
    endDate: '',
    joiningDate: '',
    salary: ''
  });

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (workData) {
      const workDetails = {
        department: workData?.department || 'N/A',
        jobPosition: workData?.jobPosition || 'N/A',
        shiftInformation: workData?.shiftInformation || 'N/A',
        workType: workData?.workType || 'N/A',
        employeeType: workData?.employeeType || 'N/A',
        reportingManager: workData?.reportingManager || 'N/A',
        company: workData?.company || 'N/A',
        workLocation: workData?.workLocation || 'N/A',
        endDate: workData?.endDate || 'N/A',
        joiningDate: workData?.joiningDate ? new Date(workData.joiningDate).toLocaleDateString("en-IN") : 'N/A',
        salary: workData?.salary || 'N/A'
      };
      setWorkInfo(workDetails);
      setFormData(workDetails);
    }
  }, [workData]);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({ ...workInfo });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({ ...workInfo });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Prepare data for API call
      const updateData = {
        id: employeeId,
        department: formData.department,
        jobPosition: formData.jobPosition,
        shiftInformation: formData.shiftInformation,
        workType: formData.workType,
        employeeType: formData.employeeType,
        reportingManager: formData.reportingManager,
        company: formData.company,
        workLocation: formData.workLocation,
        endDate: formData.endDate,
        joiningDate: formData.joiningDate,
        salary: formData.salary
      };

      await workAddMutation(updateData).unwrap();
      setWorkInfo(formData);
      setIsEditing(false);
      // You might want to show a success message here
    } catch (error) {
      console.error('Failed to update work information:', error);
      // You might want to show an error message here
    }
  };

  const workFields = [
    { key: 'department', label: 'Department', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { key: 'jobPosition', label: 'Job Position', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { key: 'shiftInformation', label: 'Shift Information', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { key: 'workType', label: 'Work Type', icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { key: 'employeeType', label: 'Employee Type', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { key: 'reportingManager', label: 'Reporting Manager', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { key: 'company', label: 'Company', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { key: 'workLocation', label: 'Work Location', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { key: 'endDate', label: 'End Date', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { key: 'joiningDate', label: 'Joining Date', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { key: 'salary', label: 'Salary', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];

  if (isLoading) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4 mb-4">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i}>
                <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-md shadow-sm p-4 mb-4">
        <div className="text-red-500">Error loading work information</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-md shadow-sm p-4 mb-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <svg
            className="h-5 w-5 text-gray-500 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <h3 className="text-lg font-medium">Work Information</h3>
          <div className="ml-2 h-2 w-2 bg-red-500 rounded-full"></div>
        </div>
        
        <div className="flex space-x-2">
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700 transition-colors"
            >
              <FiEdit className="text-xl" />
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className="text-green-500 hover:text-green-700 transition-colors disabled:opacity-50"
              >
                <FiSave className="text-xl" />
              </button>
              <button
                onClick={handleCancel}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {workFields.map((field) => (
          <div key={field.key}>
            <div className="text-gray-500 text-sm flex items-center mb-1">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={field.icon}
                />
              </svg>
              {field.label}
            </div>
            
            {isEditing ? (
              <input
                type={field.key === 'salary' ? 'number' : field.key.includes('Date') ? 'date' : 'text'}
                value={field.key.includes('Date') && formData[field.key] !== 'N/A' 
                  ? new Date(formData[field.key]).toISOString().split('T')[0] 
                  : formData[field.key] === 'N/A' ? '' : formData[field.key]
                }
                onChange={(e) => handleInputChange(field.key, e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={`Enter ${field.label.toLowerCase()}`}
              />
            ) : (
              <div className="text-gray-900 py-2">{workInfo[field.key]}</div>
            )}
          </div>
        ))}
      </div>

      {isUpdating && (
        <div className="mt-4 text-center">
          <div className="inline-flex items-center text-blue-600">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating work information...
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkInfo;