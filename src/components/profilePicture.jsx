import { ReactComponent as AvatarFrame } from "../assets/icons/avatarFrame.svg";

const ProfilePicture = ({path}) => {
    return ( 
        <div className="profilePicture">
            <AvatarFrame className="frame"></AvatarFrame>
            <img className="image" src={`http://localhost:3001/profile_pictures/${path}`} alt="" />
        </div>
     );
}
 
export default ProfilePicture;