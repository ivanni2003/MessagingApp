import { useOutletContext } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

import './Messages.css'
import Conversation from '../Conversation/Conversation'
import SearchBar from '../../components/SearchBar/SearchBar'


const baseURL = 'http://localhost:3000'

const Messages = () => {
    const {userData, authHeader, socket, activeUserIDs} = useOutletContext()
    const [conversationVisible, setConversationVisible] = useState(false)
    const [otherUsersData, setOtherUsersData] = useState(null)
    const [selectedConversation, setSelectedConversation] = useState(null)
    const [selectedUserData, setSelectedUserData] = useState(null)

    useEffect(() => {
        const fetchConversationsAndSetOtherUsers = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/conversations/other`, authHeader)
                setOtherUsersData(response.data.otherProfiles)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchConversationsAndSetOtherUsers()
    }, [])

    const handleExit = () => {
        setConversationVisible(false)
    }

    const handleConversationSelect = async (otherUserData) => {

        console.log(otherUserData.username)
        const response = await axios.get(`${baseURL}/api/conversations/specific/${otherUserData.username}`, authHeader)

        setSelectedUserData(otherUserData)
        setSelectedConversation(response.data)
        setConversationVisible(true)
    }

    return (
        <div>
            {!conversationVisible ? (
                <div>
                    <h2>Messages</h2>
                    <SearchBar otherUsers={otherUsersData} authHeader={authHeader} handleConversationSelect={handleConversationSelect} activeUserIDs={activeUserIDs}/>
                </div>
            ) : (
                <Conversation handleExit={handleExit} conversation={selectedConversation} otherUserData={selectedUserData} authHeader={authHeader} socket={socket}/>
            )}
        </div>
    )
}

export default Messages