import React, {Component} from 'react';

import Forum from './forum';

class ForumList extends Component {
    state = {  
        forums : [
            {id: 1, name:"Name1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Dui accumsan sit amet nulla facilisi. Justo donec enim diam vulputate ut pharetra. Feugiat nibh sed pulvinar proin gravida hendrerit lectus.", numberOfThreads: 1, numberOfComments: 2, lastActivityFrom: "Squidy", lastActivityAt: "02.02.2020"},
            {id: 2, name:"Name2", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Dui accumsan sit amet nulla facilisi. Justo donec enim diam vulputate ut pharetra. Feugiat nibh sed pulvinar proin gravida hendrerit lectus.", numberOfThreads: 123, numberOfComments: 212, lastActivityFrom: "Crabby", lastActivityAt: "01.01.2021"},
            {id: 3, name:"Name3", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Dui accumsan sit amet nulla facilisi. Justo donec enim diam vulputate ut pharetra. Feugiat nibh sed pulvinar proin gravida hendrerit lectus.", numberOfThreads: 1321, numberOfComments: 9, lastActivityFrom: "Fish", lastActivityAt: "21.12.2012"},
        ]
    }
    render() { 
        return ( 
            <React.Fragment>
                <Forum 
                    key={this.state.forums[0].id}
                    name={this.state.forums[0].name}
                    description={this.state.forums[0].description}
                    numberOfThreads={this.state.forums[0].numberOfThreads}
                    numberOfComments={this.state.forums[0].numberOfComments}
                    lastActivityFrom={this.state.forums[0].lastActivityFrom}
                    lastActivityAt={this.state.forums[0].lastActivityAt}
                />
                <Forum 
                    key={this.state.forums[1].id}
                    name={this.state.forums[1].name}
                    description={this.state.forums[1].description}
                    numberOfThreads={this.state.forums[1].numberOfThreads}
                    numberOfComments={this.state.forums[1].numberOfComments}
                    lastActivityFrom={this.state.forums[1].lastActivityFrom}
                    lastActivityAt={this.state.forums[1].lastActivityAt}
                />
                <Forum 
                    key={this.state.forums[2].id}
                    name={this.state.forums[2].name}
                    description={this.state.forums[2].description}
                    numberOfThreads={this.state.forums[2].numberOfThreads}
                    numberOfComments={this.state.forums[2].numberOfComments}
                    lastActivityFrom={this.state.forums[2].lastActivityFrom}
                    lastActivityAt={this.state.forums[2].lastActivityAt}
                />
            </React.Fragment>
        );
    }
}
 
export default ForumList;