import React, { useState } from 'react';

const ForumStatictics = (props) => {
        return (  
            <div className="forumStatistics">
                <div className="row"><span>Threads:</span><span className="highlighted">{props.numberOfThreads}</span></div>
                <div className="row"><span>Kommentare:</span><span>{props.numberOfComments}</span></div>
                <div className="row"><span>Letzte Aktivität von:</span><span className="user">{props.lastActivityFrom}</span></div>
                <div className="row"><span>Letzte Aktivität am:</span><span className="user">{props.lastActivityAt}</span></div>
            </div>
        );
}
 
export default ForumStatictics;