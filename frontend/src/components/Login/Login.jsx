import axios from 'axios'
import { useState } from "react"

import './login.css'

const baseURL = 'http://localhost:3000'

const Login = ({handleLoginSuccess}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        const reqData = {username, password}
        
        try {
          const response = await axios.post(`${baseURL}/api/users/register`, reqData)
    
          handleLoginSuccess(response.data)
    
        } catch (error) {
          console.log(error)
          alert('Username already in use.')
        }
       
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const reqData = {username, password}

        try {
          const response = await axios.post(`${baseURL}/api/users/login`, reqData)

          handleLoginSuccess(response.data)
        
        } catch (error) {
          console.log(error)
          alert('Invalid username/password.')
        }

    }

    return (
      <div className='login-container'>
        <form>
          <div>
            <div className='login-form-label'>
              <label htmlFor="username">Username:</label>
            </div>
                <input
                className='login-form-input'
                type='text'
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder='Enter Username'
                /> 
            <div className='login-form-label'>
              <label htmlFor="password">Password:</label>
            </div>
                <input
                className='login-form-input'
                type='password'
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter Password'
                />      
          </div>  
            <div>
              <button className='login-form-button' onClick={handleLogin}>Login</button>
            </div>
            <div>
              <button className='login-form-button' onClick={handleRegister}>Register</button>
            </div>
        </form>
      </div>
    )
}

export default Login