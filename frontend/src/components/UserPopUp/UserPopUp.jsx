import './UserPopUp.css'

import SendMessage from '../SendMessage/SendMessage'

import { useState } from 'react'

const UserPopUp = ({userData, isVisible}) => {
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
                    <h1>{'Profile: ' + userData.username}</h1>
                    <p>{'Name: ' + userData.full_name}</p>
                    <p>{'Location: ' + userData.location}</p>
                    <p>{'Bio: ' + userData.bio}</p>
                    <button onClick={handleMessage}>Send Message</button>

                </div>
                )
            }
            {conversationVisible &&
                <div>
                    <SendMessage handleExit={handleExit}/>
                </div>
            }
        </div>
    )
}

export default UserPopUp