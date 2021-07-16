import React, {useEffect, useState} from "react";
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router-dom";
import {Error} from "@material-ui/icons";
import config from "../../core/config";

const Signin = ({handleAddAlert}) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");

    useEffect(() => {
        createUserName();
    }, [])

    const [requiredFieldsAreOk, setRequiredFieldsAreOk] = useState(true);
    const [passwordsAreEqual, setPasswordsAreEqual] = useState(true);
    const [isInvalidPasswordFormat, setIsInvalidPasswordFormat] = useState(true);

    let history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (
            !passwordsAreEqual ||
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


        fetch(`${config.serverPath}/api/users`, {
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

    //In this function we check the password conditions
    const checkPasswordConditions = (password) => {
        if (password) {
            let hasLength = password.length >= 8;
            let hasLowerCase = password.match(/[a-z]/m);
            let hasUpperCase = password.match(/[A-Z]/m);
            let hasNumber = password.match(/[0-9]/m);
            //eslint-disable-next-line
            let hasSpecial = password.match(/[@#^!"'ยง$%&/()=*\-+,.;:_<>?|\\{}\[\]]/m);

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

    const checkIfPasswordsAreEqual = (password, passwordTwo) => {
        if (password !== passwordTwo) {
            setPasswordsAreEqual(false);
        } else {
            setPasswordsAreEqual(true);
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
                            checkIfPasswordsAreEqual(password, e.target.value);
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
                            checkIfPasswordsAreEqual(password, e.target.value);
                        }}
                    ></input>
                    {!requiredFieldsAreOk && (
                        <Alert severity="error" className="error">
                            Bitte füllen Sie alle Felder aus!
                        </Alert>
                    )}
                    {!passwordsAreEqual && (
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
