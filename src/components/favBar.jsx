import React, {useEffect, useState} from "react";
import {ReactComponent as SplatIcon} from "../assets/icons/splat.svg";
import FavThreadList from "./favThreadList";

const FavBar = ({handleAddAlert}) => {
  const [favorite, setFavorite] = useState([]);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);

    const fetchFavorites = () => {
        //used to stop fetching when forcing reload
        const abortController = new AbortController();
        fetch(`http://localhost:3001/api/favBar/favorites`, {
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json",
                // undefined, if the user is not looged in
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "Fehler beim Abrufen der Threads! Bitte versuchen Sie es später erneut."
                    );
                }
                return res.json();
            })
            .then((data) => {
                setFavorite(data);
                console.log(data);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch abortet");
                } else {
                    handleAddAlert("error", "Fehler", error.message);
                }
            });
        return () => console.log(abortController.abort());
    };

    const fetchPopular = (handleAddAlert) => {
        //used to stop fetching when forcing reload
        const abortController = new AbortController();
        fetch(`http://localhost:3001/api/favBar/popular`, {
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json",
                // undefined, if the user is not looged in
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "Fehler beim Abrufen der Threads! Bitte versuchen Sie es später erneut."
                    );
                }
                return res.json();
            })
            .then((data) => {
                setPopular(data);
                console.log(data);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch abortet");
                } else {
                    handleAddAlert("error", "Fehler", error.message);
                }
            });
        return () => console.log(abortController.abort());
    };
    const fetchLatest = () => {
        //used to stop fetching when forcing reload
        const abortController = new AbortController();
        fetch(`http://localhost:3001/api/favBar/latest?limit=5`, {
            signal: abortController.signal,
            headers: {
                "Content-Type": "application/json",
                // undefined, if the user is not looged in
                accessToken: sessionStorage.getItem("accessToken"),
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw Error(
                        "Fehler beim Abrufen der Threads! Bitte versuchen Sie es später erneut."
                    );
                }
                return res.json();
            })
            .then((data) => {
                setLatest(data);
                console.log(data);
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    console.log("fetch abortet");
                } else {
                    handleAddAlert("error", "Fehler", error.message);
                }
            });
        return () => console.log(abortController.abort());
    };

    useEffect(() => {
        fetchFavorites();
        fetchPopular();
        fetchLatest();
    },[]);

  return (
    <React.Fragment>
      <input type="checkbox" id="favToggle" className="favToggle" />
      <div className="favBar">
          <div className="favList">
              <ul>
                  <div className="title">
                      <SplatIcon className="splatIcon" />
                      <span>Favoriten</span>
                  </div>
                  {favorite.map((item) => {
                      return(
                          <FavThreadList item={item}></FavThreadList>
                      )
                  })}
              </ul>
          </div>
          <div className="favList">
              <ul>
                  <div className="title">
                      <SplatIcon className="splatIcon" />
                      <span>Popular</span>
                  </div>
                  {popular.map((title) => {
                      return(
                          <li>
                              <a href={'/threads/'+title.threadID}>
                                  {title.threadTitle}
                              </a>
                          </li>
                      )
                  })}
              </ul>
          </div>
          <div className="favList">
              <ul>
                  <div className="title">
                      <SplatIcon className="splatIcon" />
                      <span>Latest</span>
                  </div>
                  {latest.map((title) => {
                      return(
                          <li>
                              <a href={'/threads/'+title.threadID}>
                                {title.threadTitle}
                              </a>
                          </li>
                      )
                  })}
              </ul>
          </div>
      </div>
    </React.Fragment>
  );
};

export default FavBar;
