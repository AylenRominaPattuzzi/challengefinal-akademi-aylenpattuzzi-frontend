import React from 'react'


export const Message = ({message, stateMessage}) => {
    return (
        <div className={`ui ${stateMessage} message floatingMessage`}>
            <div className="header">
                {message}
            </div>
        </div>
    )
}