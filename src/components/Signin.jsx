const Signin = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordTwo, setPasswordTwo] = useState("");

    return ( 
        <div className = "Sigin">
            <div className = "LoginHeader">
                            <span className = "LoginTitle">Registrierung</span>
                        </div>
                        <form onSubmit = {(e) =>{
                            
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
                                }}>

                                </input>    
                        </div>

                        <div>
                            <button className = "LoginButton">Registriere mich!</button>
                        </div>
                    </form>
                

        </div>
     );
}
 
export default Signin;