import { ReactComponent as AvatarFrame } from "../assets/icons/avatarFrame.svg";

/**
 * This component represents the profile picture
 * It is used to have the actual picture behind a bully eye
 * @param {*} param0 
 * @returns 
 */
const ProfilePicture = ({path}) => {
    return ( 
        <div className="profilePicture">
            <AvatarFrame className="frame"></AvatarFrame>
            <img className="image" src={`http://localhost:3001/profile_pictures/${path}`} alt="" />
        </div>
     );
}
 
export default ProfilePicture;