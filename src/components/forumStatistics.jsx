import React from 'react';

const ForumStatictics = (props) => {
        return (  
            <div className="forumStatistics">
                <div className="row"><span>Threads:</span><span className="highlighted">{props.numberOfThreads}</span></div>
                <div className="row"><span>Erstellt am:</span><span>{props.createdAt}</span></div>
                <div className="row"><span>Letzte Änderung am:</span><span className="highlighted">{props.updatedAt}</span></div>
            </div>
        );
}
 
export default ForumStatictics;