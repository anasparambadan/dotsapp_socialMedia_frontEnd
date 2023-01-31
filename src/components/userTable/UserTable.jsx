import React, { useEffect, useState } from 'react'
import { block, getAllUsers } from '../../api/userRequest'
import './UserTable.css'


const UserTable = () => {


  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const [userss, setUser] = useState([])

  const [blocked, setBlocked] = useState(null)

  const handleBlock = async (id) => {
    const userBlocked = await block(id)
    console.log(userBlocked, '-----------block response')
    getAll()

  }

  const getAll = async () => {
    const users = await getAllUsers()
    console.log(users.data)
    setUser(users.data)
  }
  useEffect(() => {
    getAll()
  }, [])
  return (
    <div className="allLoginUsers">
      <div className='adminUsersList' >
        <table>
          <thead>
            <tr>
              <th>Profile</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Followers</th>
              <th>Following</th>
              <th>Block / Unblock</th>
            </tr>
          </thead>
          {userss.map((user, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td><img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt=""
                    className='logedUser' /></td>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.userName}</td>
                  <td>{user.followers.length}</td>
                  <td>{user.following.length}</td>
                  <td>{user.isBlocked === false ?
                    <button className='Nonblock' onClick={() => handleBlock(user._id)}>Block</button> : <button className='block' onClick={() => handleBlock(user._id)}>Unblock</button>}
                  </td>
                </tr>
              </tbody>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default UserTable