import React, { useState } from 'react'
import ReplyIcon from '@material-ui/icons/Reply';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Create } from '@material-ui/icons';
import CreatedContribution from './createContribution';
import Contributions from './contributions';



function Contribution({ contribution, isReply = false }) {

    const [count, setCount] = useState(0);
    const [reply, setReply] = useState(false);
    const [replies, setReplies] = useState(contribution.replies || []);

    const AddNewContributionForm = () => {
        const [contributionText, setContributionText] = useState("");
        const [currentUser, setCurrentUser] = useState("Squidy50");
        return (
            <div className="newContributionForm">

                <form className="body"
                    onSubmit={(e) => {
                        handleSubmitForm(e, contributionText, currentUser);
                        setContributionText("");
                    }}
                >

                    <textarea
                        required
                        value={contributionText}
                        onChange={(e) => {
                            setContributionText(e.target.value);
                        }}
                        placeholder="Gib deinen Beitrag zum Thema!"
                    ></textarea>

                    <button>Absenden</button>
                </form>
            </div>
        )
    }

    const handleSubmitForm = (e, contributionText, currentUser) => {
        e.preventDefault();
        let newContribution = {
            //id: nextId,
            contributionText: contributionText,
            contributorSquid: currentUser,
        }

        setReplies([...replies, newContribution]);
    }

    return (
        <div className="contribution">
            
            <p className="header">From: {contribution.contributorSquid}</p>
            <p className="body">{contribution.contributionText}</p>
            <div className="counterOfLikes">

                <button className="counterButton" onClick={() => setCount(count - 1)}> <RemoveIcon /> </button>
                <p>{count}</p>
                <button className="counterButton" onClick={() => setCount(count + 1)}> <AddIcon /> </button>

            </div>
            {!isReply && !reply && <button className="replyButton" onClick={() => setReply(true)}> <ReplyIcon /> </button>}
            {!isReply && reply && <div><AddNewContributionForm /><button className="discardContribution" onClick={() => setReply(false)}>Verwerfen</button></div>}

            <div className="replies">
                {replies.map((reply) => {
                    return (
                        <Contribution
                            contribution={reply}
                            isReply={true}
                        />
                    );
                })}
            </div>
            
        </div>
    )
}

export default Contribution;