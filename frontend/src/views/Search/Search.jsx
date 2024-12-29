import { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios'

import SearchBar from '../../components/SearchBar/SearchBar'

const baseURL = 'http://localhost:3000'

const Search = () => {
    const {authHeader} = useOutletContext()
    const [otherUsers, setOtherUsers] = useState(null)

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/profiles/other`, authHeader)
                setOtherUsers(response.data.otherUsers)
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchOtherUsers()
    }, [])

    return (
        <div>
          <h2>Search for other Users</h2>
          <SearchBar otherUsers={otherUsers} authHeader={authHeader} handleConversationSelect={null}/>
        </div>
    )
}

export default Search