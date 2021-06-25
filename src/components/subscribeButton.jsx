import React from 'react';
import classNames from 'classnames';

import {ReactComponent as SubscribeIcon} from '../assets/icons/splat.svg';

const SubscribeButton = ({isSubscribed, handleSubscribe, parentId}) => {
    let subscribeClass = classNames({
        subscribeButton: true,
        active: isSubscribed
      });
    
    return ( 
        <SubscribeIcon onClick={() => handleSubscribe(parentId, isSubscribed)} className={subscribeClass}></SubscribeIcon>
     );
}

export default SubscribeButton;