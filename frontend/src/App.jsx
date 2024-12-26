import { useState, useEffect } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'

import Login from './components/Login/Login'

const App = () => {
  const [userData, setUserData] = useState(null)

  const handleLoginSuccess = (userObj) => {
    setUserData(userObj)
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')  // saving session
    if (loggedUser) {
      const userData = JSON.parse(loggedUser)
      setUserData(userData)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser') 
    setUserData(null)
  }

  return (
    <div>
      <h1 className='main-header'> Messaging App </h1>
      {!userData ?
        <Login handleLoginSuccess={handleLoginSuccess}/> : <button onClick={handleLogout}>Log Out</button>
      }
      
    </div>
  
  )
}

export default App
