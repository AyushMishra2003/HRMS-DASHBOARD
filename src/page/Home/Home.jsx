import React from 'react'
import DashboardLayout from './DashboardLayout'
import Dashboard from './UserDashboard'
import { useIsLoginQuery } from '../../rtk/login'
import { ClipLoader } from 'react-spinners'

const Home = () => {
   
  const {data,isLoading,error}=useIsLoginQuery()

  console.log(data,isLoading,error);
  
  if(isLoading){
      return <ClipLoader/>
  }


  return (
    <div >
      {data?.role==="Admin"  ?  <DashboardLayout/>  :  <Dashboard data={data}/>}

    </div>
  )
}

export default Home