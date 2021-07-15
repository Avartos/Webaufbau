import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import GifApi from "./gifApi";

const SearchList = (props) => {
  const [result, setResult] = useState([]);

  useEffect(() => {
    setResult([...props.searchForumResults, ...props.searchThreadResults]);
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
          <React.Fragment>
            <Link to={`${entry.link}`} className="searchList" key={`search${entry.id}${entry.title}`}>
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
