import { ReactComponent as GlassIcon } from "../assets/icons/glass.svg";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const SearchBar = (props) => {
  const query = useLocation().search;
  const searchParam = new URLSearchParams(query).get("q");

  let searchBarClass = classNames({
    searchBar: true,
    mobile: props.isMobile,
  });

  useEffect(() => {
    if (searchParam) {
      startSearch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  const [search, setSearch] = useState(searchParam || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    startSearch();
  };

  const startSearch = () => {
    const encodedURISearch = encodeURI(search);
    props.handleSearch(encodedURISearch);
    history.push({ pathname: `/search`, search: "q=" + encodedURISearch });
  };

  return (
    <form className={searchBarClass} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Suche..."
        onChange={(e) => setSearch(e.target.value)}
        value={search}
      />
      <button className="submit">
        <GlassIcon className="searchButtonIcon" />
      </button>
    </form>
  );
};
export default SearchBar;
