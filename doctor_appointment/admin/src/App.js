import React, { useContext } from 'react'
import './index.css';
import Login from './pages/Login';
import {ToastContainer} from "react-toastify"
import { AdminContext } from './context/AdminContext';
import NavBar from './components/NavBar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import DashBoard from "./pages/Admin/DashBoard"
import AllAppointments from "./pages/Admin/AllAppointments"
import AddDoctor from "./pages/Admin/AddDoctor"
import DoctorList from "./pages/Admin/DoctorList"

const App = () => {

    const {aToken} = useContext(AdminContext)

  return aToken ? (
    <div>
      <ToastContainer/>
      <NavBar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<DashBoard/>}/>
          <Route path='/all-appointments' element={<AllAppointments/>}/>
          <Route path='/add-doctor' element={<AddDoctor/>}/>
          <Route path='/doctor-list' element={<DoctorList/>}/>
        </Routes>
      </div>
    </div>
  ) 
  :(
  <>
  <Login/>
   <ToastContainer/>
  </>
  )
}

export default App
