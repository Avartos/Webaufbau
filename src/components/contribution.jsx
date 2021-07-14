import React, { useState } from 'react'
import ReplyIcon from '@material-ui/icons/Reply';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { Create } from '@material-ui/icons';
import CreatedContribution from './createContribution';
import Contributions from './contributions';
import { useRef } from 'react';
import config from '../core/config';
import ProfilePicture from './profilePicture';


function Contribution({ contribution, handleRate, threadId, handleAddAlert, handleSubmitContribution, isReply = false }) {

    // const [count, setCount] = useState(0);
    const [reply, setReply] = useState(false);
    const [replies, setReplies] = useState(contribution.replies || []);

    const AddNewContributionForm = ({ onDiscard }) => {
        const [contributionText, setContributionText] = useState("");
        const [currentUser, setCurrentUser] = useState("");

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
                        handleSubmitContribution(e, contributionText, contribution.creatorUserName);
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
                    {/* <input type="file" style={{ display: "none" }} ref={input} onChange={onInputChange} accept="image/*" /> */}
                    <div className="buttonArea">
                        <button className="discardContribution" onClick={onDiscard} type="button">Verwerfen</button>
                        {/* <button type="button" onClick={() => input.current.click()}>Anfügen</button> */}
                        <button>Absenden</button>
                    </div>
                </form>
            </div>
        )
    }

    const handleSubmitForm = async (e, contributionText, currentUser) => {
        e.preventDefault();

        const text = `@${contribution.creatorUserName} ${contributionText}`;

        let newContribution = {
            //id: nextId,
            content: text,
            creatorUserName: currentUser,
        }

        const response = await fetch(`http://localhost:3001/api/contributions/${threadId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                accessToken: sessionStorage.getItem("accessToken"),
            },
            body: JSON.stringify({
                contributionText: text
            }),
        });

        if (!response.ok) {
            return handleAddAlert("error", "Fehler", "Das Formular konnte nicht abgeschickt werden.");
        }
        handleAddAlert(
            "success",
            "",
            "Ihr Beitrag wurde erfolgreich angelegt!"
        );

        setReplies([...replies, newContribution]);
    }

    const discardReply = () => {
        console.log("discard")
        setReply(false)
    }

    return (
        <div className="contribution">
            <div className="pictureWrapper">
            <ProfilePicture 
                path={contribution.picturePath}
            />
            </div>
            <p className="header">From: {contribution.creatorUserName}</p>
            <p className="body">{contribution.content}</p>
            <div className="counterOfLikes">

                <button className="counterButton" onClick={() => handleRate(-1, contribution.id)}> <RemoveIcon /> </button>
                <p>{contribution.actualRating}</p>
                <button className="counterButton" onClick={() => handleRate(1, contribution.id)}> <AddIcon /> </button>

            </div>
            {!isReply && !reply && <button className="replyButton" onClick={() => setReply(true)}> <ReplyIcon /> </button>}
            {!isReply && reply && <div><AddNewContributionForm onDiscard={discardReply} /></div>}

            <div className="replies">
                {replies.map((reply) => {
                    return (
                        <Contribution
                            handleAddAlert={handleAddAlert}
                            threadId={threadId}
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