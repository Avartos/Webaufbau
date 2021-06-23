import React, { useState } from 'react';

import ForumStatictics from './forumStatistics';
import SubscribeButton from "./subscribeButton";

const Forum = (props) => { 
        return (  
            <div className="forum">
                <div className="header">
                    <span className="title">Forum: {props.name}</span>
                    <div className="wrapperButton">
                        <SubscribeButton
                            parentId={props.id}
                            isSubscribed={props.isSubscribed}
                            handleSubscribe={props.handleSubscribeThread}
                        />
                    </div>
                    </div>
                    <div className="body">
                        <p className="shortDescription">{props.description}</p>
                        <ForumStatictics 
                            numberOfThreads={props.numberOfThreads}
                            numberOfComments={props.numberOfComments}
                            lastActivityFrom={props.lastActivityFrom}
                            lastActivityAt={props.lastActivityAt}/>
                    </div>
                </div>
        );
}
 
export default Forum;