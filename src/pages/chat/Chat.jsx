import React, { useEffect, useState } from 'react'
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import './chat.css'
import LogoSearch from '../../components/logoSearch/LogoSearch'
import { useSelector } from 'react-redux'
import { userChats } from '../../api/chatRequest'
import Conversation from '../../components/conversation/Conversation'
import { Link } from 'react-router-dom'
import { UilSetting } from "@iconscout/react-unicons";
import Chatbox from '../../components/chatBox/Chatbox';
import { io } from "socket.io-client";
import { useRef } from 'react';


const Chat = () => {

  const { user } = useSelector((state) => state.authReducer.authData)
 
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])
  const [sendMessage, setSendMessage] = useState(null)
  const [recieveMessage, setRecieveMessage] = useState(null)
  const socket = useRef()
  const baseUrl = process.env.REACT_APP_BASE_URL

  //send message to socket server
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit('send-message', sendMessage)

    }

  }, [sendMessage])

  useEffect(() => {
    // socket.current = io("http://localhost:8800");
    socket.current = io(baseUrl);
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);

    });
  }, [user]);

  //recieve message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      setRecieveMessage(data)
    })

  }, [])

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id)
        setChats(data)

      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [user])

  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id)
    const online = onlineUsers.find((user) => user.userId === chatMember)
    return online ? true : false;

  }

  return (
    <div className="Chat">

      {/* --------------leftside----------------- */}

      <div className='Left-side-chat'>
        <LogoSearch />
        <div className="Chat-container">
         
          <hr />
          <div className="Chat-list">
            {chats.map((chat) => (
              <div onClick={() => setCurrentChat(chat)}>
                <Conversation data={chat} currentUserId={user._id} online={checkOnlineStatus(chat)} />
              </div>
            ))}
          </div>
        </div>


      </div>
      {/* rightside */}

      <div className='Right-side-chat'>
        <div style={{ width: "20rem", alignSelf: 'flex-end' }}>

          <div className="navIcons">
            <Link to='../home'><img src={Home} alt="" /></Link>
            <UilSetting />
            <img src={Noti} alt="" />
            <Link to='../chat'><img src={Comment} alt="" /></Link>
          </div>
          {/* chat body */}
        </div>
        <Chatbox chat={currentChat} currentUserId={user._id} setSendMessage={setSendMessage} recieveMessage={recieveMessage} />
      </div>

    </div>
  )
}

export default Chat