import axios from 'axios'
import { useState } from "react"

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
          const userData = response.data

          handleLoginSuccess(userData)
    
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
          const userData = response.data

          handleLoginSuccess(userData)
        
        } catch (error) {
          console.log(error)
          alert('Invalid username/password.')
        }

    }

    return (
      <div className='login-form'>
        <form>
          <div>
            <label htmlFor="username">Username:
                <input
                type='text'
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder='Enter Username'
                /> 
            </label>

          </div>
          <div>
            <label htmlFor="password">Password:
                <input
                type='password'
                id="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder='Enter Password'
                /> 
            </label>
         
          </div>
          <div>
            <button onClick={handleRegister}>Register</button>
          </div>
          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
        </form>
      </div>
    )
}

export default Login