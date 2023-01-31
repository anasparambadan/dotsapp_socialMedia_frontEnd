import React from 'react'
import { useParams } from 'react-router-dom'
import PostSide from '../../components/postSide/PostSide'
import ProfileCard from '../../components/profileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/rightSide/rightSide'
import './Profile.css'

const Profile = () => {
  let {id}  = useParams();
  console.log(id, 'user id at profile.jsc')
 
  return (
    
    <div className="Profile">
      
        <ProfileLeft useId ={id} />

        <div className="Profile-center">
            <ProfileCard location = "profilePage" userId ={id}/>
            <PostSide userId ={id}/>
        </div>

        <RightSide/>
    </div>
  )
}

export default Profile