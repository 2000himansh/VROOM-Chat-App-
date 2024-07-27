import React from 'react';
import "./Message.css";

const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}>
                <strong>{user}</strong>: {message}
            </div>
        )
    } else {
        return (
            <div className={`messageBox ${classs}`}>
                <strong>You</strong>: {message}
            </div>
        )
    }
}

export default Message;
