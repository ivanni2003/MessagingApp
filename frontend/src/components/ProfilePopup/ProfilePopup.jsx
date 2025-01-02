import './ProfilePopup.css'

import SendMessage from '../SendMessage/SendMessage'

const ProfilePopup = ({otherUserData, handleSendMessage, handleProfileExit}) => {

    return (
        <div className='profile-popup-container'>
            {otherUserData && (
                <div> 
                    <h2>{otherUserData.username}</h2>
                    <p>{'Name: ' + otherUserData.full_name}</p>
                    <p>{'Location: ' + otherUserData.location}</p>
                    <p>{'Bio: ' + otherUserData.bio}</p>
                    <SendMessage handleSendMessage={handleSendMessage}/>
                    <button onClick={handleProfileExit}>Exit</button>
                </div>
            )}
        </div>
    )
}

export default ProfilePopup