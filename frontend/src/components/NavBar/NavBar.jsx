import { useNavigate } from 'react-router-dom'

import './NavBar.css'
const NavBar = () => {

    const navigate = useNavigate()
    return (
        <div className='nav-bar-container'>
          <button className='nav-button' onClick={() => navigate('/profile')}>Profile</button>
          <button className='nav-button' onClick={() => navigate('/messages')}>Messages</button>
          <button className='nav-button' onClick={() => navigate('/search')}>Search</button>
        </div>
    )
}

export default NavBar