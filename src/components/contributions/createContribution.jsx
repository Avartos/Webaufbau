import React, { useState } from "react";

/**
 * This component includes the forms to add a new contribution to the contributions
 */
const NewContributionForm = ({ handleAddContribution }) => {
  const openForm = (event) => {
    event.preventDefault();
    setVisible(true);
  };
  const closeForm = () => {
    setVisible(false);
  };

  //variables to set the visibility of the form
  const [visible, setVisible] = useState(false);

  //let the user add a new contribution to a specific thread
  const AddNewContributionForm = ({ onDiscard }) => {
    //variables to add an unique text to the contribution
    const [contributionText, setContributionText] = useState("");

    return (
      <div className="newContributionForm">
        <form
          className="body"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddContribution(e, contributionText);
            setContributionText("");
            closeForm();
          }}
        >
          <div className="createArea">
            <textarea
              className="textarea"
              required
              value={contributionText}
              onChange={(e) => {
                setContributionText(e.target.value);
              }}
              placeholder="Gib deinen Beitrag zum Thema!"
            ></textarea>
            <div className="buttonArea">
              <button
                className="discardContribution"
                onClick={onDiscard}
                type="button"
              >
                Verwerfen
              </button>
              <button>Absenden</button>
            </div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div>
      {!visible && (
        <button className="addContribution" onClick={openForm}>
          +
        </button>
      )}
      {visible && (
        <div>
          <AddNewContributionForm onDiscard={closeForm} />
        </div>
      )}{" "}
    </div>
  );
};

export default NewContributionForm;
