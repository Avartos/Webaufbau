import React from 'react';
import AlertItem from './alert';

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