import { useState } from "react";

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

    const handleRegister = (e) => {
        e.preventDefault()
        console.log("register")
    }

    const handleLogin = (e) => {
        e.preventDefault()
        console.log('login')
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