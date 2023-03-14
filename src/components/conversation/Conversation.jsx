import React, { useEffect, useState } from 'react'
import { getUser } from '../../api/userRequest'


const Conversation = ({ data, currentUserId, online }) => {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
    const [userData, setUserData] = useState(null)
    useEffect(() => {
        const userId = data.members.find((id) => id !== currentUserId)
        const getUserData = async () => {

            try {
                const { data } = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }
        getUserData()
    }, [])

    return (
        <>
        <div className='follower conversation'>
            <div>
                {online && <div className="online-dot"></div>}
            <img src={userData?.profilePicture?serverPublic + userData.profilePicture : serverPublic + "defaultProfile.png"} alt="" className='followerImage' style={{width:'50px', height:'50px'}}></img>
            <div className="name" style={{fontSize:"0.8rem"}}>
                <span>{userData?.firstName} {userData?.lastName}</span>
                <span>{online? "Online":"Offline"}</span>
            </div>
            </div>
        </div>
        <hr style={{ width: "85%", border: "0.1px solid #ececec" }}/>
        </>
    )
}

export default Conversation