import { useState } from 'react'

import './SendMessage.css'

const SendMessage = ({handleSendMessage}) => {
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
                <button type='submit'>Send</button>
            </form>
            
        </div>
    )
}

export default SendMessage