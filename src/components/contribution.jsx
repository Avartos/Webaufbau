import React, { useState } from 'react'
import ReplyIcon from '@material-ui/icons/Reply';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';



function Contribution() {

    function ContributorSquid(props) {
        return <p>{props.contributorSquid}</p>
    }

    function ContributionText(props) {
        return <p>{props.conText}</p>
    }

    const [count, setCount] = useState(0);

    return (
        <div className="contribution">
            <p className="contributorSquid">From: <ContributorSquid contributorSquid="Squid161" /></p>
            <p className="conText"><ContributionText conText="Hallo ich bin ein Beitrag!" /></p>
            <button className="contributionButtons"> <ReplyIcon /> </button>

            <div id="CounterOfLikes">

                <button className="contributionButtons" onClick={() => setCount(count - 1)}> <RemoveIcon /> </button>
                <p>{count}</p>
                <button className="contributionButtons" onClick={() => setCount(count + 1)}> <AddIcon /> </button>

            </div>
        </div>
    )
}
export default Contribution;