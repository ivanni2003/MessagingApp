import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet } from 'react-router-dom'
import './App.css'

import Login from './components/Login/Login'
import NavBar from './components/NavBar/NavBar'

const App = () => {
  const [userData, setUserData] = useState(null)

  const navigate = useNavigate()
  const location = useLocation()

  const handleLoginSuccess = (userObj) => {
    setUserData(userObj)
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
    }
  }, [])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser') 
    setUserData(null)
    navigate('/');
  }

  return (
    <div>
      <h1 className="main-header">Social Media App</h1>
      {!userData || location.pathname == '/' ? (
        <Login handleLoginSuccess={handleLoginSuccess} />
      ) : (
        <div>
          <Outlet /> 
          <NavBar handleLogout={handleLogout} />
        </div>
      )}
    </div>
  )
}

export default App
