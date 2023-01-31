import React, { useState } from 'react'
import logo from '../../img/logo3.jpg'
import { UilSearch } from '@iconscout/react-unicons'
import './logoSearch.css'
import { searchUsers } from '../../api/userRequest'
import { Link } from 'react-router-dom'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

const LogoSearch = () => {

  const [nameSearch, setNameSearch] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState([])

  const handleChange = (e) => {
    setNameSearch(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(nameSearch === ""){
      setShowResult(false)
    }
    else{
      const usersFound = await searchUsers(nameSearch)
      console.log(usersFound.data, 'usersFound at logosearch....')
      setResult(usersFound.data)
      setShowResult(true)
    }
   
  }
  const goToProfile =(id)=>{
    console.log(id,'id of user..............')
  }

  return (
    <div>


      <div className='logoSearch'>
        <div>
        <Link to = '../'><img className='searchLogo' src={logo} alt="logo" /></Link>  
        </div>
        <div className='searchDiv'>
        <form onSubmit={handleSubmit}>
          <div className="search">



            <input type="text"
              name='nameSearch'
              placeholder='#Find whats new'
              onChange={handleChange}
              value={nameSearch} />


            <div className='s-icon'>
              <UilSearch />
            </div>


          </div>
        </form>
        </div>


      </div>

      
      {showResult&&
       <div className='searchResults'>
      {result.map((users) => {
        return (
          <Link to = {`../profile/${users._id}` } className = "profilelink" style={{textDecoration:"none", color:"black"}} >
            <div className='singleResult'  key={users._id}>
              <img src={users.profilePicture ? serverPublic + users.profilePicture : serverPublic + "defaultProfile.png"} alt=""
                className='resultProfilePictur' />
              <span>{users.firstName}{users.lastName}</span>
              
            </div>
            </Link>
           

          
        )

      })
      }
      </div>}
    </div>
  )
}

export default LogoSearch