import { ReactComponent as AvatarFrame } from "../assets/icons/avatarFrame.svg";
import config from "../core/config";


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
            <img className="image" src={`${config.serverPath}/profile_pictures/${path}`} alt="" />
        </div>
     );
}
 
export default ProfilePicture;