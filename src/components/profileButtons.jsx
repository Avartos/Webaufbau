


const ProfileButtons = (props) => {

    if (props.roll == "user") {
        return(
            <div className="wrapper-profileButtons">
                <button>Passwort ändern</button>
                <button>Profilbild ändern </button>
            </div>
        );
    } else if (props.roll == "admin") {
        return(
            <div className="wrapper-profileButtons">
                <button>Passwort reset</button>
            </div>
        );
    }

}
export default ProfileButtons;