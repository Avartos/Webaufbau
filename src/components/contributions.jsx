import React, { useState } from 'react';
import Contribution from './contribution';
import DescriptionThread from './descriptionThread';
import NewContributionForm from './createContribution';



const Contributions = () => {

    const [contributions, setContributions] = useState([
        {
            id: 0,
            contributionText: "Dieses Thema ist ekelhaft! Schämt euch!",
            contributorSquid: "Squid100",
        },
        {
            id: 1,
            contributionText: "Darüber reden wir nicht...",
            contributorSquid: "Squid99",
        },
        {
            id: 2,
            contributionText: "Hallo 110, ich habe ein Verbechen zu melden! x-x",
            contributorSquid: "Squid56",
        },
    ])


    const handleSubmitNewContribution = (e, contributionText, currentUser) => {
        e.preventDefault();
        let newContribution = {
            //id: nextId,
            contributionText: contributionText,
            contributorSquid: currentUser,
        }

        setContributions([...contributions, newContribution]);
    }

    return (
        <React.Fragment>
            <DescriptionThread thread={{
                title: "Katzentatzen <3",
                description: "Dieser Thread dreht sich um Katzentatzen! NUR KATZENTATZEN",
                createdAt: "02.12.2005",
                contributionCount: 65,
                lastContribution: {
                    from: "Squid89",
                    createdAt: "03.05.2007"
                }

            }}/>
            <NewContributionForm handleSubmitForm={handleSubmitNewContribution} />
            <div className="contributionsList">
                {contributions.map((contribution) => {
                    return (
                        <Contribution
                            contribution={contribution}
                        />
                    );
                })}
            </div>
        </React.Fragment>
    );
}

export default Contributions;
