import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

import SearchBar from '../../components/SearchBar/SearchBar'
import ProfilePopup from '../../components/ProfilePopup/ProfilePopup'

import './Search.css'

const baseURL = 'http://localhost:3000'

const Search = () => {
    const {authHeader, activeUserIDs} = useOutletContext()
    const [otherUsers, setOtherUsers] = useState(null)
    const [profileVisible, setProfileVisible] = useState(false)
    const [selectedUserData, setSelectedUserData] = useState(null)


    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/profiles/other`, authHeader)
                setOtherUsers(response.data.otherUsers)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
    }, [])

    const handleProfileExit = () => {
        setProfileVisible(false)
    }

    const handleProfileSelect = (otherUserData) => {
        setSelectedUserData(otherUserData)
        console.log(otherUserData)
        setProfileVisible(true)
    } 

    const handleSendMessage = async (message) => {
        console.log(message)
        try {
            const reqData = {
                username: selectedUserData.username,  // username of recipient
                message: message,
                initial: true
            }
            console.log(reqData)
            await axios.patch(`${baseURL}/api/conversations/sendMessage`, reqData, authHeader)
            
            alert("Message sent to " + selectedUserData.username)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='search-container'>
          <SearchBar 
            otherUsers={otherUsers} 
            authHeader={authHeader} 
            handleProfileSelect={handleProfileSelect} 
            activeUserIDs={activeUserIDs}
          />
           {profileVisible && 
                <ProfilePopup 
                    otherUserData={selectedUserData} 
                    handleSendMessage={handleSendMessage} 
                    handleProfileExit={handleProfileExit} 
                />
           }
          
        </div>
    )
}

export default Search