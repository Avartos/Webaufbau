import { ReactComponent as ProfilePicture} from "../assets/icons/profilePicture.svg";
import React, {useState} from "react";
import ProfileStats from "./profileStats"
import ProfileButtons from "./profileButtons"
import "../assets/css/_profile.scss"



const Profile = (props) => {

    const [username, setUsername] = useState("Squid#2027");
    const [email, setEmail] = useState("squiddy@pool.de");

    if (props.roll === "user")
    {
        return(
            <div className="wrapper-account">
                <div className="header">
                    <h2>Userverwaltung</h2>
                </div>
                <div className="body">
                    <div className="left">
                        <ProfileStats username={username} email={email} />
                        <ProfileButtons roll={props.roll}/>
                    </div>
                    <div className="right">
                        <ProfilePicture/>
                    </div>
                </div>
            </div>
        );
    } else if (props.roll === "admin")
    {
        return(
            <div className="wrapper-account">
                <div className="header">
                    <h2>Userverwaltung</h2>
                </div>
                <div className="body">
                    <div className="left">
                        <input type="text"/>
                        <ProfileStats username={username} email={email} />
                        <ProfileButtons roll={props.roll}/>
                    </div>
                    <div className="right">
                        <ProfilePicture/>
                    </div>
                </div>
            </div>
        );
    }
}
export default Profile;