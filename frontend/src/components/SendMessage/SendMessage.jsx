import { useState } from 'react'

import axios from 'axios'
import './SendMessage.css'

const SendMessage = ({handleExit}) => {
    const [message, setMessage] = useState('')

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const handleSubmission = (e) => {
        e.preventDefault()
        console.log('send' + message)


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
            <button onClick={handleExit}>Exit</button>
        </div>
    )
}

export default SendMessage