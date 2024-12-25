import axios from 'axios';
import { useState } from "react";

const baseURL = 'http://localhost:3000'

const Login = ({user, handleLoginSuccess}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
        console.log(username)
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        const reqData = {username, password}
        console.log(password)

        try {
          await axios.post(`${baseURL}/api/users/register`, reqData)
          console.log(added)
        } catch (error) {
          console.log(error)
        }
       
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log(username + password + 'added')
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