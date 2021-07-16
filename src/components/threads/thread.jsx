import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { ReactComponent as EditIcon } from "../../assets/icons/pencil.svg";

import helper from "../../core/helperFunctions";
import config from "../../core/config";

import PreviewList from "./previewList";
import SubscribeButton from "../subscribeButton";
import ThreadStatistics from "./threadStatistics";

/**
 * This component represents a single thread that can be listed inside the threadList component
 * @param {*} props
 * @returns jsx for a single thread
 */
const Thread = (props) => {
  //variables for preview Fetch
  const [isPending, setIsPending] = useState(false);

  //the contributions that are used as preview
  const [contributions, setContributions] = useState([]);

  //used to animate the height of the preview list based on the actual content height
  const [previewHeight, setPreviewHeight] = useState(0);

  //the date of the last post, can be either the
  //date of the thread or the date of the last contribution
  const [lastPostDate, setLastPostDate] = useState(props.thread.createdAt);

  //the username of the last poster, can be either the username of the
  //thread author or the username of the last contribution author
  const [lastPoster, setLastPoster] = useState(props.thread.creatorUserName);

  //used to reference to the preview list
  const previewRef = React.useRef(null);

  //toggles the visibility of the input field to change the thread data
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const handleLoadContributionPreviews = () => {
    props.handleTogglePreview(props.thread.id);
    fetchContributions();
  };

  const fetchContributions = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    setIsPending(true);
    fetch(
      `${config.serverPath}/api/contributions/all/${props.thread.id}?limit=${config.numberOfContributionPreviews}&offset=0&orderBy=createdAt&order=desc`,
      {
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
          accessToken: sessionStorage.getItem("accessToken"),
        },
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for that resource!");
        }
        return res.json();
      })
      .then((data) => {
        setContributions(data);
        setIsPending(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          setIsPending(false);
        }
      });
    return () => console.log(abortController.abort());
  };

  // determines target height of the previewList depending on current unfold State
  const calculatePreviewHeight = () => {
    const height = props.isUnfolded ? previewRef.current.clientHeight : 0;
    setPreviewHeight(height);
  };

  // used to change the last post information, if there are already contributions
  const determineLastPostData = () => {
    if (props.thread.contributionCount !== 0) {
      setLastPostDate(props.thread.contributions[0].createdAt);
      setLastPoster(props.thread.contributions[0].user.userName);
    }
  };

  //automatically determine last post information on component mount
  useEffect(determineLastPostData, []); // eslint-disable-line react-hooks/exhaustive-deps

  //close edit mode and reset values when user aborts
  const handleAbortEdit = () => {
    setTitle(props.thread.title);
    setBody(props.thread.content);
    setIsEditMode(false);
  };

  //used to switch from view to edit mode.
  //thread title and thread body are replaced by input fields, when in edit mode
  const handleToggleEditMode = () => {
    setTitle(props.thread.title);
    setBody(props.thread.content);
    setIsEditMode(!isEditMode);
  };

  //used to save an updated thread
  const handleSendChangedThread = () => {
    let updatedThread = {
      id: props.thread.id,
      title: title,
      content: body,
    };
    fetch(`${config.serverPath}/api/threads/`, {
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
        props.thread.title = title;
        props.thread.content = body;
        props.handleAddAlert(
          "success",
          "",
          "Ihr Thread wurde erfolgreich aktualisiert!"
        );
      })

      .catch(() => {
        props.handleAddAlert(
          "error",
          "Fehler",
          "Beim Aktualisieren des Threads ist ein Fehler aufgetreten."
        );
      });
  };

  //used to update the rating of a contribution within the preview list
  const handleRate = (rate, contributionId) => {
    const newRate = { rating: rate };

    fetch(`http://localhost:3001/api/ratings/${contributionId}`, {
      method: "POST",
      body: JSON.stringify(newRate),
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(
            "Fehler beim Abrufen der Contributions! Bitte versuchen sie es später erneut!"
          );
        }
        fetchContributions();
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          props.handleAddAlert("error", "Fehler", error.message);
        }
      });
  };

  return (
    <div className="thread">
      <div className="header">
        {!isEditMode && (
          <Link
            className="title"
            to={`/contributions/${props.thread.id}`}
            title={props.thread.title}
          >
            {helper.shortenString(
              props.thread.title,
              config.shortenedTitleLength,
              "..."
            )}
          </Link>
        )}
        {isEditMode && (
          <input
            type="text"
            className="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        )}
        {props.thread.isEditable && (
          <div className="wrapperEdit">
            <EditIcon
              className="editButton"
              onClick={handleToggleEditMode}
            ></EditIcon>
          </div>
        )}

        {/* hide the subscribe button, if the user is not logged in */}
        {helper.isLoggedIn() && (
          <div className="wrapperButton">
            <SubscribeButton
              parentId={props.thread.id}
              isSubscribed={props.thread.subscriptionUsersId}
              handleSubscribe={props.handleSubscribe}
            />
          </div>
        )}
      </div>
      <div className="body">
        {!isEditMode && (
          <p className="shortDescription">
            {helper.shortenString(
              props.thread.content,
              config.shortenedDescriptionLength,
              "..."
            )}
          </p>
        )}
        {isEditMode && (
          <div className="shortDescription">
            <textarea
              cols="30"
              rows="10"
              value={body}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            ></textarea>
            <button className="abortButton" onClick={handleAbortEdit}>
              Abbrechen
            </button>
            <button
              className="saveChangeButton"
              onClick={handleSendChangedThread}
            >
              Änderungen bestätigen
            </button>
          </div>
        )}
        <ThreadStatistics
          createdAt={props.thread.createdAt}
          numberOfPosts={props.thread.contributionCount}
          lastPoster={lastPoster}
          lastPostDate={lastPostDate}
        />
      </div>
      {props.thread.contributionCount > 0 && (
        <React.Fragment>
          <button
            onClick={handleLoadContributionPreviews}
            className="loadMoreButton"
          >
            {isPending && (
              <span>
                <CircularProgress></CircularProgress>
              </span>
            )}
            {props.isUnfolded && !isPending && <span>-</span>}
            {!props.isUnfolded && !isPending && <span>+</span>}
          </button>

          <div className="wrapperPreview" style={{ height: previewHeight }}>
            <CSSTransition
              in={props.isUnfolded && !isPending}
              timeout={500}
              unmountOnExit
              onEnter={calculatePreviewHeight}
              onExit={calculatePreviewHeight}
              nodeRef={previewRef}
            >
              <div ref={previewRef}>
                <PreviewList
                  key={props.thread.id}
                  contributions={contributions}
                  handleRate={handleRate}
                />
              </div>
            </CSSTransition>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Thread;
