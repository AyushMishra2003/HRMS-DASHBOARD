import React, { useState } from "react";
import TableComponent from "../../helper/TableComponent";
import { useGetLeaveDetailQuery } from "../../rtk/leaveApi";


export default function EmployeeLeave() {

  const {data:leaveData,isLoading}=useGetLeaveDetailQuery()
  
    console.log("leavedata:", leaveData?.employeeData?.name);
    
  const [showLeaveForm, setShowLeaveForm] = useState(false);

  const [formData, setFormData] = useState({
    breakDown: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // console.log("mai leave model pe hu", formData);

  const columns = [
    { header: "name", accessor: "Name" },
    { header: "Leave Type", accessor: "leavetype" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "enddate" },
    { header: "Status", accessor: "status" },
  ];

  const data = [];

  const handleCreateClick = () => {
    setShowLeaveForm(true);
  };

  const closeLeaveForm = () => {
    setShowLeaveForm(false);
  };

  const attendanceRequist=(e)=>{
      e.preventDefault();
      console.log("aaaa");
      
  }

  return (
    <div className="container mx-auto p-4">
      <div className="relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Employee Leave</h2>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={handleCreateClick}
          >
            Create
          </button>
        </div>

        <TableComponent columns={columns} data={data} itemsPerPage={10} />

        {showLeaveForm && (
          <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Leave Request</h3>
                <button
                  onClick={closeLeaveForm}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Employee <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>{leaveData?.employeeData?.name}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Leave Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      name="leaveType"
                      value={formData.leaveType}
                      onChange={handelChange}
                    >
                      <option>Choose Leave Type</option>
                      <option>Casual</option>
                      <option>Sick</option>
                      <option>Maternity</option>
                      <option>Paternity</option>
                      <option>holiday</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handelChange} 
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Breakdown <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full border border-gray-300 rounded-md p-2"
                      name="breakDown"
                      value={formData.breakDown}
                      onChange={handelChange}
                    >
                      <option value="">select</option>
                      <option value="full">Full Daya</option>
                      <option value="first_haf">First Half</option>
                      <option value="second_haf">Second Half</option>
                    </select>
                  </div>
                </div>

                <div className="grid  gap-4 h-full">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handelChange}
                    >
                      End date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handelChange}
                      className="w-full border border-gray-300 rounded-md p-2"
                    />
                  </div>

                  {/* <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date Breakdown <span className="text-red-500">*</span>
                    </label>
                    <select className="w-full border border-gray-300 rounded-md p-2">
                      <option>Full Day</option>
                      <option>First Half</option>
                      <option>Second Half</option>
                    </select>
                  </div> */}
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Attachment
                  </label>
                  <input type="file" className="w-full border border-gray-300 rounded-md p-2" />
                </div> */}

                <div>
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                   
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                     name="description"
                     value={formData.description}
                     onChange={handelChange}
                    className="w-full border border-gray-300 rounded-md p-2 h-24"
                    placeholder="Description"
                  ></textarea>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeLeaveForm}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={attendanceRequist}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
