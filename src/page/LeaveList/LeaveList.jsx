import React from "react";
import TableComponent from "../../helper/TableComponent";
import { useGetEmployeeLeaveQuery } from "../../rtk/leaveApi";
import { AppBar } from "@mui/material";

export default  function LeaveList(){
         
    const{data:allLeave ,isLaoding}= useGetEmployeeLeaveQuery()
    //  console.log("bhai ye leave detail h ",allLeave);
     

    const columns=[
        {header:"Name",accessor:"name"},
        {header:"Email",accessor:"email"},
        {header:"Mobile",accessor:"mobile"},
        {header:"Reason",accessor:"reason"},
        {header:"FromDate",accessor:"fromdate"},
        {header:"ToDate",accessor:"todate"},
        {header:"Status",accessor:"status"},
        {header:"Action",accessor:"action"}
    ]

  const handleApprove=async(id)=>{
        try{
              console.log("a++i",id);
              
        }catch(err){
            console.log(err.message);
            
        }
  }

  const handleReject=(id)=>{
       try {
               console.log("i++",id);
               
       } catch (err) {
          console.log(err.message);
          
       }
  }
//    const data=[];

   const data=allLeave? allLeave?.map((val)=>{
      console.log(val.employeeId);
       let name=val.employeeId.name;
       let mobile=val.employeeId.mobile;
       let email=val.employeeId.email; 

      return{
            reason:val.reason,
            fromdate: new Date(val.startDate).toLocaleDateString("en-IN"),
            todate: new Date(val.endDate).toLocaleDateString("en-IN"),
            reason:val.description ,
            status:val.status,
            name,
            mobile,
            email,
            action: (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(val._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 w-1/2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(val._id)}
                    className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 w-1/2"
                  >
                    Reject
                  </button>
                </div>
              )
              
      }
   }):[]

    return(
        <div>
            <TableComponent columns={columns} data={data} itemsPerPage={10}/>
        </div>
    )
}