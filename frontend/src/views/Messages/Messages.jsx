import './Messages.css'
import { useOutletContext } from 'react-router-dom'

const Messages = () => {
    const userData = useOutletContext()

    return (
        <div>
            <h2>Messages</h2>
        </div>
    )
}

export default Messages