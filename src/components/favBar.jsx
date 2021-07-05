import React, { useState } from "react";
import FavList from "./favList";

const FavBar = () => {
  const [favorite, setFavorite] = useState([
    {
      id: 0,
      forum: "Forumtitle 1",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
    {
      id: 1,
      forum: "Senf macht spaß",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
    {
      id: 2,
      forum: "Vogelfreunde Erfurt",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
    {
      id: 3,
      forum: "Kochen mit Zimt",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
  ]);

  const [popular, setPopular] = useState([
    {
      id: 4,
      forum: "Forumtitle 1",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
    { id: 5, forum: "Fußball", threads: ["Threadtitle 1", "Threadtitle 2"] },
    { id: 6, forum: "Schwimmen", threads: ["Threadtitle 1", "Threadtitle 2"] },
    { id: 7, forum: "Erfurt", threads: ["Threadtitle 1", "Threadtitle 2"] },
    { id: 8, forum: "FH-Erfurt", threads: ["Threadtitle 1", "Threadtitle 2"] },
  ]);

  const [latest, setLatest] = useState([
    {
      id: 9,
      forum: "Forumtitle 1",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
    { id: 10, forum: "BUGA22", threads: ["Threadtitle 1", "Threadtitle 2"] },
    {
      id: 11,
      forum: "Fragen zu REACT",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
    {
      id: 12,
      forum: "Schützenverein Erfurt",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
    {
      id: 13,
      forum: "Ein neues Forum",
      threads: ["Threadtitle 1", "Threadtitle 2"],
    },
  ]);

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
