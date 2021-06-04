import React, {Component} from 'react';

import ForumStatictics from './forumStatistics';

class Forum extends Component {
    // state = {  }
    render() { 
        return (  
            <div className="forum">
                <div className="forumHeader">
                    <span className="forumTitle">Forum: {this.props.name}</span>
                    <div className="buttonWrapper">
                        <button>Favorite</button>
                    </div>
                </div>
                <div className="forumBody">
                    <p className="forumDesrciption">{this.props.description}</p>
                    <ForumStatictics 
                        numberOfThreads={this.props.numberOfThreads}
                        numberOfComments={this.props.numberOfComments}
                        lastActivityFrom={this.props.lastActivityFrom}
                        lastActivityAt={this.props.lastActivityAt}/>
                </div>
            </div>
        );
    }
}
 
export default Forum;