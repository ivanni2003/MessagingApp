import { useState } from 'react'

import axios from 'axios'
import './SendMessage.css'

const baseURL = 'http://localhost:3000'

const SendMessage = ({otherUserData, handleExit, authHeader}) => {
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmission = async (e) => {
        e.preventDefault()
        console.log('send' + message)
        try {
            const reqData = {
                username: otherUserData.username,  // username of recipient
                message: message
            }
            await axios.patch(`${baseURL}/api/conversations/sendMessage`, reqData, authHeader)

            alert("Message sent to " + otherUserData.username)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmission}>
                <label>Message:</label>
                <input
                    type='text'
                    value={message}
                    onChange={handleChange}
                    placeholder={'Enter Message'}
                    />
                <button type='submit'>Submit</button>
            </form>
            {handleExit && 
                <button onClick={handleExit}>Exit</button>
            }
            
        </div>
    )
}

export default SendMessage