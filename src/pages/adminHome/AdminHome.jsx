import React, { useState } from 'react'
import AdminCommands from '../../components/adminCommands/AdminCommands'
import AdminControls from '../../components/adminControls/AdminControls'
import Navbar from '../../components/navbarAdmin/Navbar'
import './adminHome.css'

const AdminHome = () => {
  const [select, setSelect] = useState('users')


  return (
    <div className='adminHome'>
      <Navbar />
      <div className='controllers' style={{display:'flex',alignItems:'center'}}>
        <AdminCommands  setSelect={setSelect} />
        <AdminControls select={select} />
      </div>
    </div>
  )
}

export default AdminHome