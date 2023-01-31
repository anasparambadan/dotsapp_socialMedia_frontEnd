import React, { useEffect, useState } from 'react'
import './posts.css'
import Post from '../Post/Post'
import {useSelector} from 'react-redux'
import {useParams} from "react-router-dom"
import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL



const Posts = ({userId}) => {
  
  const{user}=useSelector((state)=>state.authReducer.authData)
  const count = useSelector((state)=>state.postReducer.posts)
  console.log(count,'......................l.................')


 

  let {loading} = useSelector((state)=>state.postReducer)
  let [posts, setPosts] = useState([])
  const params = useParams()
    const fetchPosts = async()=>{
      
const baseUrl = process.env.REACT_APP_BASE_URL
      const data = await axios.get(`${baseUrl}/post/${userId?userId:user._id}/timeline`)
      
      setPosts(data.data)
    }
  
  useEffect((e) =>  {
 
  
    fetchPosts()


 
  }, [count])
  

  if(!posts) return "No posts";

  if(params.id) {posts = posts.filter((post)=>post.userId === params.id)}  
  return (
    <div className="Posts">
        {loading? "fetching posts..":
        posts.map((post, id)=>{
            return <Post data={post} key={id} />
        })}
    </div>
  )
}

export default Posts