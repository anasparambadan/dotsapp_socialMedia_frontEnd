import "./App.css"
import { Routes,Route,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './pages/home/Home'
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/chat/Chat";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import AdminHome from "./pages/adminHome/AdminHome";
import AdminAuth from "./pages/adminAuth/AdminAuth";




function App() {
  const user = useSelector((state)=>state.authReducer.authData)
  console.log(user,';;;;;user.........')

  return (
    <div className="App">
        <div className="blur" style={{top:'-18%', right:'0%' }}></div>
        <div className="blur" style={{top:'36%', left:'-8rem'}}></div>
        
        <Routes>
          {/* <Route path='/' element = {user?.user.verified?<Navigate to = "home"/>:<Navigate to = 'auth'/> }/> */}
          <Route path='/' element = {user?.user.verified?<Navigate to = "home"/>:<Navigate to ='/login'/> }/>
          <Route path='/login' element = {user?.user.verified?<Navigate to = "../home"/>:<Login/> }/>
          <Route path='/signup' element = {user?.user.verified?<Navigate to = "../home"/>:<SignUp/> }/>
          <Route path = '/home' element = {user?.user.verified? <Home/>:<Navigate to ='../login'/> }/>
          {/* <Route path='/auth' element = {user?.user.verified?<Navigate to = '../home'/>:<Login/>}/> */}
          <Route path='/profile/:id'  element = {user?.user.verified?<Profile/>:<Navigate to = "../login"/>}/>
          <Route path='/chat'  element = {user?.user.verified?<Chat/>:<Navigate to = "../login"/>}/>
          <Route path='/admin'  element = {user?.user.isAdmin?<AdminHome/>:<AdminAuth/>}/>
        </Routes>
    </div>
  );
}

export default App;
