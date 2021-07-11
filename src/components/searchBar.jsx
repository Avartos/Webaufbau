import { ReactComponent as GlassIcon } from "../assets/icons/glass.svg";
import classNames from "classnames";
import {useHistory} from "react-router-dom"
import {useState} from "react";

const SearchBar = (props) => {
  let searchBarClass = classNames({
    searchBar: true,
    mobile: props.isMobile,
  });

  const history = useHistory();
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
      e.preventDefault();
      const encodedURISearch = encodeURI(search);
      history.push({pathname: `/search`, search:'q='+encodedURISearch})
  }

  return (
    <form className={searchBarClass} onSubmit={handleSubmit}>
      <input type="text" placeholder="Suche..."
      onChange={(e) => setSearch(e.target.value)}
      value={search}/>
      <button className="submit">
        <GlassIcon className="searchButtonIcon" />
      </button>
    </form>
  );
};
export default SearchBar;
