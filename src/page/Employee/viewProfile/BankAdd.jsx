import { useForm } from 'react-hook-form';

import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {useBankAddMutation} from '../../../rtk/employeeBank'
import { useParams } from "react-router-dom";

const EmployeeBankInfo = () => {
  const{id}=useParams()
  const [bankAdd, { isLoading, isError, isSuccess }] =useBankAddMutation();
  const location = useLocation();
  const employeeData = location.state?.editEmployee;
  const bankId = location.state?.bankId;
  const navigate = useNavigate();

  const [data, setData] = useState({
    bankName: '',
    accountNumber: '',
    branch: '',
    bankCode: '',
    bankAddress: '',
    country: '',
    ifsc: '',
  });

  //   useEffect(()=>{
  //         if(employeeData){
  //          setData((prev)=>({
  //             ...prev,
  //           name:employeeData.name,
  //           email:employeeData.email,
  //           workEmail:employeeData.workEmail,
  //           mobile:employeeData.mobile,
  //           dob:employeeData.dob,
  //           gender:employeeData.gender,
  //           address:employeeData.address,
  //           city:employeeData.city,
  //           state:employeeData.state,
  //           qualification:employeeData.qualification,
  //           experience:employeeData.experience,
  //           maritalStatus:employeeData.maritalStatus,
  //           password:employeeData.passwords||"",
  //           joiningDate:employeeData.joiningDate ? employeeData.joiningDate.split('T')[0]:"",
  //           // photo:employeeData.photo,
  //          }))
  //         }
  //   },[employeeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangefile = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.files[0] });
  };

  //  console.log("data",data);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form...");
      const result = await bankAdd({ data, id }).unwrap();
       if(result.success){
        navigate(`/employee/details/${id}`)
       }
    } catch (error) {
      console.error("Failed to submit bank data:", error);
    }
  };

  return (
    <div className="container mx-auto mt-1 p-4 bg-white shadow-lg rounded-lg pb-8">
      <h2 className="text-2xl font-bold mb-4 text-center">{employeeData ? 'Add Bank Information ' : 'Add Bank Information'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email & Role */}
        {/* Name, Phone */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              onChange={handleChange}
              name="bankName"
              value={data.bankName}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={20}
              minLength={3}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Account Number</label>
            <input
              type="number"
              onChange={handleChange}
              name="accountNumber"
              value={data.accountNumber}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={20}
              minLength={3}
            />
          </div>
        </div>
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Branch</label>
            <input
              type="text"
              onChange={handleChange}
              name="branch"
              value={data.branch}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              maxLength={50}
              minLength={3}
            />
          </div>

          <div className="w-1/2">
            <label className='block text-sm font-medium text-gray-700 '>Bank code</label>
            <input
             type='text'
             onChange={handleChange}
             value={data.bankCode}
             name='bankCode'
             className='mt-1 block w-full border border-gray-300 rounded-md p-2'
            ></input>
          </div>

          {/* <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Role</label>
            <select onChange={handleChange} name='role' value={data.role} className="mt-1 w-full border border-gray-300 rounded-md p-2 bg-white">
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
            </select>
          </div> */}
        </div>
        {/* Department, Designation */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Bank Address</label>
            <input
              type="text"
              onChange={handleChange}
              value={data.bankAddress}
              name="bankAddress"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              maxLength={15}
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Countary</label>
            <input
              type="text"
              onChange={handleChange}
              value={data.country}
              name="country"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
              maxLength={15}
            />
          </div>
        </div>

        {/* Salary, Joining Date */}
        <div className="flex gap-10">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">IFSC CODE</label>
            <input
              type="text"
              onChange={handleChange}
              value={data.ifsc}
              name="ifsc"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          {/* <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Work Location</label>
            <input
              type="text"
              onChange={handleChange}
              name="workLocation"
              value={data.workLocation}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div> */}
        </div>

        {/* <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Joining Date</label>
            <input
              type="Date"
              onChange={handleChange}
              value={data.joiningDate}
              name="joiningDate"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">Salary</label>
            <input
              type="Number"
              onChange={handleChange}
              name="salary"
              value={data.salary}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div> */}
        <button type="submit" className=" bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 w-fit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EmployeeBankInfo;
