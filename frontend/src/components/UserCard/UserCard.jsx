import './UserCard.css'

const UserCard = ({otherUserData, activeUserIDs, handleConversationSelect, handleProfileSelect}) => {
    return (
        <div className='user-card-container'>
            {activeUserIDs && activeUserIDs.includes(String(otherUserData.userID)) ? (
                <p><strong>{otherUserData.username + ': ' + otherUserData.fullName}</strong></p>
            ) : (
                <p>{otherUserData.username + ': ' + otherUserData.fullName}</p>
            )
            }
            {handleConversationSelect && (
                <button onClick={() => handleConversationSelect(otherUserData)}>Open</button>
                ) }
            {handleProfileSelect && (
                <button onClick={() => handleProfileSelect(otherUserData)}>Toggle View</button>
            )}
        </div>
    )
}

export default UserCard