import { useState } from 'react'

import './UserCard.css'

const UserCard = ({userData}) => {
    return (
        <div>
            <p>{userData.username}</p>
            <p>{userData.full_name}</p>
            <p>{userData.location}</p>
            <p>{userData.bio}</p>
            <button>Message</button>
        </div>
    )
}

export default UserCard