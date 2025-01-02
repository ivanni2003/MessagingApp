import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'

import axios from 'axios'
import { io } from 'socket.io-client'

import './App.css'

import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'

const baseURL = 'http://localhost:3000'

const App = () => {
  const [userData, setUserData] = useState(null)
  const [authHeader, setAuthHeader] = useState(null)
  const [socket, setSocket] = useState(null)
  const [activeUserIDs, setActiveUserIDs] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')  // preserved session
    if (loggedUser) {
      const userObj = JSON.parse(loggedUser)
      setUserData(userObj)

      const authHeader = {
        headers: { Authorization: 'Bearer ' + userObj.userToken },
      }
      setAuthHeader(authHeader)

      if (authHeader && userObj) {
        const userSocket = io(baseURL, {
          query: {userID: userObj.userID}
        })
        userSocket.connect()

        userSocket.on("getActiveUsers", (userIDs) => {
          setActiveUserIDs(userIDs)
        })

        setSocket(userSocket)
      }

    }
  }, [])

  const handleLoginSuccess = (userObj) => {
    setUserData(userObj)

    const authHeader = {
      headers: { Authorization: 'Bearer ' + userObj.userToken },
    }
    setAuthHeader(authHeader)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(userObj)
    )


    if (authHeader) {
      const userSocket = io(baseURL, {
        query: {userID: userObj.userID}
      })
      userSocket.connect()

      userSocket.on("getActiveUsers", (userIDs) => {
        setActiveUserIDs(userIDs)
   
      })
      setSocket(userSocket)
    }

    navigate('/profile');
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser') 
    setUserData(null)
    setAuthHeader(null)

    if (socket) {
      socket.disconnect()
    }
    setSocket(null)

    navigate('/');
  }

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${baseURL}/api/users/delete/${userData.id}`)

      alert('Account Deleted Successfully')

      window.localStorage.removeItem('loggedUser') 

      setUserData(null)
      setAuthHeader(null)

      if (socket) {
        socket.disconnect()
      }
      setSocket(null)

      navigate('/');

    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div>
      <h1 className="main-header">Messaging App</h1>
      {!userData || location.pathname == '/' ? (
          <Login handleLoginSuccess={handleLoginSuccess} />   
      ) : (
        <div>
            <NavBar/>
            <Outlet context={{userData, authHeader, socket, activeUserIDs, handleLogout, handleDeleteAccount}}/> 
        </div>
      )}
    </div>
  )
}

export default App
