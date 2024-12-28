import './UserPopUp.css'

import SendMessage from '../SendMessage/SendMessage'

import { useState } from 'react'

const UserPopUp = ({otherUserData, isVisible, authHeader}) => {
    const [conversationVisible, setConversationVisible] = useState(false)

    const handleMessage = () => {
        setConversationVisible(true)
    }
    const handleExit = () => {
        setConversationVisible(false)
    }
    return (
        <div>
            { isVisible && !conversationVisible && (
                <div> 
                    <h1>{'Profile: ' + otherUserData.username}</h1>
                    <p>{'Name: ' + otherUserData.full_name}</p>
                    <p>{'Location: ' + otherUserData.location}</p>
                    <p>{'Bio: ' + otherUserData.bio}</p>
                    <button onClick={handleMessage}>Send Message</button>

                </div>
                )
            }
            {conversationVisible &&
                <div>
                    <SendMessage otherUserData={otherUserData} handleExit={handleExit} authHeader={authHeader}/>
                </div>
            }
        </div>
    )
}

export default UserPopUp