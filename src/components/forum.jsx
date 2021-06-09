import React, { useState } from 'react';

import ForumStatictics from './forumStatistics';
import SubscribeButton from "./subscribeButton";

const Forum = (props) => { 
        return (  
            <div className="forum">
                <div className="forumHeader">
                    <span className="forumTitle">Forum: {props.name}</span>
                    <div className="buttonWrapper">
                        <SubscribeButton
                            parentId={props.id}
                            isSubscribed={props.isSubscribed}
                            handleSubscribe={props.handleSubscribeThread}
                        />
                    </div>
                    <div className="forumBody">
                        <p className="forumDesrciption">{props.description}</p>
                        <ForumStatictics 
                            numberOfThreads={props.numberOfThreads}
                            numberOfComments={props.numberOfComments}
                            lastActivityFrom={props.lastActivityFrom}
                            lastActivityAt={props.lastActivityAt}/>
                    </div>
                </div>
            </div>
        );
}
 
export default Forum;