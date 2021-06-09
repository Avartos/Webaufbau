import React, { useState } from 'react';

import Forum from './forum';

const ForumList = () => {
    const [forums, setForums] = useState (
        [
            {id: 1, name:"Name1", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Dui accumsan sit amet nulla facilisi. Justo donec enim diam vulputate ut pharetra. Feugiat nibh sed pulvinar proin gravida hendrerit lectus.", numberOfThreads: 1, numberOfComments: 2, lastActivityFrom: "Squidy", lastActivityAt: "02.02.2020"},
            {id: 2, name:"Name2", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Dui accumsan sit amet nulla facilisi. Justo donec enim diam vulputate ut pharetra. Feugiat nibh sed pulvinar proin gravida hendrerit lectus.", numberOfThreads: 123, numberOfComments: 212, lastActivityFrom: "Crabby", lastActivityAt: "01.01.2021"},
            {id: 3, name:"Name3", description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fames ac turpis egestas sed tempus urna. Pellentesque sit amet porttitor eget dolor morbi non arcu risus. Dui accumsan sit amet nulla facilisi. Justo donec enim diam vulputate ut pharetra. Feugiat nibh sed pulvinar proin gravida hendrerit lectus.", numberOfThreads: 1321, numberOfComments: 9, lastActivityFrom: "Fish", lastActivityAt: "21.12.2012"}
        ]
    ); 
 
        return ( 
            <React.Fragment>
                <Forum 
                    key={forums[0].id}
                    name={forums[0].name}
                    description={forums[0].description}
                    numberOfThreads={forums[0].numberOfThreads}
                    numberOfComments={forums[0].numberOfComments}
                    lastActivityFrom={forums[0].lastActivityFrom}
                    lastActivityAt={forums[0].lastActivityAt}
                />
                <Forum 
                    key={forums[1].id}
                    name={forums[1].name}
                    description={forums[1].description}
                    numberOfThreads={forums[1].numberOfThreads}
                    numberOfComments={forums[1].numberOfComments}
                    lastActivityFrom={forums[1].lastActivityFrom}
                    lastActivityAt={forums[1].lastActivityAt}
                />
                <Forum 
                    key={forums[1].id}
                    name={forums[1].name}
                    description={forums[1].description}
                    numberOfThreads={forums[1].numberOfThreads}
                    numberOfComments={forums[1].numberOfComments}
                    lastActivityFrom={forums[1].lastActivityFrom}
                    lastActivityAt={forums[1].lastActivityAt}
                />
            </React.Fragment>
        );
    
}
 
export default ForumList;