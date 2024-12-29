import './Conversation.css'

import SendMessage from '../../components/SendMessage/SendMessage'
import UserCard from '../../components/UserCard/UserCard'

const Conversation = ({handleExit, conversation, otherUserData, authHeader}) => {
    console.log(conversation)
    return (
        <div>
            <h1>Conversation Here</h1>
            <UserCard otherUserData={otherUserData} authHeader={authHeader} />
            <ul>
            {conversation.messages.map((messageObj, index) => 
                messageObj.sender == otherUserData.username ? (
                    <li key={index}>{messageObj.message}</li>
                ) : (
                    <li key={index}><strong>{messageObj.message}</strong></li>
                )
            )   
            }
            </ul>
            <SendMessage otherUserData={otherUserData} authHeader={authHeader}/>
            <button onClick={handleExit}>Exit Convo</button>
        </div>
    )
}

export default Conversation