import { useState } from 'react'

import UserCard from '../UserCard/UserCard'

import './SearchBar.css'

const SearchBar = ({users}) => {
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers] = useState(null)


    const handleChange = (e) => {
        setSearch(e.target.value)

        const usersFiltered = users.filter(userData => userData.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setFilteredUsers(usersFiltered)
        console.log(usersFiltered)
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
                users && users.length > 0 ? (
                    <ul>
                        {users.map((userData, index) => (
                            <li key={index}>
                                <UserCard userData={userData} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No Users Found</div>
                )
            ) : (
                filteredUsers && filteredUsers.length > 0 ? (
                    <ul>
                        {filteredUsers.map((userData, index) => (
                            <li key={index}>
                                <UserCard userData={userData} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div>No Matching Users Found</div>
                )
            )}
        </div>
    )
}

export default SearchBar