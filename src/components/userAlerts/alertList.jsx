import React from 'react';
import AlertItem from './alert';

/**
 * This component is used to display all alerts.
 * The newest alert is always on top
 * @param {*} param0 
 * @returns 
 */
const AlertList = ({messages, handleRemoveAlert}) => {
    
    return ( 
        <React.Fragment>
            {messages.map(message => {
                return <AlertItem key={message.id} alert={message} handleRemoveAlert={handleRemoveAlert}/>
            })}
        </React.Fragment>
     );
}
 
export default AlertList;