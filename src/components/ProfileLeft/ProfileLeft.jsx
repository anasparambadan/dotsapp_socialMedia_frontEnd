import React from 'react'

import InfoCard from '../InfoCard/InfoCard'
import LogoSearch from '../logoSearch/LogoSearch'
const ProfileLeft = ({userId}) => {
  return (
   <div className="ProfileSide">
       <LogoSearch/>
       <InfoCard/>
      
   </div>
  )
}

export default ProfileLeft