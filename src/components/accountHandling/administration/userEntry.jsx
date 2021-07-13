import ProfilePicture from "../../profilePicture";

/**
 * This components is a single entry for the admin panel
 * It provides data of a single user
 * @param {*} props
 * @returns
 */
const UserEntry = (props) => {
  //updates the user profile and changes the isAmdin value
  const handleToggleIsAdmin = () => {
    const isAdmin = props.user.isAdmin === 1 ? false : true;
    const isEnabled = props.user.isEnabled === 1 ? true : false;
    props.handleUpdateUserLogin(props.user.id, isAdmin, isEnabled);
  };

  //updates the user profile and changes the isEnabled value
  const handleToggleIsEnabled = () => {
    const isEnabled = props.user.isEnabled === 1 ? false : true;
    const isAdmin = props.user.isAdmin === 1 ? true : false;
    props.handleUpdateUserLogin(props.user.id, isAdmin, isEnabled);
  };

  return (
    <div className="userEntry row">
      <span className="cell">
        <ProfilePicture path={props.user.profilePicturePath}></ProfilePicture>
      </span>
      <span className="cell"><span className="mobile">Id</span><span className="value">{props.user.id}</span></span>
      <span className="cell"><span className="mobile">Nutzername</span><span className="value">{props.user.userName}</span></span>
      
      <span className="cell">
        <span className="mobile">Ist Administrator</span>
        <input
          type="checkbox"
          onChange={handleToggleIsAdmin}
          defaultChecked={props.user.isAdmin}
        />
      </span>
      <span className="cell">
        <span className="mobile">Ist Enabled</span>
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
