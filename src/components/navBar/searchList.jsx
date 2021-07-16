import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GifApi from "../gifApi/gifApi";

const SearchList = (props) => {
  // array of requested entry objects
  const [result, setResult] = useState([]);

  const query = useLocation().search;
  const searchParam = new URLSearchParams(query).get("q");

  useEffect(() => {
    if (props.isFirstSearch) {
      const encodedURISearch = encodeURI(searchParam);
      props.handleSearch(encodedURISearch);
    }

    setResult([...props.searchForumResults, ...props.searchThreadResults]);
    //eslint-disable-next-line
  }, [props]);

  return (
    <div>
      {result.length === 0 && (
        <React.Fragment>
          <span className="searchList">Kein Forum/Thread gefunden :'(</span>
          <GifApi searchList={["cry", "nobody_here", "alone"]} />
        </React.Fragment>
      )}
      {result.map((entry) => {
        return (
          <React.Fragment key={`search${entry.id}${entry.title}`}>
            <Link to={`${entry.link}`} className="searchList">
              <div className="inner">
                <div className="flag">{entry.flag}</div>
                <div className="title">{entry.title}</div>
              </div>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
};
export default SearchList;
