import { ReactComponent as GlassIcon } from "../../assets/icons/glass.svg";
import classNames from "classnames";
import { useHistory, useLocation } from "react-router-dom";
import { useState } from "react";

/**
 * This component handles the searchbar and starts the searchfunction
 */
const SearchBar = (props) => {
  // the search query
  const query = useLocation().search;
  // the extracted params from the query
  const searchParam = new URLSearchParams(query).get("q");

  // the classname searchBar
  let searchBarClass = classNames({
    searchBar: true,
    mobile: props.isMobile,
  });

  // history object
  const history = useHistory();
  // all search params
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
