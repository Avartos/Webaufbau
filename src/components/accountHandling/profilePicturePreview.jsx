import config from "../../core/config";

/**
 * This component represents a single clickable icon in the profile picture list
 */
const ProfilePicturePreview = (props) => {
  return (
    <img
      className="picturePreview"
      src={`${config.serverPath}/profile_pictures/${props.path}`}
      alt={props.title}
      title={props.title}
      onClick={() => props.handleUpdate(props.id)}
    />
  );
};

export default ProfilePicturePreview;
