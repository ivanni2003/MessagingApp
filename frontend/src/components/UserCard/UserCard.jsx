import { useState } from 'react'

import UserPopUp from '../UserPopUp/UserPopUp'

import './UserCard.css'

const UserCard = ({userData}) => {
    const [popUpVisible, setPopUpVisible] = useState(false)

    return (
        <div>
            <p>{userData.username + ': ' + userData.full_name}</p>
            <UserPopUp userData={userData} isVisible={popUpVisible} />
            <button onClick={() => setPopUpVisible(!popUpVisible)}>View</button>
        </div>
    )
}

export default UserCard