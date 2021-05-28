import React, { Component } from 'react';

export default class NavBar extends Component {
    state = {
        pictures: [
            {id:"logo",     url:"../assets/logo.png",           alt:"logo.png"},
            {id:"glass",    url:"../assets/icon/glass.png",     alt:"glass.png" },
            {id:"call",     url:"../assets/call.png",           alt:"call.png"},
            {id:"bell",     url:"../assets/icon/bell.png",      alt:"bell.png"},
            {id:"profile",  url:"../assets/icon/profile.png",   alt:"profile.png"}
        ]
    }
    render() {

        let logo = this.getPictureById("logo");
        let glass = this.getPictureById("glass");
        let call = this.getPictureById("call");
        let bell = this.getPictureById("bell");
        let profile = this.getPictureById("profile");

        return (
            <nav>
                <div className="wrapper-nav-left">
                    <a href="#">
                        <img src={logo.url} alt={logo.alt}/>
                    </a>
                </div>
                <div className="wrapper-nav-middle">
                    <form className="searchBar">
                        <input type="text" placeholder="Suche..."/>
                        <button className="submit">
                            <img src={glass.url} alt={glass.alt}/>
                        </button>
                    </form>
                    <div className="callLabel" hidden="true">
                        <img src={call.url} alt={call.alt}/>
                        <label>Dummy Text</label>
                    </div>
                </div>
                <div className="wrapper-nav-right">
                    <div className="wrapper-bell">
                        <img src={bell.url} alt={bell.alt}/>
                    </div>
                    <div className="wrapper-profile">
                        <img src={profile.url} alt={profile.alt}/>
                    </div>
                </div>
            </nav>
        );
    }

    getPictureById(pictureID) {
        return this.state.pictures.find(pic => pic === pictureID);
    }
}