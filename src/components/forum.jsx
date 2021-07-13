import React from 'react';

import ForumStatictics from './forumStatistics';
import SubscribeButton from "./subscribeButton";

const Forum = (props) => { 
        return (  
            <div className="forum">
                <div className="header">
                    {console.log(props)}
                    <span className="title"><a href={"/threads/" + props.id}>Forum: {props.name}</a></span> 
                    <div className="wrapperButton">
                        <SubscribeButton
                            parentId={props.id}
                            isSubscribed={props.isSubscribed}
                            handleSubscribe={props.handleSubscribeForum}
                        />
                    </div>
                    </div>
                    <div className="body">
                        <p className="shortDescription">{props.description}</p>
                        <ForumStatictics 
                            numberOfThreads={props.numberOfThreads}
                            createdAt={props.createdAt}
                            lastActivityFrom={props.lastActivityFrom}
                            updatedAt={props.updatedAt}/>
                    </div>
                </div>
        );
}
 
export default Forum;