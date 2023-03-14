import React, { useState } from 'react'
import './login.css'
import Logo from "../../img/logo3.jpg";
import { useFormik } from "formik"
import { loginSchema } from "../../schemas";
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import { logIn } from "../../actions/AuthAction";
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.authReducer.loading)
    const userData = useSelector((state) => state.authReducer.authData)
    const [isSignUp, setIsSignUp] = useState(false)
    const [isOtp, setisOtp] = useState(false)

    const initialValues = {
        userName: '',
        password: '',
    }
    const { values, errors, touched, handleBlur, handleChange, handleSubmit, handleReset } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async(values, action) => {
            
         const response =  await dispatch(logIn(values))
         
           if (response.success) {
            toast.success(response.message);
          }
          else {
            toast.error(response.message);
    
          }

          
            
            action.resetForm()
        },
        onClick: (values, action) => {
            action.resetForm()
        }
    })
    const handleLogin = () => {
        navigate('/signup')
    }
    return (

        <div className="Auth">
            <Toaster/>
            {/* Left side */}
            <div className="a-left">
                <img src={Logo} alt="" />
                <div className="Webname">
                    <h1>Dots</h1>
                    <h6>Start connecting your dots..</h6>
                </div>
            </div>
            {/* Right Side */}
            <div className="a-right">
                <form className="infoForm authForm" onSubmit={handleSubmit}>
                    <h3>Login</h3>
                    {/* <h3>{isSignUp ? "Sign Up" : isOtp ? "Enter OTP" : "Log In"}</h3> */}
                    <div className="inputfields">
                        <div className="inputname">
                            <input
                                type="text"
                                placeholder="Email"
                                className="infoInput"
                                name="userName"
                                id="userName"
                                value={values.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.userName && touched.userName ? (
                                <span className="form-error">{errors.userName}</span>) : null}
                        </div>
                    </div>
                    <div className="inputfields">
                        <div className="inputname">
                            <input
                                type="password"
                                placeholder="Password"
                                className="infoInput"
                                name="password"
                                id="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.password && touched.password ? (
                                <span className="form-error">{errors.password}</span>) : null}
                        </div>
                    </div>


                    <div>
                        <span style={{ fontSize: '14px', cursor: "pointer" }} onClick={handleLogin}>
                           Don't have an account? <span className='link'>Sign Up here..!"</span> 
                        </span>
                    </div>
                    <button className="button infoButton" type="submit" disabled={loading} >
                        {loading ? "Loading..." : 'Sign in'}
                    </button>
                    {/* <button className="button infoButton" type="submit">Sign in</button> */}
                </form>
            </div>
        </div>
    );
}

export default Login