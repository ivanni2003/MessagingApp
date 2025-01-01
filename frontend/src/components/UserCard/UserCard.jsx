import { useState } from 'react'

import './UserCard.css'

const UserCard = ({otherUserData, activeUserIDs, handleConversationSelect, handleProfileSelect}) => {
    return (
        <div className='user-card-container'>
            {activeUserIDs && activeUserIDs.includes(String(otherUserData.user_id)) ? (
                <p><strong>{otherUserData.username + ': ' + otherUserData.full_name}</strong></p>
            ) : (
                <p>{otherUserData.username + ': ' + otherUserData.full_name}</p>
            )
            }
            {handleConversationSelect && (
                <button className='user-card-button' onClick={() => handleConversationSelect(otherUserData)}>Open</button>
                ) }
            {handleProfileSelect && (
                <button className='user-card-button' onClick={() => handleProfileSelect(otherUserData)}>Toggle View</button>
            )}
        </div>
    )
}

export default UserCard