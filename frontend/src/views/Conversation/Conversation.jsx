import './Conversation.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import SendMessage from '../../components/SendMessage/SendMessage'
import UserCard from '../../components/UserCard/UserCard'


const baseURL = 'http://localhost:3000'

const Conversation = ({handleExit, conversation, otherUserData, authHeader, socket}) => {
    const [messages, setMessages] = useState(null)

    useEffect(() => {
        setMessages(conversation.messages)
        socket.on("appendMessage", (newMessage) => {
            const newMessages = [...conversation.messages, newMessage]
            setMessages(newMessages)
        })
        
    }, [])


    const handleExitConvo = () => {
        handleExit()
    }
    
    const handleSendMessage = async (message) => {
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
        <div>
            <h1>Conversation Here</h1>
            <UserCard otherUserData={otherUserData} authHeader={authHeader} />
            <ul>
            {messages && messages.map((messageObj, index) => 
                messageObj.sender == otherUserData.username ? (
                    <li key={index}>{messageObj.message}</li>
                ) : (
                    <li key={index}><strong>{messageObj.message}</strong></li>
                )
            )   
            }
            </ul>
            <SendMessage otherUserData={otherUserData} authHeader={authHeader} socket={socket} handleSendMessage={handleSendMessage}/>
            <button onClick={handleExitConvo}>Exit Convo</button>
        </div>
    )
}

export default Conversation