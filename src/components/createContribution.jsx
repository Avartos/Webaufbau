import { Duo } from '@material-ui/icons';
import React, { useState } from 'react'


const NewContributionForm = ({ handleSubmitForm }) => {

    const [visible, setVisible] = React.useState(false)

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

                    <textarea className="textarea"
                        required
                        value={contributionText}
                        onChange={(e) => {
                            setContributionText(e.target.value);
                        }}
                        placeholder="Gib deinen Beitrag zum Thema!"
                    ></textarea>
                    <button>Anfügen</button>
                    <button>Absenden</button>
                </form>
            </div>
        )
    }

    const openForm = (event) => {
        event.preventDefault();
        setVisible(true)
    }
    const closeForm = (event) => {
        event.preventDefault();
        setVisible(false)
    }
    return (
        <div>
            {!visible && <button className="addContribution" onClick={openForm}>+</button>}
            {visible && <div><AddNewContributionForm /><button className="discardContribution" onClick={closeForm}>Verwerfen</button></div>}
        </div>
    )
};

export default NewContributionForm;