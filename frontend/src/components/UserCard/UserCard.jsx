import { useState } from 'react'

import UserPopUp from '../UserPopUp/UserPopUp'

import './UserCard.css'

const UserCard = ({otherUserData, authHeader}) => {
    const [popUpVisible, setPopUpVisible] = useState(false)

    return (
        <div>
            <p>{otherUserData.username + ': ' + otherUserData.full_name}</p>
            <UserPopUp otherUserData={otherUserData} isVisible={popUpVisible} authHeader={authHeader}/>
            <button onClick={() => setPopUpVisible(!popUpVisible)}>Toggle Profile</button>
        </div>
    )
}

export default UserCard