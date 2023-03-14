import React, { useState } from "react";
import "./adminAuth.css"
import Logo from "../../img/logo3.jpg";
import { useDispatch, useSelector } from 'react-redux'
import { AdminLogIn, logIn } from "../../actions/AuthAction";
import { useNavigate } from "react-router-dom";

const AdminAuth = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector((state) => state.authReducer.loading)

  const [data, setData] = useState({
    userName: '',
    password: '',
  });
const handleSubmit=(e)=>{
  e.preventDefault();

  dispatch(logIn(data))
  
}
const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });
  
};

  return (

    <div className="AdminAuth">
      {/* Left side */}
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Dotsapp</h1>
          <h6>Start connecting your dots..</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>Admin Login</h3>

          <div>
            <input
              type="text"
              placeholder="Admin Name"
              className="infoInput"
              name="userName"
              onChange={handleChange}
              value={data.userName}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              onChange={handleChange}
              value={data.password}
            />

          </div>


          <button className="button infoButton" type="submit" disabled={loading} >
            {loading ? "Loading..." : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
};


export default AdminAuth