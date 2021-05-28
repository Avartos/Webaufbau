import React from 'react';
import classNames from 'classnames';

const SubscribeButton = ({isSubscribed, handleSubscribe, parentId}) => {
    let subscribeClass = classNames({
        subscribeButton: true,
        active: isSubscribed
      });
    
    return ( 
        <button onClick={() => handleSubscribe(parentId)} className={subscribeClass}>
          <img src="/images/splat.svg" alt="subscribe" />
        </button>
     );
}
 
export default SubscribeButton;