// import React, { useState } from "react";
// import "./auth.css";
// import Logo from "../../img/logo3.jpg";
// import { useDispatch, useSelector } from 'react-redux'
// import { logIn, otpVerification, signUp } from "../../actions/AuthAction";
// // import {useFormik} from "formik"
// // import * as Yup from "yup"

// const Auth = () => {
//   const dispatch = useDispatch()
//   const loading = useSelector((state)=>state.authReducer.loading)
//   const userData = useSelector((state)=>state.authReducer.authData) 
//   const [isSignup, setisSignup] = useState(false)
//   const [isOtp, setIsOtp] = useState(false)
//   const [data, setdata] = useState({ firstName: "", lastName: "", password: "", confirmpass: "", userName: "", otp : "" })
//   const [confirmPass, setConfirmPass] = useState(true)
//   const userId = userData?.user._id
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (isSignup) {
//       console.log('isSignup.....')
//        if(e.password === e.confirmpass){
//         dispatch(signUp(data))
//       setisSignup(false)
//       setIsOtp(true)
//     }
//       else{
//         console.log('loginnnnnnnnn.....')
//         setConfirmPass(false)
//       }

//     }
//     else if(isOtp){
//       console.log('otppppppppppppp.....')
//       dispatch(otpVerification(userId,data.otp))
//     }
//     else {
//       dispatch(logIn(data))
//     }
    
//   }

//   const handleChange = (e) => {
//     setdata({ ...data, [e.target.name]: e.target.value })
//   }

//   const resetForm = () => {
//     setConfirmPass(true);
//     setdata({ firstName: "", lastName: "", password: "", confirmpass: "", userName: "" , otp :""})

//   }


//   return (
//     <div className="Auth">

//       {/* leftside */}
//       <div className="a-left">
//         <img src={Logo} alt="" />
//         <div className="Webname">
//           <h1>Dots</h1>
//           <h6>Start connecting your dots..</h6>
//         </div>
//       </div>

//       {/* right side */}

//       <div className="a-right">
//         <form className="infoForm authForm"  onSubmit={handleSubmit} >
//           <h3>{isSignup ? "Sign up" : isOtp ? "Enter OTP":"Log in"}</h3>

//           {isSignup && !isOtp &&
//             <div>
//               <input
//                 type="text"
//                 placeholder="First Name"
//                 className="infoInput"
//                 name="firstName"
//                 onChange={handleChange}
//                 value={data.firstName}
//               />
//               {/* {formik.touched.firstName && formik.errors.firstName?<p>{formik.errors.firstName}</p>:null} */}
//               <input
//                 type="text"
//                 placeholder="Last Name"
//                 className="infoInput"
//                 name="lastName"
//                 onChange={handleChange}
//                 value={data.lastName}
//               />
//               {/* {formik.touched.lastName && formik.errors.lastName?<p>{formik.errors.lastName}</p>:null} */}
//             </div>
//           }

//          {!isOtp &&
//           <div>
//             <input
//               type="email"
//               className="infoInput"
//               name="userName"
//               placeholder="Email"
//               onChange={handleChange}
//               value={data.userName}
//             />
//             {/* {formik.touched.userName && formik.errors.userName?<p>{formik.errors.userName}</p>:null} */}
//           </div>}

//          {!isOtp &&
//           <div>
//             <input
//               type="password"
//               className="infoInput"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               value={data.password}
//             />
//             {/* {formik.touched.password && formik.errors.password?<p>{formik.errors.password}</p>:null} */}


//             {isSignup && !isOtp &&
//               <input
//                 type="password"
//                 className="infoInput"
//                 name="confirmpass"
//                 placeholder="Confirm Password"
//                 onChange={handleChange}
//                 value={data.confirmpass}
//               />
//             }
//             {/* {formik.touched.confirmpass && formik.errors.confirmpass?<p>{formik.errors.confirmpass}</p>:null} */}
//           </div>}

//           {isOtp && <div>
//             <input
//               type="text"
//               className="infoInput"
//               name="otp"
//               placeholder="OTP"
//               onChange={handleChange}
//               value={data.otp}
             
//             />
//             {/* {formik.touched.otp && formik.errors.otp?<p>{formik.errors.otp}</p>:null} */}

//           </div>
// }


//           <span style={{ display: confirmPass ? "none" : "block", color: "red", fontSize: "12px", alignSelf: "flex-end", marginRight: "5px" }} >
//             * Confirm password is not same
//           </span>

//           <div>
//             {/* <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => { setisSignup((prev) => !prev) }}> */}
//             <span style={{ fontSize: '12px', cursor: "pointer" }} onClick={() => { setisSignup((prev) => !prev); resetForm() }}>
//             {/* setIsOtp((prev)=>!prev) */}
//               {isSignup ? "Already have an acconunt? Login here" :isOtp? "Not recieved OTP ? Resend here": "Don't have an account? Sign Up here"}
//             </span>
//           </div>
//           <button className="button infoButton" type="submit" disabled={loading}>{loading?"loading..." :isSignup ? "Sign Up" : isOtp? "Submit":"Log In"}</button>
//         </form>
//       </div>

//     </div>
//   );
// };


// export default Auth;