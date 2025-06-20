import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import Layout from "./component/Layout";
import About from "./page/About/About";
import EmployeeList from "./page/Employee/EmployeeList";
import EmployeeDetail from "./page/Employee/EmployeeDetail";
import EmployeeAdd from "./page/Employee/EmployeeAdd";
import EmployeeWorkAddForm from "./page/Employee/viewProfile/WorkAddForm";
import EmployeeBankInfo from "./page/Employee/viewProfile/BankAdd";
import Policy from "./page/Policy/Policy";
import EmployeeAddPolicy from "./page/Policy/AddPolicy";
import EmployeeWork from "./page/Employee/EmployeeWork";
import EmployeeWorkType from "./page/Employee/EmployeeWork";
import AuthLogin from "./page/Auth/Login";
import ProtectedAuth from "./page/Auth/ProtectedAuth";
import AttendanceList from "./page/IndivisualEmployee/attendanceList";
import EmployeeAttendance from "./page/EmployeeAttendance/EmployeeAttendance";
import EmployeeLeave from "./page/EmployeeLeave/EmployeeLeave";
import LeaveList from "./page/LeaveList/LeaveList"
import { notificationApi } from "../src/rtk/notification";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import HomeDashboard from "./page/layput/HomeLayout";
import AttendanceLogs from "./page/EmployeeAttendance/AttendanceLogs";
import EmployeeOverview from "./page/Employee/EmployeeOverview";
import LeaveLogs from "./page/LeaveList/LeaveLogs";
import LeaveRules from "./page/LeaveList/LeaveRules";
import AttendanceRules from "./adminPages/AttendanceRules";

const App = () => {



  return (
<div>
  <Routes>
    <Route path="/home" element={<HomeDashboard />} />
    
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="employee/list" element={<EmployeeList />} />
        <Route path="employee/details/:id" element={<EmployeeDetail />} />

        <Route path="employee/overview" element={<EmployeeOverview />} />

        <Route path="employee/add" element={<EmployeeAdd />} />
        <Route path="employee/work" element={<EmployeeWorkType />} />
        <Route path="employee/work/:id" element={<EmployeeWorkAddForm />} />
        <Route path="employee/bank/:id" element={<EmployeeBankInfo />} />
        <Route path="employee/policy" element={<Policy />} />
        <Route path="employee/add/policy" element={<EmployeeAddPolicy />} />
        <Route path="attendance/list" element={<AttendanceList />} />

        <Route path="attendance/logs" element={<AttendanceLogs />} />
        <Route path="attendance/rules" element={<AttendanceRules />} />

        <Route path="attendance/employee" element={<EmployeeAttendance />} />
        <Route path="leave" element={<EmployeeLeave />} />
        <Route path="leave/list" element={<LeaveList />} />


        <Route path="leave/logs" element={<LeaveLogs />} />
        <Route path="leave/rules" element={<LeaveRules />} />
      </Route>
    {/* </Route> */}

    
    {/* <Route element={<ProtectedAuth isPrivate={false} />}> */}
      <Route path="/" element={<AuthLogin />} />
    {/* </Route> */}

    {/* Catch-all redirect to HomeDashboard */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
</div>
  );
};

export default App;
