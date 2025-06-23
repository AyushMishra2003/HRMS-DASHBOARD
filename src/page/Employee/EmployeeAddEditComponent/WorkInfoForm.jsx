import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetOneEmployeeWorkQuery, useWorkAddMutation, useWorkEditMutation } from '../../../rtk/employeeworck';
import { toast } from 'react-toastify';

const WorkInfoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const { data: workData, isLoading: isFetching } = useGetOneEmployeeWorkQuery({ id }, { skip: !isEditMode });
  const [workAdd, { isLoading: isAdding }] = useWorkAddMutation();
  const [workEdit, { isLoading: isEditing }] = useWorkEditMutation();

  const [formData, setFormData] = useState({
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

  useEffect(() => {
    if (isEditMode && workData) {
      setFormData({
        ...workData,
        joiningDate: workData.joiningDate?.split('T')[0] || '',
        endDate: workData.endDate?.split('T')[0] || '',
      });
    }
  }, [workData, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      joiningDate: formData.joiningDate || null,
      endDate: formData.endDate || null,
    };

    try {
      if (isEditMode) {
        await workEdit({ id, ...payload }).unwrap();
        toast.success('Work info updated successfully!');
      } else {
        await workAdd(payload).unwrap();
        toast.success('Work info added successfully!');
        setFormData({
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
      }

      navigate('/employee-list');
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const isLoading = isFetching || isAdding || isEditing;

  return (
    <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">{isEditMode ? 'Edit' : 'Add'} Work Information</h2>

      {isLoading ? (
        <div className="text-gray-500">Loading...</div>
      ) : (
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'department', label: 'Department' },
            { name: 'jobPosition', label: 'Job Position' },
            { name: 'shiftInformation', label: 'Shift Information' },
            { name: 'workType', label: 'Work Type' },
            { name: 'employeeType', label: 'Employee Type' },
            { name: 'reportingManager', label: 'Reporting Manager' },
            { name: 'company', label: 'Company' },
            { name: 'workLocation', label: 'Work Location' },
            { name: 'joiningDate', label: 'Joining Date', type: 'date' },
            { name: 'endDate', label: 'End Date', type: 'date' },
            { name: 'salary', label: 'Salary', type: 'number' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50"
              disabled={isLoading}
            >
              {isEditMode ? 'Update' : 'Add'} Work Info
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default WorkInfoForm;
