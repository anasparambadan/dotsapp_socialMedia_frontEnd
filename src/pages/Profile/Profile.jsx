import React from 'react'
import { useParams } from 'react-router-dom'
import PostSide from '../../components/postSide/PostSide'
import ProfileCard from '../../components/profileCard/ProfileCard'
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft'
import RightSide from '../../components/rightSide/rightSide'
import './profile.css'

const Profile = () => {
  let {id}  = useParams();
  return (
    
    <div className="Profile">
      <div className='profileLeft'>
        <ProfileLeft useId ={id} />
      </div>

        <div className="Profile-center">
            <ProfileCard location = "profilePage" userId ={id}/>
            <PostSide userId ={id}/>
        </div>
     
        <RightSide/>
  

       
    </div>
  )
}

export default Profile