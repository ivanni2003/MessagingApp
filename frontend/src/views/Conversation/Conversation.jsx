import './Conversation.css'

const Conversation = ({handleExit}) => {
    return (
        <div>
            <h1>Conversation Here</h1>
            <button onClick={handleExit}>Exit</button>

        </div>
    )
}

export default Conversation