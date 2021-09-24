import './NotificationMessage.css'
function NotificationMessage({ message, type }) {
    if (message === null) {
        return null
    }
    return(
        <div className={type}>
            {message}
        </div>
    )
}

export default NotificationMessage
