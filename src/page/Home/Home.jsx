import React from 'react'
import DashboardLayout from './DashboardLayout'
import Dashboard from './UserDashboard'
import AdminHome from '../../adminPages/Home.admin'
const Home = () => {

  return (
    <div >
      {/* {data?.role==="Admin"  ?  <DashboardLayout/>  :  <Dashboard data={data}/>} */}
      {/* {data?.role==="Admin"  ?  <Dashboard data={data}/> : <DashboardLayout/>} */}
<AdminHome/>
    </div>
  )
}

export default Home