import { useState } from 'react'

import './EditForm.css'

const EditForm = ({handleEditSubmission, label}) => {
    const [text, setNewText] = useState('')

    const handleTextChange = (e) => {
        setNewText(e.target.value)
    }

    const handleSubmission = (e) => {
        e.preventDefault()
        handleEditSubmission(text)
    }
    return (
        <form onSubmit={handleSubmission}>
            <label>{label}</label>
            <input
                type='text'
                value={text}
                onChange={handleTextChange}
                placeholder={`Enter new ${label}`}
            />
            <button type="submit">Submit</button>
        </form>
    )

}

export default EditForm