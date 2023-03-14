import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getReportedPost, removePost } from '../../api/postRequest'
import './reportPostTable.css'



const ReportPostTable = () => {
  const [show, setShow] = useState(false)
  const [posts, setPosts] = useState([])
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

  const getPosts = async () => {
    const reposts = await getReportedPost()
    setPosts(reposts.data)
    
  }
  const { user } = useSelector((state) => state.authReducer.authData)
  const userId = user._id

  useEffect(() => {
    getPosts()
  }, [])

  const handleRemove = async(postId) => {
    await removePost(postId, userId)
    getPosts()

    
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Post</th>
            <th>Reported User</th>
            <th>Action</th>
          </tr>
        </thead>
        {posts.map((post, i) => {
          return (
            <tbody key={i}>
              <tr>
                <td className='posimgtd'><img src={serverPublic + post.postId.image} alt="" className='postImage' />
                  <div><span className='descri'>Discription:</span>  {post.postId.desc}</div>
                </td>

                <td>
                  <div className='reportUsers'>
                    <div>
                      <span className='userCount'>{post.users.length} Users reported this post</span>
                    </div>
                    <span id='myBtn' onClick={() => { setShow((prev) => !prev) }}>{!show ? "Show who all reported" : "show less"}</span>
                    {show &&
                      <div id='users'>
                        {post.users.map((user, index) =>
                          <div key={index}>{index + 1}. {user.userId.userName}</div>)}
                      </div>

                    }

                  </div>

                </td>

                <td>
                  <button className={post.postId.isRemoved ? "block" : "Nonblock"} onClick={() => handleRemove(post.postId._id)}>{post.postId.isRemoved ? "Retrive" : "Remove"}</button>
                </td>
              </tr>
            </tbody>
          )
        })}

      </table>
    </div>
  )
}

export default ReportPostTable





