import { useState } from 'react'

import UserCard from '../UserCard/UserCard'
import MessagesCard from '../MessagesCard/MessagesCard'

import './SearchBar.css'

const SearchBar = ({otherUsers, authHeader, handleConversationSelect, activeUserIDs}) => {
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(null)


    const handleChange = (e) => {
        setSearch(e.target.value)

        const usersFiltered = otherUsers.filter(otherUserData => otherUserData.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredUsers(usersFiltered)
    }
    
    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search For User"
            />
            
            {search === '' ? (
                otherUsers && otherUsers.length > 0 ? (
                    <ul>
                        {handleConversationSelect == null ? (otherUsers.map((otherUserData, index) => (
                            <li key={index}>
                                <UserCard otherUserData={otherUserData} authHeader={authHeader} activeUserIDs={activeUserIDs}/>
                            </li>
                        ))) : (
                            otherUsers.map((otherUserData, index) => (
                                <li key={index}>
                                    <MessagesCard otherUserData={otherUserData} authHeader={authHeader} handleConversationSelect={handleConversationSelect} activeUserIDs={activeUserIDs}/>
                                </li>
                            ))
                        )
                    }
                    </ul>
                ) : (
                    <div>No Users Found</div>
                )
            ) : (
                filteredUsers && filteredUsers.length > 0 ? (
                    <ul>
                        {handleConversationSelect == null ? (filteredUsers.map((otherUserData, index) => (
                            <li key={index}>
                                <UserCard otherUserData={otherUserData} authHeader={authHeader}/>
                            </li>
                        )) ) : (
                            filteredUsers.map((otherUserData, index) => (
                                <li key={index}>
                                    <MessagesCard otherUserData={otherUserData} authHeader={authHeader} handleConversationSelect={handleConversationSelect}/>
                                </li>
                            ))
                        )}
                    </ul>
                ) : (
                    <div>No Matching Users Found</div>
                )
            )}
        </div>
    )
}

export default SearchBar