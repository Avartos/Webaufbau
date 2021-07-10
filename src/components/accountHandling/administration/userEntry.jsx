import ProfilePicture from "../../profilePicture";

const UserEntry = (props) => {
  const handleToggleIsAdmin = () => {
    const isAdmin = props.user.isAdmin === 1 ? false : true;
    const isEnabled = props.user.isEnabled === 1 ? true : false;
    props.handleUpdateUserLogin(props.user.id, isAdmin, isEnabled);
  };

  const handleToggleIsEnabled = () => {
    const isEnabled = props.user.isEnabled === 1 ? false : true;
    const isAdmin = props.user.isAdmin === 1 ? true : false;
    props.handleUpdateUserLogin(props.user.id, isAdmin, isEnabled);
  };

  return (
    <div className="userEntry row">
      <span className="cell">{props.user.id}</span>
      <span className="cell">{props.user.userName}</span>
      <span className="cell">
        <ProfilePicture path={props.user.profilePicturePath}></ProfilePicture>
      </span>
      <span className="cell">
        <input
          type="checkbox"
          onChange={handleToggleIsAdmin}
          defaultChecked={props.user.isAdmin}
        />
      </span>
      <span className="cell">
        <input
          type="checkbox"
          onChange={handleToggleIsEnabled}
          defaultChecked={props.user.isEnabled}
        />
      </span>
    </div>
  );
};

export default UserEntry;
