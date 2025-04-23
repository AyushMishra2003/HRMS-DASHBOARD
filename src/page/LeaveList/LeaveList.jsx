import React from "react";
import TableComponent from "../../helper/TableComponent";
import { useGetEmployeeLeaveQuery } from "../../rtk/leaveApi";

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
        {header:"Action",accessor:"action"}
        
    ]


 
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
            name,
            mobile,
            email
      }
   }):[]

    return(
        <div>
            <TableComponent columns={columns} data={data} itemsPerPage={10}/>
        </div>
    )
}