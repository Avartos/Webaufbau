import React, { useState } from "react";
import {Link, useHistory} from "react-router-dom";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

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
              if (response.data.error){
                alert(response.data.error);
            //   }else{
            //     sessionStorage.setItem("accessToken", response.data);
            //     console.log("juhu");
            //     history.push("/"); 
               }
            return response.json();
            }).then(data=>{
                console.log(data);
            })
            .catch((error) => {
              setError(
                "Das Formular konnte nicht abgeschickt werden (" + error + ")"
              );
            });
        }
    

    return ( 
        <div className = "login">
            <div className = "header">
                <span className = "title">Login</span>
            </div>
            <div className="loginBody">
                <form onSubmit = {(e) =>{
                    handleSubmit(e);
                }}>
                
                
                <div>
                    <label className = "loginLabel">Benutzername: </label>
                    <input placeholder="Benutzername" className = "loginInput"
                    type = "text"
                    value = {userName}
                    onChange = {(e) => {
                        setUserName(e.target.value);
                    }}></input>
                </div>
                
                <div>
                    <label className = "loginLabel">Password: </label>
                    <input  placeholder="Passwort" className = "loginInput"
                        type = "password"
                        value = {password}
                        onChange = {(e) => {
                            setPassword(e.target.value);
                        }}>
                        </input>    
                </div>

                <div>
                    <button className = "loginButton">Login</button>
                </div>
                </form>

                <div>
                    <Link to = "/registration">Registrierung</Link>
                </div>

             </div>
        </div>
     );
}
 
export default Login;

