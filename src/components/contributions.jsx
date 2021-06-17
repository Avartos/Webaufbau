import React from 'react';
import Contribution from './contribution';
import DescriptionThread from './descriptionThread';
import CreateContribution from './createContribution';


function Contributions() {
    return(
                <div className="contributionList">
        
                    <DescriptionThread/>
                    <CreateContribution/>
                    <Contribution/>

                </div>  
    )
}

export default Contributions;
