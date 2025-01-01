import { useState } from 'react'

import UserCard from '../UserCard/UserCard'

import './SearchBar.css'

const SearchBar = ({otherUsers, handleConversationSelect, handleProfileSelect, activeUserIDs}) => {
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
                className='search-bar-input'
                type="text"
                value={search}
                onChange={handleChange}
                placeholder="Search For User"
            />
            
            {search === '' ? (
                otherUsers && otherUsers.length > 0 ? (
                    <ul>
                        {(otherUsers.map((otherUserData, index) => (
                            <li key={index}>
                                <UserCard 
                                    otherUserData={otherUserData} 
                                    activeUserIDs={activeUserIDs} 
                                    handleConversationSelect={handleConversationSelect} 
                                    handleProfileSelect={handleProfileSelect}
                                />
                            </li>
                        )))
                    }
                    </ul>
                ) : (
                    <div>No Users Found</div>
                )
            ) : (
                filteredUsers && filteredUsers.length > 0 ? (
                    <ul>
                        {(filteredUsers.map((otherUserData, index) => (
                            <li key={index}>
                                <UserCard 
                                    otherUserData={otherUserData} 
                                    activeUserIDs={activeUserIDs} 
                                    handleConversationSelect={handleConversationSelect} 
                                    handleProfileSelect={handleProfileSelect}
                                />
                            </li>
                        )))}
                    </ul>
                ) : (
                    <div>No Matching Users Found</div>
                )
            )}
        </div>
    )
}

export default SearchBar