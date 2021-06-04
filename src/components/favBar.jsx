import React, {Component} from "react";
import List from "./list";


export default class FavBar extends Component {

    state = {
        favorite: [
            {forum:"Forumtitle 1"           , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Senf macht spaß"        , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Vogelfreunde Erfurt"    , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Kochen mit Zimt"        , threads:["Threadtitle 1", "Threadtitle 2"]}
        ],
        popular: [
            {forum:"Forumtitle 1"           , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Fußball"                , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Schwimmen"              , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Erfurt"                 , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"FH-Erfurt"              , threads:["Threadtitle 1", "Threadtitle 2"]}
        ],
        latest: [
            {forum:"Forumtitle 1"           , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"BUGA22"                 , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Fragen zu REACT"        , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Schützenverein Erfurt"  , threads:["Threadtitle 1", "Threadtitle 2"]},
            {forum:"Ein neues Forum"        , threads:["Threadtitle 1", "Threadtitle 2"]}
        ],
        pictures: [
            {id:"splash",     url:"../assets/splash.png",           alt:"splash.png"},
        ]

    };

    render() {
        let favorite = this.state.favorite;
        let popular  = this.state.popular;
        let latest   = this.state.latest;
        let splash   = this.state.pictures.find(pic => pic.id === "splash");

        return(
            <div className="favBar">
                <div>
                    <img src={splash.url} alt={splash.alt}/>
                    <List className="favorite" key="favorite" list={favorite}/>
                </div>
                <List className="popular"  key="popular"  list={popular}/>
                <List className="latest"   key="latest"   list={latest}/>
            </div>
        );
    }
}
