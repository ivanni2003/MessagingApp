import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './Messages.css'
import Conversation from '../Conversation/Conversation'


const baseURL = 'http://localhost:3000'

const Messages = () => {
    const {userData, authHeader} = useOutletContext()
    const [conversationVisible, setConversationVisible] = useState(false)
    const [allConversations, setAllConversations] = useState(null)

    useEffect(() => {
        const fetchAllConversations = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/conversations/all`, authHeader)
                setAllConversations(response.data)
                console.log(response.data)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchAllConversations()
    }, [])

    const handleExit = () => {
        setConversationVisible(false)
    }

    // Note: generate user card for every user_id conversing with current userData, using getUserData to get otherUserData parameter.

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