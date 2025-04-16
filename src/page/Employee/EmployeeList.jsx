import React, { useState } from 'react';
import { useGetAllEmployeeQuery } from '../../rtk/employeeApi';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { GrFormView } from 'react-icons/gr';
import { CiSearch } from 'react-icons/ci';
import { useDeleteEmployeeMutation } from '../../rtk/employeeApi';
import { isConfirm } from '../../helper/SweetAlrertIsConfirm';
import { useNavigate } from 'react-router';
import { ClipLoader } from 'react-spinners';

const EmployeeCard = ({ employee }) => {
  const [deleteEmployee] = useDeleteEmployeeMutation();
  const navigate = useNavigate();
  const getInitials = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleDelete = async (id) => {
    const isConfirmed = await isConfirm();
    if (isConfirmed) {
      const data = await deleteEmployee(id).unwrap();
    }
  };

  const handleEdit = async (employee) => {
    navigate('/employee/add', { state: { editEmployee: employee } });
  };

const employeeDetail=(employee)=>{
     let id=employee._id
     navigate(`/employee/details/${id}`,{ state: { employeeData: employee } })
}


  return (
    <div className="border-red-500 bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 p-4 relative">
      {/* Card Content */}
      <div className="flex items-start gap-4">
        {/* Avatar with Initials */}
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold ${employee.bgColor || 'bg-indigo-500'}`}
        >
          {employee.initials || getInitials(employee.name)}
        </div>

        {/* Employee Info */}
        <div className="flex-1">
          <h3 className="text-base font-medium text-gray-800">
            {employee.name}
            {/* <span className="text-gray-500 font-normal ml-1">({employee._id})</span> */}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{employee.email}</p>
          {employee.role && <p className="text-sm text-gray-500 mt-1">{employee.role}</p>}
          <p className="text-sm text-gray-600" mt-1>
            {employee.mobile}
          </p>
        </div>
      </div>
      <div className="flex gap-2 justify-end">
        <button  onClick={()=>employeeDetail(employee)}>
        <GrFormView className='text-2xl text-blue-800 hover:text-blue-500'/>
        </button>
        <button onClick={() => handleEdit(employee)}>
          <FaEdit className="text-blue-500 text-lg hover:text-blue-700" />
        </button>
        <button onClick={() => handleDelete(employee._id)}>
          <MdDelete className="text-red-500 text-lg hover:text-red-800" />
        </button>
      </div>
    </div>
  );
};

const EmployeeList = () => {
  const { data, isLoading, error } = useGetAllEmployeeQuery();
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const navigate = useNavigate();



  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader color="blue" size={30} />
      </div>
    );
  }
  if (error) {
    return <p className="text-center text-lg text-red-500">Error Loading Employee...</p>;
  }

  const filteredEmployee = data?.filter((employee) => {
    const matchesSearch = searchQuery === '' || employee.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === '' || roleFilter === employee.role;
    return matchesSearch && matchesRole;
  });

  const adddEmployee = (e) => {
    // e.preventDefault();
   
    navigate('/employee/add');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen gap">
      <div className="flex justify-end space-x-4">
        {/* Search Input */}
        <div>
          <div className="relative flex items-center">
            <input
              type="search"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 pl-8 w-64 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <CiSearch className="absolute left-2 text-gray-500 text-xl" />
          </div>
        </div>

        {/* Role Filter Dropdown */}
        <div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="p-2 w-32 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* Add Button */}
        <div>
          <button
            onClick={() => {
              adddEmployee();
            }}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {filteredEmployee?.length > 0 ? (
          filteredEmployee.map((employee) => <EmployeeCard key={employee.id} employee={employee} />)
        ) : (
          <p className="text-gray-500 text-red-500">No employees found.....</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
