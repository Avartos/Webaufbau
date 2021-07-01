import React, { useState } from "react";

const Signin = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const [comparePasswords, setComparePasswords] = useState("");
  const [passwordConditions, setPasswordConditions] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userName);
    console.log(password);
    console.log(passwordTwo);

    let user = {
      userName: userName,
      passwordHash: password,
    };

    fetch(`http://localhost:3001/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(() => {
        console.log('dance');
      })
      .catch((error) => {
        setError(
          "Das Formular konnte nicht abgeschickt werden (" + error + ")"
        );
      });
  };

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
        setPasswordConditions(
          "Ihr Passwort muss mindestes 8 Zeichen lang sein, aus Groß-, Kleinbuchstaben, Zahlen und Sonderzeichen bestehen!"
        );
      } else {
        setPasswordConditions("");
      }
    }
  };

  const equalPasswords = (password, passwordTwo) => {
    if (password !== passwordTwo) {
      setComparePasswords("Die Passwörter sind nicht gleich");
    } else {
      setComparePasswords("");
    }
  };

  return (
    <div className="signin">
      <div className="header">
        <span className="title">Registrierung</span>
      </div>
      <div className="signinBody">
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <label className="signinLabel">Benutzername: </label>
            <input
              placeholder="Benutzername"
              className="signinInput"
              type="text"
              value={userName}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <label className="signinLabel">Password: </label>
            <input
              placeholder="Passwort"
              className="signinInput"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                checkPasswordConditions(e.target.value);
              }}
            ></input>
          </div>

          <div>
            <label className="signinLabel">Password: </label>
            <input
              placeholder="nochmal das Passwort"
              className="signinInput"
              type="password"
              value={passwordTwo}
              onChange={(e) => {
                setPasswordTwo(e.target.value);
                equalPasswords(password, e.target.value);
              }}
            ></input>
            <p className="errorMessage">{comparePasswords}</p>
            <p className="errorMessage">{passwordConditions}</p>
          </div>

          <div>
            <button className="signinButton">Registriere mich!</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
