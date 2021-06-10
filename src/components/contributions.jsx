import React, { Component } from 'react';
import Contribution from './contribution';
import CreateContribution from './createContribution';
import DescriptionThread from './descriptionThread';

export default class Contributions extends Component {
    // state = {}
    render() {
        return (
            <React.Fragment>
                <div className="contributionList">
        
                    <DescriptionThread descriptionThread={{threadName:'Mini-Kühe', createdOn:'06.05.2005', numberOfContributions:'13', squidname: 'Squid5', lastContribution: '01.01.2021'}}/>
        
                    <CreateContribution createContribution={{answer: 'Ich bin eine Antwooooooooooooooort!'}}/>
                    
                    <Contribution contribution={{id:0, squidname:'Squid777', text:'Ich bin ein Beitrag'}}/>

                    <Contribution contribution={{id:1, squidname:'Squid443', text:'Ich bin ebenfalls ein Beitrag'}}/>

                </div>  
            </React.Fragment>
        )
    }
}