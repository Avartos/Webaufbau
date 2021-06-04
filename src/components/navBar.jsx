import React, { Component } from 'react';
import LinkedImage from "./linkedImage";
import SearchBar from "./searchBar";
import Bell from "./bell";
import Profile from "./profile";
import "../assets/css/navBar.css"

export default class NavBar extends Component {

    constructor() {
        super();
        this.handleGetPictureById = this.handleGetPictureById.bind(this);
    }

    state = {
        pictures: [
            {id:"logo",     url:"/assets/images/dummy.png", alt:"logo.png"},
            {id:"glass",    url:"/assets/images/dummy.png", alt:"glass.png" },
            {id:"call",     url:"/assets/images/dummy.png", alt:"call.png"},
            {id:"bell",     url:"/assets/images/dummy.png", alt:"bell.png"},
            {id:"profile",  url:"/assets/images/dummy.png", alt:"profile.png"}
        ]
    }


    render() {
        /*
        let logo    = this.handleGetPictureById("logo");
        let glass   = this.handleGetPictureById("glass");
        let call    = this.handleGetPictureById("call");
        let bell    = this.handleGetPictureById("bell");
        let profile = this.handleGetPictureById("profile");
        */
        let logo    = this.state.pictures.find(pic => pic.id === "logo");
        let glass   = this.state.pictures.find(pic => pic.id === "glass");
        let call    = this.state.pictures.find(pic => pic.id === "call");
        let bell    = this.state.pictures.find(pic => pic.id === "bell");
        let profile = this.state.pictures.find(pic => pic.id === "profile");

        return (
            <nav>
                <div className="wrapper-nav-left">
                    <LinkedImage key={logo.id} href="/login" url={logo.url} alt={logo.alt}/>
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

    handleGetPictureById(pictureID) {
        return this.state.pictures.find(pic => pic === pictureID);
    }

}
