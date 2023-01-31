import React from 'react'
import Posts from '../posts/Posts'
import PostShare from '../postShare/PostShare'
import './postSide.css'

function PostSide({userId}) {
  return (
    <div className='postSide'>
        <PostShare/>
        <Posts userId = {userId}/>
    </div>
  )
}

export default PostSide