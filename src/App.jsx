import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home/Home'
import Layout from './component/Layout'
import About from './page/About/About'
import EmployeeList from './page/Employee/EmployeeList'
import EmployeeDetail from './page/Employee/EmployeeDetail'
import EmployeeAdd from './page/Employee/EmployeeAdd'
import EmployeeWorkAddForm from './page/Employee/viewProfile/WorkAddForm'
import EmployeeBankInfo from './page/Employee/viewProfile/BankAdd'
import Policy from './page/Policy/Policy'
import EmployeeAddPolicy from './page/Policy/AddPolicy'
import EmployeeWork from './page/Employee/EmployeeWork'
import EmployeeWorkType from './page/Employee/EmployeeWork'
import AuthLogin from './page/Auth/Login'
import ProtectedAuth from './page/Auth/ProtectedAuth'

const App = () => {
  return (
    <div>
      <Routes>
        {/* Layout Route */}
        <Route element={<ProtectedAuth isPrivate={true} />}>

        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="about" element={<About />} />

          <Route path='/employee/list' element={<EmployeeList/>}/>
          <Route path='/employee/details/:id' element={<EmployeeDetail/>}/>
          <Route path='/employee/add' element={<EmployeeAdd/>}/>
          <Route path='/employee/work' element={<EmployeeWorkType/>}/>
          <Route path='/employee/work/:id' element={<EmployeeWorkAddForm/>}/>
          <Route path='/employee/bank/:id' element={<EmployeeBankInfo/>}/>
          <Route path='/employee/policy' element={<Policy/>}/>
          <Route path='/employee/add/policy' element={<EmployeeAddPolicy/>}/>
         
   




        </Route>

        </Route>


        <Route element={<ProtectedAuth isPrivate={false} />}>
        <Route  path='/login' element={<AuthLogin/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
