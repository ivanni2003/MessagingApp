import { useNavigate } from 'react-router-dom'

const NavBar = ({handleLogout, handleDeleteAccount}) => {

    const navigate = useNavigate()
    return (
        <div className='nav-options'>
          <h2>NavBar</h2>
          <button onClick={handleLogout}>Log Out</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
          <button onClick={() => navigate('/profile')}>Profile</button>
          <button onClick={() => navigate('/posts')}>Posts</button>
          <button onClick={() => navigate('/messages')}>Messages</button>
          <button onClick={() => navigate('/search')}>Search</button>
        </div>
    )
}

export default NavBar