import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })

export const getTimelinePosts = (id)=> API.get(`/post/${id}/timeline`)
export const likePost = (id, userId)=> API.put(`post/${id}/like`,{userId: userId})
export const commentPost = (id,commentData) => API.put(`post/${id}/comment`,{commentData}).then((response) => {return response})
export const postComments = (postId)=> API.get(`/post/${postId}/postComments`)
export const deletePost = (postId,userId)=> API.post(`/post/${postId}`,{userId:userId})
export const reportPost = (postId,userId)=> API.post(`/post/${postId}/report`,{userId:userId})
export const getReportedPost = ()=> API.get('/post/get/reported')
export const removePost = (postId,userId)=> API.post(`/post/${postId}/remove`,{userId:userId})

