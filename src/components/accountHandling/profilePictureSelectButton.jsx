import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import ProfilePictureList from "./profilePictureList";
import { ReactComponent as AvatarFrame } from "../../assets/icons/avatarFrame.svg";

const ProfilePictureSelectButton = (props) => {
  const [isUnfolded, setIsUnfolded] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const [profilePictures, setProfilePictures] = useState([]);

  const fetchProfilePictures = () => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    setIsPending(true);
    fetch(`http://localhost:3001/api/images/`, {
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
          setIsPending(false);
        }
      });
    return () => console.log(abortController.abort());
  };

  useEffect(() => {
    fetchProfilePictures();
  }, []);

  const handleFetchProfilePictures = () => {
    if (profilePictures) {
    }
  };

  const handleUpdateProfilePicture = (pictureId) => {
    //used to stop fetching when forcing reload
    const abortController = new AbortController();
    setIsPending(true);
    fetch(`http://localhost:3001/api/users/image/${pictureId}`, {
      signal: abortController.signal,
      method: 'PUT',
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
        sessionStorage.setItem('profilePicture' , data.profilePicturePath);
        props.handleUpdateProfilePicture();
        setIsPending(false);
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("fetch abortet");
        } else {
          setIsPending(false);
        }
      });
    return () => console.log(abortController.abort());
  }

  return (
    <div>
      <div className="pictureSelectButton">
        <div
          className="wrapperButton currentImage"
          onClick={() => setIsUnfolded(!isUnfolded)}
        >
          <AvatarFrame className="imageFrame"></AvatarFrame>
          <img className="activeImage" src={`http://localhost:3001/profile_pictures/${sessionStorage.getItem('profilePicture')}`} alt="" />
        </div>
        <ProfilePictureList
          pictures={profilePictures}
          isUnfolded={isUnfolded}
          handleUpdate={handleUpdateProfilePicture}
        ></ProfilePictureList>
      </div>
    </div>
  );
};

export default ProfilePictureSelectButton;
