import { useForm } from "react-hook-form";

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  useBankAddMutation,
  useGetOneEmployeeBankQuery,
} from "../../../rtk/employeeBank";
import { useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
const EmployeeBankInfo = () => {
  const { id } = useParams();
  const [bankAdd, { isLoading, isError, isSuccess }] = useBankAddMutation();
  const { data: bankData } = useGetOneEmployeeBankQuery({ id });
  const location = useLocation();
  const employeeData = location.state?.editEmployee;
  const bankId = location.state?.bankId;
  const navigate = useNavigate();

  const [data, setData] = useState({
    bankName: "",
    accountNumber: "",
    branch: "",
    bankCode: "",
    bankAddress: "",
    country: "",
    ifscCode: "",
  });

  useEffect(() => {
    if (bankData) {
      setData({
        bankName: bankData.bankName,
        accountNumber: bankData.accountNumber,
        branch: bankData.branch,
        bankCode: bankData.bankCode,
        bankAddress: bankData.bankAddress,
        country: bankData.country,
        ifscCode: bankData.ifscCode,
      });
    }
  }, [bankData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleChangefile = (e) => {
    const { name } = e.target;
    setData({ ...data, [name]: e.target.files[0] });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
      
    try {
      const result = await bankAdd({ data, id }).unwrap();
      if (result.success) {
        navigate(`/employee/details/${id}`);
      }
    } catch (error) {
      console.error("Failed to submit bank data:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={30} color="blu" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-1 p-4 bg-white shadow-lg rounded-lg pb-8">
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Email & Role */}
        {/* Name, Phone */}
        <div className="flex gap-10">
          <div className="w-1/2">
            <label className="block text-sm font-medium text-gray-700">
              Bank Name
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Account Number
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Branch
            </label>
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
            <label className="block text-sm font-medium text-gray-700 ">
              Bank code
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.bankCode}
              name="bankCode"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
            <label className="block text-sm font-medium text-gray-700">
              Bank Address
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              Countary
            </label>
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
            <label className="block text-sm font-medium text-gray-700">
              IFSC CODE
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={data.ifscCode}
              name="ifscCode"
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
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-5 rounded-md hover:bg-blue-700 w-fit"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)} // ya navigate("/your-desired-path")
            className="bg-gray-300 text-gray-800 py-2 px-5 rounded-md hover:bg-gray-400 w-fit"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeBankInfo;
