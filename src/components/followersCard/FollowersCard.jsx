import React, { useState } from 'react'
import './followersCard.css'
import User from '../User/User'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getAllUsers } from '../../api/userRequest'


function FollowersCard() {

    const {user} = useSelector((state)=>state.authReducer.authData)
    const [persons, setPersons] = useState([])


   useEffect(() => {
     const fetchPersons = async()=>{
        const {data} = await getAllUsers();
        setPersons(data)
        
     }
     fetchPersons()
   
     
   },[])
   
  return (
    <div className='followersCard'>
        <h3>People you may know</h3>
        {persons.map((person,index)=>{
          
            if(person._id !== user._id && !person.isAdmin){
              
         

                return(
                    
                  <User person = {person}  key = {index}/>
                )
            
            }
        })}
       

    </div>
  )
}

export default FollowersCard