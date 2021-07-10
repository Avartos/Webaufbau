import React, { useState } from 'react'
import ReplyIcon from '@material-ui/icons/Reply';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Create } from '@material-ui/icons';
import CreatedContribution from './createContribution';
import Contributions from './contributions';
import { useRef } from 'react';



function Contribution({ contribution, isReply = false }) {

    const [count, setCount] = useState(0);
    const [reply, setReply] = useState(false);
    const [replies, setReplies] = useState(contribution.replies || []);

    const AddNewContributionForm = ({ onDiscard }) => {
        const [contributionText, setContributionText] = useState("");
        const [currentUser, setCurrentUser] = useState("Squidy50");

        const input = useRef(null)


        const onInputChange = ({ target }) => {
            const files = target.files

            if (files.length > 0)
                console.log("found files for input", files)
        }

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
                    <input type="file" style={{ display: "none" }} ref={input} onChange={onInputChange} accept="image/*" />
                    <div className="buttonArea">
                        <button className="discardContribution" onClick={onDiscard} type="button">Verwerfen</button>
                        {/* <button type="button" onClick={() => input.current.click()}>Anfügen</button> */}
                        <button>Absenden</button>
                    </div>
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

    const discardReply = () => {
        console.log("discard")
        setReply(false)
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
            {!isReply && reply && <div><AddNewContributionForm onDiscard={discardReply} /></div>}

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