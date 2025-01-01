import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Profile.css'

import EditProfile from '../../components/EditProfile/EditProfile'

const baseURL = 'http://localhost:3000'

const Profile = () => {
    const {userData, authHeader, handleLogout, handleDeleteAccount} = useOutletContext()
    const [fullName, setFullName] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')
    const [editProfile, setEditProfile] = useState(false)


    useEffect(() => {
        const fetchProfileData = async () => {
          try {
            const response = await axios.get(`${baseURL}/api/profiles/profile`, authHeader)
            const profileData = response.data

            setFullName(profileData.fullName)
            setLocation(profileData.location)
            setBio(profileData.bio)

          } catch (error) {
            console.error('Error fetching profile data:', error)
          }
        }
        fetchProfileData()

    }, [])  

    const handleNameChange = async (newName) => {
        const response = await axios.patch(`${baseURL}/api/profiles/update/name`, {newName}, authHeader)
        const newProfileData = response.data

        setFullName(newProfileData.fullName)

        alert('Name changed successfully')
    }
    const handleLocationChange = async (newLocation) => {
        const response = await axios.patch(`${baseURL}/api/profiles/update/location`, {newLocation}, authHeader)
        const newProfileData = response.data

        setLocation(newProfileData.location)

        alert('Location changed successfully')
    }
    const handleBioChange = async (newBio) => {
        const response = await axios.patch(`${baseURL}/api/profiles/update/bio`, {newBio}, authHeader)
        const newProfileData = response.data

        setBio(newProfileData.bio)

        alert('Bio changed successfully')
    }

    const handleProfileReturn = () => setEditProfile(false)


    return (
        <div className='profile-container'>
          {!editProfile ? (
            <div>
              <h2>{userData.username}</h2>
              <div>
                <p>Name: {fullName}</p>
                <p>Location: {location}</p>
                <p>Bio: {bio}</p>
                <div className='profile-button-container'> 
                  <button className='profile-button' onClick={() => setEditProfile(true)}>Edit Profile</button>
                  <button className='profile-button' onClick={handleLogout}>Log Out</button>
                  <button className='profile-button' onClick={handleDeleteAccount}>Delete Account</button>
                </div>
              </div>
            </div>
          ) : (
            <EditProfile 
                handleNameChange={handleNameChange} 
                handleLocationChange={handleLocationChange} 
                handleBioChange={handleBioChange} 
                handleProfileReturn={handleProfileReturn}
                userData={userData} 
                authHeader={authHeader}/>
          )}
        </div>
    )
}

export default Profile