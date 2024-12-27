import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Profile.css'

const baseURL = 'http://localhost:3000'

const Profile = () => {
    const {userData, authHeader} = useOutletContext()
    const [fullName, setFullName] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

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

    
    const handleNameChange = () => {
        console.log('change name')
    }
    const handleLocationChange = () => {
        console.log('change location')
    }
    const handleBioChange = () => {
        console.log('change bio')
    }

    return (
        <div>
            <h2>Your Profile: {userData.username}</h2>
            <div>
                <p>Name: {fullName}</p>
                <button onClick={handleNameChange}>Edit Name</button>
                <p>Location: {location}</p>
                <button onClick={handleLocationChange}>Edit Location</button>
                <p>Bio: {bio}</p>
                <button onClick={handleBioChange}>Edit Bio</button>
            </div>
        </div>
    )
}

export default Profile