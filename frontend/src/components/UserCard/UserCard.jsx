import { useState } from 'react'

import UserPopUp from '../UserPopUp/UserPopUp'

import './UserCard.css'

const UserCard = ({otherUserData, authHeader, activeUserIDs}) => {
    const [popUpVisible, setPopUpVisible] = useState(false)

    return (
        <div>
            {activeUserIDs && activeUserIDs.includes(String(otherUserData.user_id)) ? (
                <p><strong>{'Online:' + otherUserData.username + ': ' + otherUserData.full_name}</strong></p>
            ) : (
                <p>{otherUserData.username + ': ' + otherUserData.full_name}</p>
            )
            }
            <UserPopUp otherUserData={otherUserData} isVisible={popUpVisible} authHeader={authHeader}/>
            <button onClick={() => setPopUpVisible(!popUpVisible)}>Toggle Profile</button>
        </div>
    )
}

export default UserCard