import axios from 'axios'

const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })


export const logIn = (formData) => API.post('/login', formData)
export const signUp = (formData) => API.post('/register', formData)
export const otpVerify =async (userId,otp) => await API.post('/otpVerify', {userId,otp})
export const resendOtp = (userId,userEmail) =>API.post('./resendOtp',{userId:userId,userName:userEmail})

export const adminLogIn =async (formData) => {
    await API.post('/adminLogin',formData)}