
import React from 'react'
import TableComponent from '../../helper/TableComponent'
import { useGetAllEmployeeWorkQuery } from '../../rtk/employeeworck'
import { ClipLoader } from 'react-spinners'
import { useGetAttendanceDetailQuery } from '../../rtk/attendance.js'
export default function AttendanceList() {
 
    const{data,isLoading}=useGetAttendanceDetailQuery()
    
    console.log("data++",data?.employeedata?.[0].name);

    const columns=[
        {header:"Name",accessor:"name"},
        {header:"checkIn",accessor:"checkIn"},
        {header:"checkOut",accessor:"checkOut"},
        {header:"totalworkingHout",accessor:"totalworkingHout"},
        {header:"status",accessor:"status"}
    ]
       
   
    const tableData = data?.attandanceData.map((emp) => {
      let status = emp?.status;
      let checkIn = emp?.loginTime;
      let checkOut = emp?.logoutTime;
      let totalworkingHout = emp?.workingHours;
    
      if (emp.checkIn === false) {
        status = "absent";
        checkIn = "N/A";
        checkOut = "N/A";
        totalworkingHout = "N/A";
      }
    
      return {
        name: data?.employeedata?.[0].name, 
        checkIn,
        checkOut,
        totalworkingHout,
        status,
      };
    });
    
    


      //  <div>
      //    <ClipLoader/>
      //  </div>
          
         
  return (
    <div>   
        {isLoading?(
            <div className='flex justify-center items-center h-screen'>
                <ClipLoader color="blue" size={30}/>
            </div>
        ):(
            <TableComponent columns={columns} data={tableData} itemsPerPage={10}/>
        )
        }
    </div>
  )
}
