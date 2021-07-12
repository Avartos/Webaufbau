import React, {useEffect, useState} from "react";
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router-dom";
import {Error} from "@material-ui/icons";

const Signin = ({handleAddAlert}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");

    useEffect(() => {
        createUserName();
    }, [])

    const [requiredFieldsAreOk, setRequiredFieldsAreOk] = useState("");
    const [passwordsAreNotEqual, setPasswordsAreNotEqual] = useState("");
    const [isInvalidPasswordFormat, setIsInvalidPasswordFormat] = useState("");

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            passwordsAreNotEqual ||
            isInvalidPasswordFormat ||
            userName === "" ||
            password === ""
        ) {
            setRequiredFieldsAreOk(false);
            return;
        }

        let user = {
            userName: userName,
            passwordHash: password,
        };


        fetch(`http://localhost:3001/api/users`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user),
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error("Fehler beim erstellen")
                };
                handleAddAlert(
                    "success",
                    "Registriert!",
                    "Sie wurden erfolgreich registriert."
                );
                history.push("/login");
            })
            .catch((error) => {
                handleAddAlert(
                    "error",
                    "Fehler",
                    "Das Formular konnte nicht abgeschickt werden."
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
                setIsInvalidPasswordFormat(true);
            } else {
                setIsInvalidPasswordFormat(false);
            }
        }
    };

    const equalPasswords = (password, passwordTwo) => {
        if (password !== passwordTwo) {
            setPasswordsAreNotEqual(true);
        } else {
            setPasswordsAreNotEqual(false);
        }
    };

    const createUserName = () => {
        let randomNumber = Math.floor(Math.random() * (30000 - 10 + 1) + 10);
        setUserName("Squid" + randomNumber);
        return;
    };


    return (
        <div className="signUp">
            <div className="header">
                <span className="title">Registrierung</span>
            </div>
            <div className="body">
                <form
                    onSubmit={(e) => {
                        handleSubmit(e);
                    }}
                >
                    <label>Benutzername</label>
                    <input
                        placeholder="Benutzername"
                        className="signinInput"
                        type="text"
                        value={userName}
                        /*onChange={(e) => {
                          setUserName(e.target.value);
                        }}*/
                        readOnly={true}
                    ></input>

                    <label>Password</label>
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

                    <label>Password</label>
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

                    <div>
                        <button className="signinButton">Registriere mich!</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
