import './Messages.css'
import { useOutletContext } from 'react-router-dom'

import Conversation from '../Conversation/Conversation'
import { useState } from 'react'

const Messages = () => {
    const userData = useOutletContext()
    const [conversationVisible, setConversationVisible] = useState(false)

    const handleExit = () => {
        setConversationVisible(false)
    }

    return (
        <div>
            {!conversationVisible ? (
                <div>
                    <h2>Messages</h2>
                    <button onClick={() => setConversationVisible(true)}>View Message</button>
                </div>
            ) : (
                <Conversation handleExit={handleExit}/>
            )}
        </div>
    )
}

export default Messages