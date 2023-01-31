import React from 'react'
import PostSide from '../../components/postSide/PostSide'
import ProfileSide from '../../components/profileSide/ProfileSide'
import RightSide from '../../components/rightSide/rightSide'

import './Home.css'


function Home() {
  return (
    <div className='Home'>
      <ProfileSide/>
     < PostSide/>
     
      <div className='rightSide'><RightSide/></div>
    </div>
  )
}

export default Home