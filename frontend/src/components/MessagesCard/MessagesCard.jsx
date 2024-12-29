import './MessagesCard.css'


const MessagesCard = ({otherUserData, authHeader, handleConversationSelect}) => {

    return (
        <div>
            <p>{otherUserData.username + ': ' + otherUserData.full_name}</p>
            <button onClick={() => handleConversationSelect(otherUserData)}>Open Convo</button>
        </div>
    )
}

export default MessagesCard