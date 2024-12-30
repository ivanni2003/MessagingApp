import { useState } from 'react'

import axios from 'axios'
import './SendMessage.css'

const baseURL = 'http://localhost:3000'

const SendMessage = ({otherUserData, handleExit, authHeader, socke, handleSendMessage}) => {
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmission = (e) => {
        e.preventDefault()
        handleSendMessage(message)
    
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