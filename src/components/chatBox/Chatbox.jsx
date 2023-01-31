import React, { useEffect, useState } from 'react'
import { addMessage, getMessages } from '../../api/messageRequest'
import { getUser } from '../../api/userRequest'
import './chatBox.css'
import { format } from 'timeago.js'
import InputEmoji from 'react-input-emoji'
import { useRef } from 'react'

const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

const Chatbox = ({ chat, currentUserId, setSendMessage, recieveMessage }) => {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scroll = useRef()

    useEffect(() => {
        if (recieveMessage !== null && recieveMessage.chatId === chat._id) {
            setMessages([...messages, recieveMessage])
        }

    }, [recieveMessage])

    //fetching data for header

    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUserId)
        const getUserData = async () => {

            try {
                const { data } = await getUser(userId)
                setUserData(data)
            } catch (error) {
                console.log(error)
            }
        }
        if (chat !== null) getUserData()

    }, [chat, currentUserId])

    // fetching data for messages

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const { data } = await getMessages(chat._id)

                setMessages(data)

            } catch (error) {
                console.log(error)
            }

        }
        if (chat !== null) { fetchMessages() }
    }, [chat])

    const handleChange = (newMessage) => {
        setNewMessage(newMessage)
    }


    const handleSend = async (e) => {
        e.preventDefault();
        const message = {
            chatId: chat._id,
            senderId: currentUserId,
            text: newMessage,
        }

        //send messgae to database

        try {
            const { data } = await addMessage(message);
            setMessages([...messages, data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
        //send message to socket server
        const receiverId = chat.members.find((id) => id !== currentUserId)
        setSendMessage({ ...message, receiverId })
    }

    // allways scroll to last messge

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])


    return (
        <>
            <div className="ChatBox-container">
                {chat ? (
                    <>
                        <div className="chat-header">
                            <div className="follower">

                                <div>
                                    <img src={userData?.profilePicture ? serverPublic + userData.profilePicture : serverPublic + "defaultProfile.png"} alt="" className='followerImage' style={{ width: '50px', height: '50px' }}></img>
                                    <div className="name" style={{ fontSize: "0.8rem" }}>
                                        <span>{userData?.firstName} {userData?.lastName}</span>

                                    </div>
                                </div>

                            </div>
                            <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
                        </div>

                        {/* chatbox messages*/}
                        <div className="chat-body">
                            {messages.map((message) => (
                                <>
                                    <div ref={scroll} className={message.senderId == currentUserId ? "message own" : "message"}>
                                        <span>{message.text}</span>
                                        <span>{format(message.createdAt)}</span>
                                    </div>
                                </>
                            ))}
                        </div>
                        <div className="chat-sender">
                            <div></div>

                            <InputEmoji
                                value={newMessage}
                                onChange={handleChange} />
                            <div className='button send-button' onClick={handleSend}>Send</div>

                        </div>
                    </>
                ) : (
                    <span className='chatbox-empty-message'>Select a chat to start conversation</span>
                )}

            </div>

        </>
    )
}

export default Chatbox