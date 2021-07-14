import { useState, useEffect } from "react";
import ProfilePictureList from "./profilePictureList";
import { ReactComponent as AvatarFrame } from "../../assets/icons/avatarFrame.svg";
import config from "../../core/config";

/**
 * This component is used to open the profile picture list
 * It also controls, when a new profile picture ist set and sends the update request to the backend
 * @param {*} props
 * @returns
 */
const ProfilePictureSelectButton = (props) => {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const [profilePictures, setProfilePictures] = useState([]);

  const fetchProfilePictures = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    setIsPending(true);
    fetch(`${config.serverPath}/api/images/`, {
      signal: abortController.signal,
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for that resource!");
        }
        return res.json();
      })
      .then((data) => {
        setProfilePictures(data);
        setIsPending(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
        }
      });
    return () => console.log(abortController.abort());
  };

  //load profile pictures once, when the component is beeing loaded
  useEffect(() => {
    fetchProfilePictures();
  }, []);

  const handleUpdateProfilePicture = (pictureId) => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    setIsPending(true);
    fetch(`${config.serverPath}/api/users/image/${pictureId}`, {
      signal: abortController.signal,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data for that resource!");
        }
        return res.json();
      })
      .then((data) => {
        //update the profile picture path in the session
        sessionStorage.setItem("profilePicture", data.profilePicturePath);
        //makes sure to send the update to the navbar
        props.handleUpdateProfilePicture();
        setIsPending(false);
        setIsUnfolded(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          setIsPending(false);
        }
      });
    return () => console.log(abortController.abort());
  };

  return (
    <div>
      <div className="pictureSelectButton">
        <div
          className="wrapperButton currentImage"
          onClick={() => setIsUnfolded(!isUnfolded)}
        >
          <AvatarFrame className="imageFrame"></AvatarFrame>
          <img
            className="activeImage"
            src={`${config.serverPath}/profile_pictures/${sessionStorage.getItem(
              "profilePicture"
            )}`}
            alt=""
          />
        </div>
        {!isPending && (
          <ProfilePictureList
            pictures={profilePictures}
            isUnfolded={isUnfolded}
            handleUpdate={handleUpdateProfilePicture}
          ></ProfilePictureList>
        )}
      </div>
    </div>
  );
};

export default ProfilePictureSelectButton;
