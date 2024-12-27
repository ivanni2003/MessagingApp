import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import axios from 'axios'
import './App.css'

import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'

const baseURL = 'http://localhost:3000'

const App = () => {
  const [userData, setUserData] = useState(null)
  const [authHeader, setAuthHeader] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const handleLoginSuccess = (userObj) => {
    setUserData(userObj)

    const authHeader = {
      headers: { Authorization: 'Bearer ' + userObj.userToken },
    }
    setAuthHeader(authHeader)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(userObj)
    )
    navigate('/profile');
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')  // saving session
    if (loggedUser) {
      const userData = JSON.parse(loggedUser)
      setUserData(userData)

      const authHeader = {
        headers: { Authorization: 'Bearer ' + loggedUser.userToken },
      }
      setAuthHeader(authHeader)
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser') 
    setUserData(null)
    setAuthHeader(null)
    navigate('/');
  }

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${baseURL}/api/users/delete/${userData.id}`)

      alert('Account Deleted Successfully')

      window.localStorage.removeItem('loggedUser') 

      setUserData(null)
      setAuthHeader(null)

      navigate('/');

    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div>
      <h1 className="main-header">Social Media App</h1>
      {!userData || location.pathname == '/' ? (
        <Login handleLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <Outlet context={{userData, authHeader}}/> 
          <NavBar handleLogout={handleLogout} handleDeleteAccount={handleDeleteAccount} />
        </div>
      )}
    </div>
  )
}

export default App
