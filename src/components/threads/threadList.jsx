import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Thread from "./thread";
import NewThreadForm from "./newThreadForm";
import CollapsibleError from "../collapsibleError";
import LoadingCircle from "../loadingCircle";

const ThreadList = () => {
  const { forumId } = useParams("forumId");

  const [threads, setThreads] = useState();
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const fetchThreads = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    fetch(`http://localhost:3001/api/threads/all/${forumId}`, {
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for that resource!");
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
          setError(error.message);
          setIsPending(false);
        }
      });
    return () => console.log(abortController.abort());
  };

  useEffect(fetchThreads, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [unfoldedThreadId, setUnfoldedThreadId] = useState(-1);

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
      });
  };

  const handleTogglePreview = (id) => {
    let targetThreadId = unfoldedThreadId;
    targetThreadId = targetThreadId === id ? -1 : id;
    setUnfoldedThreadId(targetThreadId);
  };

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
      })
      .catch((error) => {
        setError(
          "Das Formular konnte nicht abgeschickt werden (" + error + ")"
        );
      });
  };

  return (
    <React.Fragment>
      <h3>Threads {forumId}</h3>
      <div className="threadList">
        <CollapsibleError description={error} />
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
      {sessionStorage.getItem("accessToken") && (
        <NewThreadForm handleSubmitForm={handleSubmitNewThread} />
      )}
    </React.Fragment>
  );
};

export default ThreadList;
