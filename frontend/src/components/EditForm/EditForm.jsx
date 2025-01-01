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
            <label className='edit-form-label'>{label}</label>
            <input
                className='edit-form-input'
                type='text'
                value={text}
                onChange={handleTextChange}
                placeholder={`Enter new value`}
            />
            <button className='edit-form-button' type="submit">Submit</button>
        </form>
    )

}

export default EditForm