
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './postComments.css'
const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER
const baseUrl = process.env.REACT_APP_BASE_URL 

function PostComments({ postId ,commentState}) {
 
  const [comments, setComments] = useState([])


  useEffect(async() => {

      const postCommentsData =  await axios.get(`${baseUrl}/post/${postId}/postComments`)
     
      setComments(postCommentsData.data)

  }, [commentState])

  return (
    <div className='commentDisplaySection'>
      {comments?.map((comment,index) => {
        return (
          <div className='postCommentBox' key={index}>
             <img src={comment.userData.profilePicture ? serverPublic + comment.userData.profilePicture : serverPublic + "defaultProfile.png"} alt=""
                className='commentProfilePicture'/>
            <div className='postComments'  >
             
                <span className='userName' >
                  {comment.userData.firstName}{comment.userData.lastName} 
                </span>
              <span className='commentSpan'>
              {comment.comment.userComment}
              </span>
              
            </div>

          </div>
          )
      })}



    </div>
  )
}

export default PostComments