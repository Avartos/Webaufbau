import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";
import classNames from "classnames";
import config from "../core/config";

/**
 * This component is used to provide the user a way to request a token from the backend to use the external squid api
 */
const ApiTokenForm = ({ handleAddAlert }) => {
  const [token, setToken] = useState("");
  const [handleToggleLinks, setHandleToggleLinks] = useState(false);
  const [isPending, setIsPending] = useState(false);

  //used to set the class name of the button to hide the text, when loading
  const tokenButtonClass = classNames({
    isLoading: isPending,
  });

  const handleRequestToken = (e) => {
    e.preventDefault();
    setHandleToggleLinks(!handleToggleLinks);
    const abortController = new AbortController();
    fetch(`${config.serverPath}/api/apiToken`, {
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(
            "Fehler beim Generieren des Token! Bitte versuchen Sie es später erneut."
          );
        }
        return res.json();
      })
      .then((data) => {
        setToken(data);
        setIsPending(false);
        handleAddAlert(
          "success",
          "Token generiert",
          "Ihr Token wurde erfolgreich generiert!"
        );
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          handleAddAlert("error", "Fehler", error.message);
          setIsPending(false);
        }
      });
    setIsPending(true);
  };

  return (
    <form className="tokenForm">
      <div className="header">
        <h2>API-Token anfordern</h2>
      </div>
      <div className="body">
        <p>
          Damit Sie die API, die von SQUID zur Verfügung gestellt wird, nutzen
          können, müssen Sie zunächst ein API-Token anfordern. Die API antwortet
          lediglich auf Anfragen mit gültigem API Token.
        </p>
        <input type="text" readOnly className="tokenDisplay" value={token} />
        <button
          className={tokenButtonClass}
          onClick={handleRequestToken}
          disabled={token !== ""}
        >
          Token Anfordern
          {isPending && !token && (
            <div className="loadingCircle">
              <CircularProgress></CircularProgress>
            </div>
          )}
        </button>
        {handleToggleLinks && (
          <div>
            <h3>Link für Foren mit Token</h3>
            <span>
              {config.serverPath}/squid/random/forum?t={token}
            </span>
            <h3>Link für Thread mit Token</h3>
            <span>
              {config.serverPath}/squid/random/thread?t={token}
            </span>
          </div>
        )}
      </div>
    </form>
  );
};

export default ApiTokenForm;
