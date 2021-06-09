import React, { useState } from 'react';

const ForumStatictics = (props) => {
        return (  
            <div className="forumStatistics">
                <div className="row"><span>Anzahl Threads:</span><span>{props.numberOfThreads}</span></div>
                <div className="row"><span>Anzahl Kommentare:</span><span>{props.numberOfComments}</span></div>
                <div className="row"><span>Letzte Aktivität von:</span><span>{props.lastActivityFrom}</span></div>
                <div className="row"><span>Letzte Aktivität am:</span><span>{props.lastActivityAt}</span></div>
            </div>
        );
}
 
export default ForumStatictics;