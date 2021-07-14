import React, { useState } from "react";
import ReplyIcon from "@material-ui/icons/Reply";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import config from "../core/config";
import ProfilePicture from "./profilePicture";
import classNames from "classnames";
import { ReactComponent as EditIcon } from "../assets/icons/pencil.svg";


function Contribution({
  contribution,
  handleRate,
  threadId,
  handleAddAlert,
  handleSubmitContribution,
  isReply = false,
  isReplyButtonVisible = true,
}) {
  // const [count, setCount] = useState(0);
  const [reply, setReply] = useState(false);
  const [replies, setReplies] = useState(contribution.replies || []);

  const AddNewContributionForm = ({ onDiscard }) => {
    const [contributionText, setContributionText] = useState("");

    return (
      <div className="newContributionForm">
        <form
          className="body"
          onSubmit={(e) => {
            handleSubmitContribution(
              e,
              contributionText,
              contribution.creatorUserName
            );
            setContributionText("");
            onDiscard();
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
            <button
              className="discardContribution"
              onClick={onDiscard}
              type="button"
            >
              Verwerfen
            </button>
            {/* <button type="button" onClick={() => input.current.click()}>Anfügen</button> */}
            <button>Absenden</button>
          </div>
        </form>
      </div>
    );
  };

  const getCurrentRating = () => {
    if (contribution.ratings && contribution.ratings.length > 0) {
      return parseInt(contribution.ratings[0].rating);
    }
    return 0;
  };

  const isLoggedIn = () => {
    return sessionStorage.getItem("accessToken") !== null;
  };

  const positiveRatingClass = classNames({
    counterButton: true,
    isActive: getCurrentRating() === 1 || !isLoggedIn(),
  });

  const negativeRatingClass = classNames({
    counterButton: true,
    isActive: getCurrentRating() === -1 || !isLoggedIn(),
  });

  const discardReply = () => {
    console.log("Tehehehest");
    setReply(false);
  };

  const [isEditMode, setIsEditMode] = useState(false);
  const [body, setBody] = useState();

  //used to switch from view to edit mode.
  //thread title and thread body are replaced by input fields, when in edit mode
  const handleToggleEditMode = () => {
    setBody(contribution.content);
    setIsEditMode(!isEditMode);
  };

  //close edit mode and reset values when user aborts
  const handleAbortEdit = () => {
    setBody(contribution.content);
    setIsEditMode(false);
  };

  const handleSendChangedContribution = () => {
    let updatedThread = {
      id: contribution.id,
      content: body,
    };
    fetch(`${config.serverPath}/api/contributions/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(updatedThread),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Der Thread konnte nicht aktualisiert werden");
        }
        setIsEditMode(false);
        contribution.content = body;
        handleAddAlert(
          "success",
          "",
          "Ihr Thread wurde erfolgreich aktualisiert!"
        );
      })

      .catch((error) => {
        handleAddAlert(
          "error",
          "Fehler",
          "Beim Aktualisieren des Threads ist ein Fehler aufgetreten."
        );
      });
  };

  return (
    <div className="contribution">
      <div className="pictureWrapper">
        <ProfilePicture path={contribution.picturePath} />
      </div>
      <div className="header">
        {contribution.isEditable && (
          <div className="wrapperButton">
            <EditIcon
              className="editButton"
              onClick={handleToggleEditMode}
              title="bearbeiten"
            ></EditIcon>
          </div>
        )}
        <p className="title">Von: {contribution.creatorUserName}</p>
      </div>
      <div className="body">
      {!isReply && !reply && isLoggedIn() && isReplyButtonVisible && (
        <button className="replyButton" onClick={() => setReply(true)}>
          {" "}
          <ReplyIcon className="ignoreClick" />{" "}
        </button>
      )}
      </div>
      {!isEditMode && <p className="body">{contribution.content}</p>}
      {isEditMode && (<div >
          <textarea  value={body} onChange={(e) => {setBody(e.target.value)}}></textarea>
          <button className="abortButton" onClick={handleAbortEdit}>
              Abbrechen
            </button>
            <button
              className="saveChangeButton"
              onClick={handleSendChangedContribution}
            >
              Änderungen bestätigen
            </button>
          </div>)}
      <div className="counterOfLikes">
        <button
          className={negativeRatingClass}
          onClick={() => handleRate(-1, contribution.id)}
          disabled={!isLoggedIn()}
        >
          {" "}
          <RemoveIcon
            className="ignoreClick"
            onClick={() => handleRate(-1, contribution.id)}
          />{" "}
        </button>
        <p>{contribution.actualRating}</p>
        <button
          className={positiveRatingClass}
          onClick={() => handleRate(1, contribution.id)}
          disabled={!isLoggedIn()}
        >
          {" "}
          <AddIcon
            className="ignoreClick"
            onClick={() => handleRate(-1, contribution.id)}
          />{" "}
        </button>
      </div>
      
      {!isReply && reply && (
        <div>
          <AddNewContributionForm onDiscard={discardReply} />
        </div>
      )}

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
  );
}

export default Contribution;
