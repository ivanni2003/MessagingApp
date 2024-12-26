import axios from 'axios'
import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import './Profile.css'

const baseURL = 'http://localhost:3000'

const Profile = () => {
    const userData = useOutletContext()
    const [userID, setUserID] = useState(null)
    const [fullName, setFullName] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

    useEffect(() => {
       
    }, [])

    return (
        <div>
            <h2>Your Profile</h2>
            <div>
                <p>Name: {fullName}</p>
                <p>Location: {location}</p>
                <p>Bio: {bio}</p>
            </div>
        </div>
    )
}

export default Profile