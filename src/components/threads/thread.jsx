import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import {ReactComponent as EditIcon} from '../../assets/icons/pencil.svg';


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
  const [contributions, setContributions] = useState(null);

  //used to animate the height of the preview list based on the actual content height
  const [previewHeight, setPreviewHeight] = useState(0);

  //the date of the last post, can be either the
  //date of the thread or the date of the last contribution
  const [lastPostDate, setLastPostDate] = useState(props.thread.createdAt);

  //the username of the last poster, can be either the username of the
  //thread author or the username of the last contribution author
  const [lastPoster, setLastPoster] = useState(props.thread.creatorUserName);

  //the number of contributions that is max. displayed below a thread
  const contributionLimit = 5;

  //used to reference to the preview list
  const previewRef = React.useRef(null);

  //toggles the visibility of the input field to change the thread data
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const handleLoadContributionPreviews = () => {
    //only fetch contributions, if they aren't already fetched
    props.handleTogglePreview(props.thread.id);
    if (!contributions) {
      fetchContributions();
    }
  };

  const fetchContributions = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    setIsPending(true);
    fetch(
      `http://localhost:3001/api/contributions/all/${props.thread.id}?limit=${contributionLimit}&offset=0&orderBy=createdAt&order=desc`,
      {
        signal: abortController.signal,
        headers: {
          "Content-Type": "application/json",
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

  /**
   *  determines target height of the previewList depending on current unfold State
   */
  const calculatePreviewHeight = () => {
    const height = props.isUnfolded ? previewRef.current.clientHeight : 0;
    setPreviewHeight(height);
  };

  /**
   *  used to change the last post information, if there are already contributions
   */
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

  const handleToggleEditMode = () => {
    setTitle(props.thread.title);
    setBody(props.thread.content);
    setIsEditMode(!isEditMode);
  };

  const handleSendChangedThread = () => {
    let updatedThread = {
      id: props.thread.id,
      title: title,
      content: body,
    };
    fetch(`http://localhost:3001/api/threads/`, {
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

      .catch((error) => {
        props.handleAddAlert(
          "error",
          "Fehler",
          "Beim Aktualisieren des Threads ist ein Fehler aufgetreten."
        );
      });
  };

  return (
    <div className="thread">
      <div className="header">
        {!isEditMode && (
          <Link className="title" to={`/contributions/${props.thread.id}`}>
            Thread: {props.thread.title}
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
          <div className="wrapperButton">
            <EditIcon className="editButton" onClick={handleToggleEditMode}></EditIcon>
            {/* <CreateIcon ></CreateIcon> */}
          </div>
        )}

        {/* hide the subscribe button, if the user is not logged in */}
        {sessionStorage.getItem("accessToken") && (
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
          <p className="shortDescription">{props.thread.content}</p>
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
