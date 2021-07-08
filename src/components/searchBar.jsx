import { ReactComponent as GlassIcon } from "../assets/icons/glass.svg";
import classNames from "classnames";

const SearchBar = (props) => {
  let searchBarClass = classNames({
    searchBar: true,
    mobile: props.isMobile,
  });

  return (
    <form className={searchBarClass}>
      <input type="text" placeholder="Suche..." />
      <button className="submit">
        <GlassIcon className="searchButtonIcon" />
      </button>
    </form>
  );
};
export default SearchBar;
