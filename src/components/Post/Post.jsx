import React, { useState } from 'react'
import './Post.css'
import Comment from '../../img/comment.png'
import Share from '../../img/share.png'
import options from '../../img/3dots.png'
import Heart from '../../img/redlike4.png'
import NotLike from '../../img/notlike.png'
import { useDispatch, useSelector } from 'react-redux'
import { commentPost, likePost,reportPost } from '../../api/PostRequest'
import PostComments from '../postComments/PostComments'
import { useEffect } from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { removePost } from '../../actions/postAction'







const Post = ({ data }) => {
  console.log(data,'data................')

  const { user } = useSelector((state) => state.authReducer.authData)

  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)

  const [commentState, setCommentState] = useState({})
  const [comment, setComment] = useState(false)
  const [commentData, setCommentData] = useState({ userComment: "", userId: user._id })
  const [commentCount, setCommentCount] = useState('')
  const dispatch = useDispatch()



  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    likes ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }
  const handleChange = (e) => {
    setCommentData({ ...commentData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    commentPost(data._id, commentData).then(async (response) => {

      await setCommentState(response.data)
      setCommentCount(commentCount + 1)
      resetForm()

    })


  }
  const resetForm = () => {
    setCommentData({ userComment: '', userId: user._id })


  }
  useEffect(() => {
    setCommentCount(data.comment.length)
  }, [data])


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    
  };
  const postDelete = (e)=>{
    e.preventDefault()
    // removePost(data._id,user._id)
    dispatch(removePost(data._id,user._id))
    
    setAnchorEl(null);
  }
  const postReport =()=>{
    reportPost(data._id,user._id)
    setAnchorEl(null);
  }
  

    return (

      <div className="Post">
        <div className='postTop'>

          <div className='postUserDetails'>
            <img className='postProfileImg' src={data.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + data.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="" />
            <div className='userName'>
              {data.firstName}{data.lastName}
            </div>
          </div>
          
           
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                 <img className='options' src={options} alt="" />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                {data.userId === user._id &&<MenuItem onClick={postDelete}>Delete</MenuItem>}
               {data.userId !== user._id && <MenuItem onClick={postReport}>Report</MenuItem>}
                
              </Menu>
            </div>


          


        </div>


        <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="" />


        <div className="postReact">
          <img src={liked ? Heart : NotLike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
          <div style={{ display: "flex", gap: "0.5rem", alignItems: 'center', cursor: 'pointer' }} onClick={() => { setComment((prev) => !prev) }} >
            <img src={Comment} alt="" style={{ cursor: "pointer" }} />
            <span>{commentCount} Comments</span>
          </div>
          {/* <img src={Share} alt="" /> */}
        </div>



        <span style={{ color: "var(--gray)", fontSize: '12px' }}>{likes} likes</span>

        <div className="detail">
          <span><b>{data.name}</b></span>
          <span> {data.desc}</span>
        </div>
        <form action="" className='commentForm' onSubmit={handleSubmit}>

          {comment &&
            <div className='commentUser'>
              <img className='commentProfilePicture' src={user.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="" />
              <div className="buttonIn">

                <input type="text"
                  className='cinput'
                  name='userComment'
                  placeholder='Enter your comment'
                  onChange={handleChange}
                  value={commentData.userComment} />

                <button className="cbutton" >
                  <img className='sendBtnImg' src={process.env.REACT_APP_PUBLIC_FOLDER + "send.png"} alt="" />
                </button>

              </div>

            </div>
          }

        </form>



        {/* <PostComments postId = {data._id} /> */}

        {comment && <PostComments postId={data._id} commentState={commentState} />}



      </div>
    )
  }

  export default Post