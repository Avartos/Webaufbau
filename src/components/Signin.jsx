import React, { useState } from "react";

const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");
    const [comparePasswords, setComparePasswords] = useState("");
    const [passwordConditions, setPasswordConditions] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(userName);
        console.log(password);
        console.log(passwordTwo);
    }

    const checkPasswordConditions = (password) =>{
        if(password) {

            let hasLength       = password.length >= 8;
            let hasLowerCase    = password.match(/[a-z]/m);
            let hasUpperCase    = password.match(/[A-Z]/m);
            let hasNumber       = password.match(/[0-9]/m);
            let hasSpecial      = password.match(/[@#^!"'ยง$%&/()=*\-+,.;:_<>?|\\{}\[\]]/m);
    
    
            if (hasLength && hasLowerCase && hasUpperCase && hasNumber && hasSpecial) {
                setPasswordConditions("");
            } else if (hasLowerCase && hasUpperCase && hasNumber && hasSpecial) {
                setPasswordConditions("Ihr Passwort muss mindestes 8 Zeichen lang sein, aus Groß-, Kleinbuchstaben, Zahlen und Sonderzeichen bestehen!");
            } else if (hasLowerCase && hasUpperCase) {
                setPasswordConditions("Ihr Passwort muss mindestes 8 Zeichen lang sein, aus Groß-, Kleinbuchstaben, Zahlen und Sonderzeichen bestehen!");
            } else {
                setPasswordConditions("Ihr Passwort muss mindestes 8 Zeichen lang sein, aus Groß-, Kleinbuchstaben, Zahlen und Sonderzeichen bestehen!");
            }
         }
    }

    const equalPasswords = (password, passwordTwo) =>{
        if (password !== passwordTwo){
            setComparePasswords("Die Passwörter sind nicht gleich");
        } else {
            setComparePasswords("");
        }
    }



    return ( 
        <div className = "Sigin">
            <div className = "LoginHeader">
                            <span className = "LoginTitle">Registrierung</span>
                        </div>
                        <form onSubmit = {(e) =>{
                            handleSubmit(e);
                        }}>

                        <div>
                            <label className = "LoginLabel">Benutzername: </label>
                            <input placeholder="Benutzername" className = "LoginInput"
                            type = "text"
                            value = {userName}
                            onChange = {(e) => {
                                setUserName(e.target.value);
                            }}></input>
                        </div>
                        
                        <div>
                            <label className = "LoginLabel">Password: </label>
                            <input placeholder="Passwort" className = "LoginInput"
                                type = "password"
                                value = {password}
                                onChange = {(e) => {
                                    setPassword(e.target.value);
                                    checkPasswordConditions(e.target.value);
                                }}>

                                </input>    
                        </div>

                        <div>
                            <label className = "LoginLabel">Password: </label>
                            <input placeholder="nochmal das Passwort"className = "LoginInput"
                                type = "password"
                                value = {passwordTwo}
                                onChange = {(e) => {
                                    setPasswordTwo(e.target.value);
                                    equalPasswords(password, e.target.value);
                                }}>

                                </input>    
                                <p className="errorMessage">{comparePasswords}</p>
                                <p className="errorMessage">{passwordConditions}</p>
                        </div>

                        <div>
                            <button name="loginButton" className = "LoginButton">Registriere mich!</button>
                        </div>
                    </form>
                

        </div>
     );
}
 
export default Signin;