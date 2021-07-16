import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";

import config from "../../core/config";
import helper from "../../core/helperFunctions";

import SubscribeButton from "../subscribeButton";
import NewThreadForm from "./newThreadForm";
import ReturnIcon from "../../assets/icons/returnIcon.svg";

/**
 * This component is used to display the current forum at the top of the thread list
 * It also provides a quick way to add a new thread
 * @param {*} param0
 */
const ForumHeader = ({ forum, handleSubmitNewThread, handleAddAlert }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  //used to handle the animation of the form
  const [formIsUnfolded, setFormIsUnfolded] = useState(false);
  const [formHeight, setFormHeight] = useState(0);
  const previewRef = React.useRef(null);

  useEffect(() => {
    if (forum.subscribedForums && forum.subscribedForums.length) {
      setIsSubscribed(true);
    } else {
      setIsSubscribed(false);
    }
  }, [forum]);

  //used to animate the form depending on whether the add new thread form is unfolded or not
  const calculateFormHeight = () => {
    const height = formIsUnfolded ? previewRef.current.clientHeight : 0;
    setFormHeight(height);
  };

  const handleSubmitForm = (e, title, body) => {
    setFormIsUnfolded(false);
    handleSubmitNewThread(e, title, body);
  };

  //used to subscribe the forum from the thread list view
  const handleSubscribeForum = (id) => {
    const subscribeMethod = isSubscribed ? "DELETE" : "POST";
    console.log(isSubscribed);
    fetch(`${config.serverPath}/api/forums/subscriptions/${id}`, {
      method: subscribeMethod,
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((req) => {
        if (!req.ok) {
          throw Error("Das Forum konnte nicht abonniert werden.");
        }
        setIsSubscribed(!isSubscribed);
      })
      .catch((error) => {
        handleAddAlert("error", "Fehler", error.message);
      });
  };

  return (
    <div className="forumHeader">
      <div className="header">
        <h2 className="title">
          {helper.shortenString(
            forum.title,
            config.shortenedTitleLength,
            "..."
          )}
        </h2>
        <Link to={"/"} className="wrapperReturn" title="Zurück zur Startseite">
          <img src={ReturnIcon} alt="zurück" />
        </Link>
        <div className="wrapperButton">
          {sessionStorage.getItem("accessToken") && (
            <SubscribeButton
              parentId={forum.id}
              isSubscribed={isSubscribed}
              handleSubscribe={handleSubscribeForum}
            />
          )}
        </div>
      </div>
      <div className="body">
        <p className="shortDescription">{forum.shortDescription}</p>
      </div>

      {helper.isLoggedIn() && (
        <React.Fragment>
          <button
            className="unfoldButton"
            onClick={() => {
              setFormIsUnfolded(!formIsUnfolded);
            }}
          >
            {!formIsUnfolded && <span>Neuen Thread anlegen</span>}
            {formIsUnfolded && <span>Formular schließen</span>}
          </button>
          <div className="wrapperForm" style={{ height: formHeight }}>
            <CSSTransition
              in={formIsUnfolded}
              timeout={500}
              unmountOnExit
              onEnter={calculateFormHeight}
              onExit={calculateFormHeight}
              nodeRef={previewRef}
            >
              <div ref={previewRef}>
                <NewThreadForm handleSubmitForm={handleSubmitForm} />
              </div>
            </CSSTransition>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ForumHeader;
