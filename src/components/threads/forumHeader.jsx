import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import SubscribeButton from "../subscribeButton";
import NewThreadForm from "./newThreadForm";

const ForumHeader = ({ forum, handleSubmitNewThread, handleAddAlert }) => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [formIsUnfolded, setFormIsUnfolded] = useState(false);
  const [formHeight, setFormHeight] = useState(0);


  const previewRef = React.useRef(null);

  useEffect(() => {
    if(forum.subscribedForums && forum.subscribedForums.length) {
        setIsSubscribed(true)
    } else {
        setIsSubscribed(false);
    }
  }, [forum])

  const calculateFormHeight = () => {
    const height = formIsUnfolded ? previewRef.current.clientHeight : 0;
    setFormHeight(height);
  };

  const userIsLoggedIn = () => {
    return sessionStorage.getItem("accessToken") != null;
  };

  const handleSubmitForm = (e, title, body) => {
    setFormIsUnfolded(false);
    handleSubmitNewThread(e, title, body);
  }

  const handleSubscribeForum = (id) => {
    const subscribeMethod = isSubscribed ? "DELETE" : "POST";
    console.log(isSubscribed);
    fetch(`http://localhost:3001/api/forums/subscriptions/${id}`, {
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
        <h2 className="title">{forum.title}</h2>
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

      {/* only show the form, if the user is logged in */}
      {/* {sessionStorage.getItem("accessToken") && ( */}
      {userIsLoggedIn() && (
        <React.Fragment>
          <button
            className="unfoldButton"
            onClick={() => {
              setFormIsUnfolded(!formIsUnfolded);
            }}
          >
            Neuen Thread anlegen
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
