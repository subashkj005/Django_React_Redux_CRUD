import React, { useState } from 'react'
import './UserLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {authenticate} from '../features/userlogin/userloginSlice'


function UserLogin(props) {

    
    const apiUrl = 'http://localhost:8000/'

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = () => {
        const userData = {
            'email' : email,
            'password' : password,
        }
        axios.post(`${apiUrl}userlogin/`, userData)
        .then((res)=>{
            if (res.data.message == 'login_success') {
                dispatch(authenticate(res.data.user))
                navigate('userhome')

            }
        })
        .catch((error)=>{
            console.log(error.message);
        })
    }

  return (
    <div className="container">
      <div className="wrapper">
        <div className="title"><span>{props.props.name}</span></div>
        <form action="#">
          <div className="row">
            <i className="fas fa-user"></i>
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" required />
          </div>
          <div className="row">
            <i className="fas fa-lock"></i>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
          </div>
          <div><br></br></div>
          <Link to={'userhome'}></Link>
          <div className="row button">
            <input onClick={handleLogin} style={{textAlign : 'center'}} value="Login" />
          </div>
          
          <div className="signup-link">Not a member? <Link to={'signup'}>Signup now</Link></div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin