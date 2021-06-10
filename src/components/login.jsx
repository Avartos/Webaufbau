import React, { useState } from "react";
import {Link} from "react-router-dom";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userName);
        console.log(password);
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

