import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const Login = ({ handleAddAlert, handleUpdateProfilePicture, handleUpdateFavbar, handleConnectSocket }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    let user = {
      userName: userName,
      passwordHash: password,
    };

    fetch(`http://localhost:3001/api/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 401) {
          throw Error("Nutzername oder Passwort sind falsch.");
        }
        if (!response.ok) {
          throw Error("Ein unbekannter Fehler ist aufgetreten.");
        }
        return response.json();
      })
      .then((data) => {
        sessionStorage.setItem("accessToken", data.accessToken);
        sessionStorage.setItem('profilePicture', data.profilePicturePath);
        sessionStorage.setItem('isAdmin', data.isAdmin);
        handleAddAlert(
          "success",
          "Hallo",
          "Sie wurden erfolgreich angemeldet!"
        );
        handleUpdateFavbar();
        handleUpdateProfilePicture();
        handleConnectSocket();
        history.push("/");
      })
      .catch((error) => {
        handleAddAlert("error", "Fehler", error.message);
      });
  };

  return (
    <div className="login">
      <div className="header">
        <span className="title">Login</span>
      </div>
      <div className="body">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label>Benutzername</label>
            <input
              placeholder="Benutzername"
              className="loginInput"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <label>Password</label>
            <input
              placeholder="Passwort"
              className="loginInput"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <button className="loginButton">Login</button>
          </div>
        </form>

        <div>
          <Link to="/registration">Registrierung</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
