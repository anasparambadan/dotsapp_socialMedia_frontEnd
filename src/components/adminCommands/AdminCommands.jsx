import React from 'react'
import './adminCommands.css'
import { UserExclamation } from 'tabler-icons-react';
import { FileReport } from 'tabler-icons-react';
import { Logout } from 'tabler-icons-react';
import { logOut } from '../../actions/AuthAction';
import { useDispatch } from 'react-redux';


const AdminCommands = ({ setSelect }) => {

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className='Leftbar'>
      <div className='adminOptioins'>
        <div className='iconss' onClick={() => setSelect("users")} >
          <UserExclamation />
          <p>All users</p>
        </div>
        <div className='iconss' onClick={() => setSelect("report")}>
          <FileReport />
          <p>Reported Posts</p>
        </div>
        <div className='iconss' onClick={handleLogOut} >
          <Logout />
          <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default AdminCommands