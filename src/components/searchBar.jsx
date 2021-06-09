import { ReactComponent as GlassIcon } from "../assets/icons/glass.svg";



const SearchBar = (props) => {

    //state = {};

    return(
        <form className="searchBar">
            <input type="text" placeholder="Suche..."/>
            <button className="submit">
                <GlassIcon/>
            </button>
        </form>
    );
}
export default SearchBar;