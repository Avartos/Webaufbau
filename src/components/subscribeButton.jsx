import React from 'react';
import classNames from 'classnames';

import {ReactComponent as SubscribeIcon} from '../assets/icons/splat.svg';

/**
 * This component is used to toggle the subscription status of a thread or a forum
 * @param {*} param0 
 * @returns 
 */
const SubscribeButton = ({isSubscribed, handleSubscribe, parentId}) => {
  
  // used to toggle the css class of the button, depending on its current state  
  let subscribeClass = classNames({
        subscribeButton: true,
        active: isSubscribed
      });
    
    return ( 
        <SubscribeIcon onClick={() => handleSubscribe(parentId, isSubscribed)} className={subscribeClass} title="Abonnieren"></SubscribeIcon>
     );
}

export default SubscribeButton;