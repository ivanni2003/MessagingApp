import { useState } from 'react'
import { Outlet } from "react-router-dom";
import './App.css'

import Login from './components/Login/Login'

const App = () => {
  const [user, setUser] = useState(null)

  const handleLoginSuccess = (username) => {
    setUser("not null")
  }

  return (
    <div>
      <h1 className='main-header'> Messaging App </h1>
      {!user ?
        <Login user={user} handleLoginSuccess={handleLoginSuccess}/> : <Outlet />
      }
      
    </div>
  
  )
}

export default App
