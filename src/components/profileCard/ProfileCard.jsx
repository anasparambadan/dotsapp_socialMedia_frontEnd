import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import './ProfileCard.css'
import { Link } from 'react-router-dom'
import { getUser } from '../../api/userRequest'
import { createChat } from '../../api/chatRequest'
import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL

function ProfileCard({ location, userId }) {
  let { user } = useSelector((state) => state.authReducer.authData)
  const posts = useSelector((state) => state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
  const [postCount, setPostCount] = useState(0)

  const [userFound, setUserFound] = useState(user)

  const getCount = async () => {
    const data = await axios.get(`${baseUrl}/post/${userId}/timeline`)
    console.log(data,'data at profilecard............')

    const count = data.data.filter((post) => {
      return post.userId === userId
    })
    console.log(count,'count................')
    setPostCount(count.length)



  }
  console.log(postCount,'postcount..............')





  const userData = async (userId) => {
    const userDetails = await getUser(userId)
    setUserFound(userDetails.data)

  }

  useEffect(() => {
    if (userId !== user._id) {
      userData(userId)
    }
  }, [userId])

  useEffect(() => {
    getCount()
  }, [])






  return (
    <div className='profileCard'>

      <div className="profileImages">
        <img src={userFound.coverPicture ? serverPublic + userFound.coverPicture : serverPublic + "defaultCover.jpg"} alt="cover" />
        <img src={userFound.profilePicture ? serverPublic + userFound.profilePicture : serverPublic + "defaultProfile.png"} alt="profile" />
      </div>
      <div className="profileName">
        <span>{userFound.firstName}{userFound.lastName}</span>
        <span>{userFound.worksAt ? userFound.worksAt : "Add you Status"}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{userId ? userFound.following.length : user.following.length}</span>
            <span>Following</span>
          </div>
          <div className='vl'></div>
          <div className="follow">
            <span>{userId ? userFound.followers.length : user.followers.length}</span>
            <span>Followers</span>
          </div>


          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                {/* <span>{posts.filter((post) => post.userId === userFound._id).length}</span> */}
                <span>{postCount}</span>
                <span>Posts</span>
              </div>
            </>
          )}



        </div>
        <hr />
        {userId !== user._id && location === "profilePage" &&
          <div className='messageIconDiv' >
            <Link to='../chat'> <img src={serverPublic + 'chat.png'} alt="" style={{ width: "2rem" }} onClick={() => createChat(user._id, userId)} /></Link>
            <span>Message </span>
          </div>}
      </div>

      {location === "profilePage" ? "" : <span>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${userFound._id}`}> My Profile </Link></span>}



    </div>
  )
}

export default ProfileCard