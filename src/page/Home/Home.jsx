import React from 'react'
import DashboardLayout from './DashboardLayout'
import Dashboard from './UserDashboard'
import { useIsLoginQuery } from '../../rtk/login'
import { ClipLoader } from 'react-spinners'

const Home = () => {
   
  const {data,isLoading,error}=useIsLoginQuery()

  
  
  if(isLoading){
      return(
        <div className='flex justify-center items-center h-screen'>
           <ClipLoader size={30} color='blue'/>
        </div>
      )
  }

  
  return (
    <div >
      {data?.role==="Admin"  ?  <DashboardLayout/>  :  <Dashboard data={data}/>}

    </div>
  )
}

export default Home