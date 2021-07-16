import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import Contribution from "./contribution";
import { useEffect } from "react";
import ThreadHeader from "./threadHeader";

import config from "../../core/config";

/**
 * This component represents all contributions made to an specific thread
 */
const Contributions = ({ handleAddAlert, handleUpdateFavbar }) => {
  const [contributions, setContributions] = useState([]);
  const [thread, setThread] = useState(null);
  const { threadId } = useParams("threadId");
  const history = useHistory();

  const fetchContributions = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    fetch(`${config.serverPath}/api/contributions/all/${threadId}`, {
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
            "Fehler beim Abrufen der Contributions! Bitte versuchen sie es später erneut!"
          );
        }
        return res.json();
      })
      .then((data) => {
        setContributions([...data]);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          handleAddAlert("error", "Fehler", error.message);
        }
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchContributions, [threadId]);

  const fetchThreadHeader = () => {
    const abortController = new AbortController();
    fetch(`${config.serverPath}/api/threads/${threadId}`, {
      signal: abortController.signal,
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
        return res.json();
      })
      .then((data) => {
        if (data.length === 0) {
          throw Error("Der gesuchte Thread existiert nicht!");
        }
        setThread(data);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          handleAddAlert("error", "Fehler", error.message);
          history.push("/404");
        }
      });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fetchThreadHeader, [threadId]);

  //refers to another users contribution with a "@" if the current user makes a reply
  const handleAddContribution = async (e, contributionText, currentUser) => {
    e.preventDefault();
    const text = currentUser
      ? `@${currentUser} ${contributionText}`
      : contributionText;

    let newContribution = {
      contributionText: text,
    };

    const response = await fetch(
      `${config.serverPath}/api/contributions/${threadId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accessToken: sessionStorage.getItem("accessToken"),
        },
        body: JSON.stringify(newContribution),
      }
    );

    if (!response.ok) {
      return handleAddAlert(
        "error",
        "Fehler",
        "Das Formular konnte nicht abgeschickt werden."
      );
    }
    fetchContributions();
    handleAddAlert("success", "", "Ihr Beitrag wurde erfolgreich angelegt!");
  };

  //updates the rating of a contribution if the user likes or dislikes it
  const handleRate = (rate, contributionId) => {
    const newRate = { rating: rate };

    fetch(`${config.serverPath}/api/ratings/${contributionId}`, {
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
            "Fehler beim Abrufen der Beiträge! Bitte versuchen sie es später erneut!"
          );
        }
        fetchContributions();
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          handleAddAlert("error", "Fehler", error.message);
        }
      });
  };

  return (
    <div className="contributions">
      <React.Fragment>
        {thread && thread.length > 0 && (
          <ThreadHeader
            thread={thread}
            handleAddContribution={handleAddContribution}
            handleAddAlert={handleAddAlert}
            handleUpdateFavbar={handleUpdateFavbar}
            fetchThreadHeader={fetchThreadHeader}
          />
        )}
        <div className="contributionsList">
          {contributions.map((contribution, index) => {
            return (
              <Contribution
                handleAddAlert={handleAddAlert}
                handleSubmitContribution={handleAddContribution}
                threadId={threadId}
                contribution={contribution}
                key={index}
                handleRate={handleRate}
              />
            );
          })}
        </div>
      </React.Fragment>
    </div>
  );
};

export default Contributions;
