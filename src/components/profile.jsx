import { ReactComponent as ProfilePicture} from "../assets/icons/profilePicture.svg";
import React, {useState} from "react";
import ProfileStats from "./profileStats"
import ProfileButtons from "./profileButtons"



const Profile = (props) => {

    const [username, setUsername] = useState("Squid#2027");
    const [email, setEmail] = useState("squiddy@pool.de");

    if (props.roll == "user")
    {
        return(
            <div className="wrapper-account">
                <ProfileStats username={username} email={email} />
                <ProfilePicture/>
                <ProfileButtons roll={props.roll}/>
            </div>
        );
    } else if (props.roll == "admin")
    {
        return(
            <div className="wrapper-account">
                <input type="text"/>
                <ProfileStats username={username} email={email} />
                <ProfilePicture/>
                <ProfileButtons roll={props.roll}/>
            </div>
        );
    }
}
export default Profile;