import SearchBar from "./searchBar";
import Bell from "./bell";
import Profile from "./profile";
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
                    <Profile/>
                </div>
            </nav>
        );

    // handleGetPictureById(pictureID) {
    //     return this.state.pictures.find(pic => pic === pictureID);
    // }

}
export default NavBar;