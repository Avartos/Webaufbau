import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Thread from "./thread";
import LoadingCircle from "../loadingCircle";
import ForumHeader from "./forumHeader";

/**
 * This component includes all threads of a single forum and the form to create a new thread
 * It also handles the functions to add a new thread or to subscribe existing threads
 * @param {handleAddAlert} reference to the function to add alerts to the app
 * @returns
 */
const ThreadList = ({ handleAddAlert }) => {
  const { forumId } = useParams("forumId");

  const [threads, setThreads] = useState();
  // used to check if the fetch is in progress
  const [isPending, setIsPending] = useState(true);
  // used to store fetch errors inside, null if there were no fetch errors
  const [error, setError] = useState(null);

  const [forum, setForum] = useState("");

  // contains the id of the thread, that is currently unfolded
  const [unfoldedThreadId, setUnfoldedThreadId] = useState(-1);

  const fetchThreads = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    fetch(`http://localhost:3001/api/threads/all/${forumId}`, {
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
        // undefined, if the user is not looged in
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(
            "Fehler beim Abrufen der Threads! Bitte versuchen Sie es später erneut."
          );
        }
        return res.json();
      })
      .then((data) => {
        setThreads(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          handleAddAlert("error", "Fehler", error.message);
          setError(error.message);
          setIsPending(false);
        }
      });
    return () => console.log(abortController.abort());
  };

  const fetchForum = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    fetch(`http://localhost:3001/api/forums/${forumId}`, {
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
        // undefined, if the user is not logged in
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(
            "Fehler beim Abrufen des Forums! Bitte versuchen Sie es später erneut."
          );
        }
        return res.json();
      })
      .then((data) => {
        setForum(data);
        setIsPending(false);
        setError(null);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          handleAddAlert("error", "Fehler", 'Fehler beim laden des Forums.');
          setError(error.message);
          setIsPending(false);
        }
      });
    return () => console.log(abortController.abort());
  };

  /**
   * toggles the subscription state of a thread
   * updates only the corresponding thread if the (un)subscription was successfull to transfer less data when subscribing
   * @param {*} id            id of the thread that should be subscribed
   * @param {*} isSubscribed  state of the subscription
   */
  const handleSubscribeThread = (id, isSubscribed) => {
    const subscribeMethod = isSubscribed ? "DELETE" : "POST";

    fetch(`http://localhost:3001/api/threads/subscriptions/${id}`, {
      method: subscribeMethod,
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((req) => {
        if (!req.ok) {
          throw Error("Der Thread konnte nicht abonniert werden.");
        }
        setError(null);
        let updatedThreads = threads;
        const index = updatedThreads.findIndex((thread) => thread.id === id);
        updatedThreads[index].subscriptionUsersId = updatedThreads[index]
          .subscriptionUsersId
          ? null
          : true;
        setThreads([...updatedThreads]);
      })
      .catch((error) => {
        setError(error);
        handleAddAlert("error", "Fehler", error.message);
      });
  };

  /**
   * Hides / unhides the preview of a single thread.
   * Only one thread at the same time can be unfolded.
   * @param {*} id id of the thread whose preview should be toggled
   */
  const handleTogglePreview = (id) => {
    let targetThreadId = unfoldedThreadId;
    targetThreadId = targetThreadId === id ? -1 : id;
    setUnfoldedThreadId(targetThreadId);
  };

  /**
   * Requests the api to build a new thread
   * Refreshes threads after the new thread has been added
   * @param {*} e The event of the calling form
   * @param {*} title the title of the thread
   * @param {*} body  the body of the thread
   */
  const handleSubmitNewThread = (e, title, body) => {
    e.preventDefault();

    let newThread = {
      title: title,
      content: body,
    };

    fetch(`http://localhost:3001/api/threads/${forumId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
      body: JSON.stringify(newThread),
    })
      .then(() => {
        fetchThreads();
        handleAddAlert("error", "Fehler", error.message);
      })
      .catch((error) => {
        setError(
          "Das Formular konnte nicht abgeschickt werden (" + error + ")"
        );
        handleAddAlert("success", "", "Ihr Thread wurde erfolgreich angelegt!");
      });
  };

  /**
   * Fetch threads whenever the component has been mounted
   */
  useEffect(() => {
    fetchThreads();
    fetchForum();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <React.Fragment>
      <ForumHeader forum={forum} handleSubmitNewThread={handleSubmitNewThread} handleAddAlert={handleAddAlert}></ForumHeader>

      <div className="threadList">
        <LoadingCircle
          isActive={isPending}
          loadingText={"Wird geladen..."}
        ></LoadingCircle>
        {!isPending && !threads && !error && <p>Es gibt noch keine Threads</p>}
        {!isPending &&
          threads &&
          threads.map((thread) => {
            return (
              <Thread
                key={thread.id}
                thread={thread}
                handleSubscribe={handleSubscribeThread}
                handleTogglePreview={handleTogglePreview}
                isUnfolded={thread.id === unfoldedThreadId}
              />
            );
          })}
      </div>
      

    </React.Fragment>
  );
};

export default ThreadList;
