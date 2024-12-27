import EditForm from '../../components/EditForm/EditForm'

import './EditProfile.css'

const EditProfile = ({handleNameChange, handleLocationChange, handleBioChange, handleProfileReturn, userData}) => {

    const handleNameSubmission = (newName) => {
        handleNameChange(newName)
    }

    const handleLocationSubmission = (newLocation) => {
        handleLocationChange(newLocation)
    }

    const handleBioSubmission = (newBio) => {
        handleBioChange(newBio)
    }

    return (
        <div>
            <h1>Edit Profile: {userData.username}</h1>
            <EditForm handleEditSubmission={handleNameSubmission} label={"Name:"}/>
            <EditForm handleEditSubmission={handleLocationSubmission} label={"Location:"}/>
            <EditForm handleEditSubmission={handleBioSubmission} label={"Bio:"}/>
            
            <button onClick={handleProfileReturn}>Back To Profile</button>

        </div>
    )
}

export default EditProfile