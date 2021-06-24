


const ProfileStats = (props) => {

    return(
        <div className="wrapper-profileStats">
            <p>Username: {props.username}</p>
            <p>Emailadresse: {props.email}</p>
        </div>
    );

}
export default ProfileStats;