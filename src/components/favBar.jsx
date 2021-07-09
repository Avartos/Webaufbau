import React, {useEffect, useState} from "react";
import FavList from "./favList";

const FavBar = () => {
  const [favorite, setFavorite] = useState([]);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);

    const fetchFavorites = (handleAddAlert) => {
        //used to stop fetching when forcing reload
        const abortController = new AbortController();
        fetch(`http://localhost:3001/api/favBar/threads`, {
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

    useEffect(fetchFavorites,[]);

  return (
    <React.Fragment>
      <input type="checkbox" id="favToggle" className="favToggle" />
      <div className="favBar">
        <FavList className="favorite" key="favorite" list={favorite} />
        <FavList className="popular" key="popular" list={popular} />
        <FavList className="latest" key="latest" list={latest} />
      </div>
    </React.Fragment>
  );
};

export default FavBar;
