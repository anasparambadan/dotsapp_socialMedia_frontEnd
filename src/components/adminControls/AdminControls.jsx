import React, { useEffect } from 'react'
import UserTable from '../userTable/UserTable'
import ReportPostTable from '../reportPostTable/ReportPostTable'
import './adminControls.css'

const AdminControls = ({ select }) => {
  useEffect(() => {
  }, [select])

  return (
    <div className="adminControlls">

      {select == "users" ? < UserTable/> : ''}
      {select == "report" ? <ReportPostTable /> : ''}
    </div>
  )
}

export default AdminControls