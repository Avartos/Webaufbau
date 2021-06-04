import React, {Component} from 'react';

class ForumStatictics extends Component {
    // state = { }
    render() { 
        return (  
            <div className="forumStatistics">
                <div className="row"><span>Anzahl Threads:</span><span>{this.props.numberOfThreads}</span></div>
                <div className="row"><span>Anzahl Kommentare:</span><span>{this.props.numberOfComments}</span></div>
                <div className="row"><span>Letzte Aktivität von:</span><span>{this.props.lastActivityFrom}</span></div>
                <div className="row"><span>Letzte Aktivität am:</span><span>{this.props.lastActivityAt}</span></div>
            </div>
        );
    }
}
 
export default ForumStatictics;