import { Duo } from '@material-ui/icons';
import React, { useState } from 'react'
import { useRef } from 'react';
//import { add } from '../../api/controllers/threadController';


const NewContributionForm = ({ handleSubmitForm }) => {

    const [visible, setVisible] = useState(false)

    const AddNewContributionForm = ({ onDiscard, add, handleAddContribution}) => {
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
                        console.log("Test")
                        handleAddContribution(e, contributionText);
                        setContributionText("");
                    }}
                >
                    <div className="createArea">

                        <textarea className="textarea"
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
                    </div>
                </form>
            </div>
        )
    }

    const openForm = (event) => {
        event.preventDefault();
        setVisible(true)
    }
    const closeForm = () => {
        console.log("discard 1")
        setVisible(false)
    }
    return (
        <div>
            {!visible && <button className="addContribution" onClick={openForm}>+</button>}
            {visible && <div><AddNewContributionForm onDiscard={closeForm} /></div>}
        </div>
    )
};

export default NewContributionForm;