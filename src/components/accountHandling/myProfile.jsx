import React, { useState, useEffect } from "react";
import ProfilePictureSelectButton from "./profilePictureSelectButton";
import Alert from "@material-ui/lab/Alert";

/**
 * This component is used to control the own profile
 * It allows users to choose another profile picture or to change the current password
 */
const MyProfile = (props) => {
  const [isPending, setIsPending] = useState(true);
  const [user, setUser] = useState();

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatedPassword, setRepeatedPassword] = useState("");

  const [requiredFieldsAreOk, setRequiredFieldsAreOk] = useState("");
  const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState("");
  const [isInvalidPasswordFormat, setIsInvalidPasswordFormat] = useState("");

  //checks, if the new password fullfills all conditions
  const checkPasswordConditions = (password) => {
    if (password) {
      let hasLength = password.length >= 8;
      let hasLowerCase = password.match(/[a-z]/m);
      let hasUpperCase = password.match(/[A-Z]/m);
      let hasNumber = password.match(/[0-9]/m);
      let hasSpecial = password.match(
        /[@#^!"'ยง$%&/()=*\-+,.;:_<>?|\\{}\[\]]/m
      );

      if (
        !hasLength ||
        !hasLowerCase ||
        !hasUpperCase ||
        !hasNumber ||
        !hasSpecial
      ) {
        setIsInvalidPasswordFormat(true);
      } else {
        setIsInvalidPasswordFormat(false);
      }
    }
  };

  //checks if both passwords are equal
  const equalPasswords = (password, passwordTwo) => {
    if (password !== passwordTwo) {
      setPasswordsAreNotEqual(true);
    } else {
      setPasswordsAreNotEqual(false);
    }
  };

  const fetchUser = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    setIsPending(true);
    fetch(`http://localhost:3001/api/users/`, {
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
        setUser(data);
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

  useEffect(() => {
    fetchUser();
  }, []);

  const handleUpdatePasswort = (e) => {
    e.preventDefault();
    if (
      passwordsAreNotEqual ||
      isInvalidPasswordFormat ||
      currentPassword === "" ||
      password === ""
    ) {
      setRequiredFieldsAreOk(false);
      return;
    }

    const passwordObject = {
      currentPassword: currentPassword,
      newPassword: password,
      repeatedPassword: repeatedPassword,
    };

    fetch(`http://localhost:3001/api/users/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordObject),
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Password-change failed!");
        }
        props.handleAddAlert(
          "success",
          "Registriert!",
          "Ihr passwort wurde erfolgreich geändert!"
        );
      })
      .catch((error) => {
        props.handleAddAlert(
          "error",
          "Fehler",
          "Ihr Passwort konnte nicht aktualisiert werden."
        );
      });
  };

  return (
    <div className="myProfile">
      {!isPending && (
        <React.Fragment>
          <div className="header">
            <span>Das ist dein Profil {user.userName}</span>
          </div>
          <div className="body">
            <h3>Profilbild ändern</h3>
            <span>
              Klicken Sie auf das Bild und wählen Sie einen unserer Avatare als
              neues Profilbild aus.
            </span>
            <ProfilePictureSelectButton
              handleUpdateProfilePicture={props.handleUpdateProfilePicture}
            ></ProfilePictureSelectButton>

            <form
              onClick={(e) => {
                handleUpdatePasswort(e);
              }}
            >
              <h3>Passwort aktualisieren</h3>
              <label>Aktuelles Passwort</label>
              <input
                placeholder="aktuelles Passwort"
                type="password"
                value={currentPassword}
                onChange={(e) => {
                  setCurrentPassword(e.target.value);
                }}
              ></input>

              <label>Password</label>
              <input
                placeholder="Passwort"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkPasswordConditions(e.target.value);
                }}
              ></input>

              <label>Password</label>
              <input
                placeholder="Passwort wiederholen"
                type="password"
                value={repeatedPassword}
                onChange={(e) => {
                  setRepeatedPassword(e.target.value);
                  equalPasswords(password, e.target.value);
                }}
              ></input>

              {!requiredFieldsAreOk && (
                <Alert severity="error" className="error">
                  Bitte füllen Sie alle Felder aus!
                </Alert>
              )}
              {passwordsAreNotEqual && (
                <Alert severity="error" className="error">
                  Die eingegebenen Passwörter stimmen nicht überein!
                </Alert>
              )}
              {isInvalidPasswordFormat && (
                <Alert severity="error" className="error">
                  "Ihr Passwort muss mindestes 8 Zeichen lang sein, aus Groß-,
                  Kleinbuchstaben, Zahlen und Sonderzeichen bestehen!"
                </Alert>
              )}
              <button>Passwort aktualisieren</button>
            </form>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default MyProfile;
