import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })


export const userChats = (id) => API.get(`/chat/${id}`)
export const createChat = (sender,reciver) => API.post('/chat',{senderId:sender, receiverId:reciver})