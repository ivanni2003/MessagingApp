import './MessagesCard.css'


const MessagesCard = ({otherUserData, authHeader, handleConversationSelect, activeUserIDs}) => {

    return (
        <div>
            {activeUserIDs && activeUserIDs.includes(String(otherUserData.user_id)) ? (
                <p><strong>{'Online:' + otherUserData.username + ': ' + otherUserData.full_name}</strong></p>
            ) : (
                <p>{otherUserData.username + ': ' + otherUserData.full_name}</p>
            )

            }
            <button onClick={() => handleConversationSelect(otherUserData)}>Open Convo</button>
        </div>
    )
}

export default MessagesCard