import React, { useState } from "react";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userName);
        console.log(password);
    }
    

    return ( 
        <div className = "Login">
            <div className = "LoginHeader">
                <span className = "LoginTitle">Login</span>
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
                 <input  placeholder="Passwort" className = "LoginInput"
                    type = "password"
                    value = {password}
                    onChange = {(e) => {
                        setPassword(e.target.value);
                    }}>

                    </input>    
             </div>

             <div>
                 <button className = "LoginButton">Login</button>
             </div>
             </form>

             <div>
                 <a href = "/">Registrierung</a>
             </div>
             <p>{userName}</p>
             <p>{password}</p>
        </div>
     );
}
 
export default Login;