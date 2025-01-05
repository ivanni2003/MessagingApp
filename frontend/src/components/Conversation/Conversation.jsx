import './Conversation.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

import SendMessage from '../../components/SendMessage/SendMessage'

const baseURL = 'http://localhost:3000'

const Conversation = ({handleExit, conversation, otherUserData, authHeader, socket}) => {
    const [messages, setMessages] = useState(null)

    useEffect(() => {
        setMessages(conversation.messages)
        socket.on("appendMessage", (newMessage) => {
            const newMessages = [...conversation.messages, newMessage]
            setMessages(newMessages)
        })
        
    }, [conversation])

    
    const handleSendMessage = async (message) => {
        console.log('message')
        try {
            const reqData = {
                username: otherUserData.username,  // username of recipient
                message: message
            }
            const newMessages = [...messages, reqData]
            setMessages(newMessages)
            await axios.patch(`${baseURL}/api/conversations/sendMessage`, reqData, authHeader)
            
            alert("Message sent to " + otherUserData.username)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='conversation-container'>
                <div>
                    <div>
                        <h2>{otherUserData.username}</h2>
                    </div>
                    <div>
                        <ul>
                        {messages && messages.map((messageObj, index) => 
                            messageObj.sender == otherUserData.username ? (
                            <li className='message received-message' key={index}>{messageObj.message}</li>
                            ) : (
                            <li className='message sent-message' key={index}><strong>{messageObj.message}</strong></li>
                            )
                        )}
                        </ul>
                    </div>
                    <SendMessage handleSendMessage={handleSendMessage}/>
                    <button onClick={handleExit}>Exit</button>
                </div>
        </div>
    )
}

export default Conversation