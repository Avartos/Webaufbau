import SearchBar from "./searchBar";
import Bell from "./bell";
import ProfileDropdown from "./profileDropdown";
import {Link} from "react-router-dom";
import { ReactComponent as CallIcon } from "../assets/icons/voiceCall.svg";
import { ReactComponent as LogoIcon } from "../assets/icons/logo.svg";
import "../assets/css/_navBar.scss"


const NavBar = () => {

        return (
            <nav>
                <div className="wrapper-nav-left">
                    <LogoIcon/>
                </div>
                <div className="wrapper-nav-middle">
                    <SearchBar/>

                    <div className="callLabel" hidden>
                        <CallIcon/>
                        <label>Dummy Text</label>
                    </div>
                </div>
                <div className="wrapper-nav-right">
                    <Bell/>
                    <Link to = "/login">
                        <ProfileDropdown />
                    </Link>
                </div>
            </nav>
        );

    // handleGetPictureById(pictureID) {
    //     return this.state.pictures.find(pic => pic === pictureID);
    // }

}
export default NavBar;