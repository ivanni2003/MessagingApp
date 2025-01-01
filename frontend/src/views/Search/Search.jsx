import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

import SearchBar from '../../components/SearchBar/SearchBar'
import SendMessage from '../../components/SendMessage/SendMessage'

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

    return (
        <div className='search-container'>
          <SearchBar otherUsers={otherUsers} authHeader={authHeader} handleProfileSelect={handleProfileSelect} activeUserIDs={activeUserIDs}/>
          <div className='profile-popup-container'>
                {profileVisible && selectedUserData && (
                    <div> 
                    <h1>{selectedUserData.username}</h1>
                    <p>{'Name: ' + selectedUserData.full_name}</p>
                    <p>{'Location: ' + selectedUserData.location}</p>
                    <p>{'Bio: ' + selectedUserData.bio}</p>
                    <SendMessage selectedUserData={selectedUserData}/>
                    <button onClick={handleProfileExit}>Exit</button>
                </div>
            )}
            </div>
        </div>
    )
}

export default Search