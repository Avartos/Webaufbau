import React, { Component } from 'react';
import LinkedImage from "./linkedImage";
import SearchBar from "./searchBar";
import Bell from "./bell";
import Profile from "./profile";
import "../assets/css/navBar.css"

export default class NavBar extends Component {

    state = {
        pictures: [
            {id:"logo",     url:"../assets/images/dummy.png", alt:"logo.png"},
            {id:"glass",    url:"../assets/images/dummy.png", alt:"glass.png" },
            {id:"call",     url:"../assets/images/dummy.png", alt:"call.png"},
            {id:"bell",     url:"../assets/images/dummy.png", alt:"bell.png"},
            {id:"profile",  url:"../assets/images/dummy.png", alt:"profile.png"}
        ]
    }


    render() {


        /*
        let logo    = this.getPictureById("logo");
        let glass   = this.getPictureById("glass");
        let call    = this.getPictureById("call");
        let bell    = this.getPictureById("bell");
        let profile = this.getPictureById("profile");
        */


        let logo    = this.state.pictures.find(pic => pic.id === "logo");
        let glass   = this.state.pictures.find(pic => pic.id === "glass");
        let call    = this.state.pictures.find(pic => pic.id === "call");
        let bell    = this.state.pictures.find(pic => pic.id === "bell");
        let profile = this.state.pictures.find(pic => pic.id === "profile");

        return (
            <nav>
                <div className="wrapper-nav-left">
                    <LinkedImage key={logo.id} href="#" url={logo.url} alt={logo.alt}/>
                </div>
                <div className="wrapper-nav-middle">
                    <SearchBar key="NavSearchBar" url={glass.url} alt={glass.alt}/>

                    <div className="callLabel" hidden>
                        <LinkedImage key={call.id} href="#" url={call.url} alt={call.alt}/>
                        <label>Dummy Text</label>
                    </div>
                </div>
                <div className="wrapper-nav-right">
                    <Bell key={bell.id} url={bell.url} alt={bell.alt}/>
                    <Profile key={profile.id} url={profile.url} alt={profile.alt}/>
                </div>
            </nav>
        );
    }
    getPictureById(pictureID) {
        return this.state.pictures.find(pic => pic === pictureID);
    }

}
